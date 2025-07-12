import React, { useState, type FC, useMemo, useEffect } from 'react'
import { View, Pressable } from 'react-native'
import { X } from 'lucide-react-native' // Use lucide-react-native for icons
import { Image } from 'expo-image'
import { SelectOne } from '~/components/learn/SelectOne'
import { Matching } from '~/components/learn/Matching'
import { useRouter } from 'expo-router'
import { ILesson, ITopic, IWord } from '~/types/word'
import { cn, getRandomInt } from '~/lib/utils'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { playCorrectAudio, playIncorrectAudio } from '~/lib/audio'
import { TOTAL_QUIZ_PER_LESSON } from '~/lib/constants'
import { Progress } from '../ui/progress'
import { LearnQuizType } from './type'
import { getRandomQuizType } from './utils'
import { TARGET_LANGUAGE, UI_LANGUAGE } from '~/lib/constants'

const BrokenHeartImage = require('~/assets/lesson/broken-heart.png')

const LearnQuiz: FC<{
  words: ILesson['words']
  topic: ITopic
  lesson: ILesson
  isDoWrongWords: boolean
  handleWrongWords: (wrongWords?: ILesson['words']) => void
}> = ({ words, topic, lesson, isDoWrongWords, handleWrongWords }) => {
  const totalQuestions = isDoWrongWords ? words.length : TOTAL_QUIZ_PER_LESSON

  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [wrongWords, setWrongWords] = useState<ILesson['words']>([])
  const [currentIndex, setCurrentIndex] = useState(getRandomInt(0, words.length - 1))
  const [type, setType] = useState<LearnQuizType>(getRandomQuizType())
  const [score, setScore] = useState(0)

  const allWords = useMemo(() => {
    return topic.lessons.reduce((acc, lesson) => {
      return [...acc, ...lesson.words]
    }, [])
  }, [topic])

  const isAnswered = useMemo(() => result !== null, [result])

  const currentWord = words[currentIndex]

  const getRandomOptions = (
  allWords: IWord[],
  currentWord: IWord,
  field: keyof Pick<IWord, 'en' | 'vi' | 'img'>,
  count: number = getRandomInt(2, 3)
): string[] => {
  const otherWords = allWords.filter((w) => w.id !== currentWord.id)
  const shuffled = [...otherWords].sort(() => Math.random() - 0.5)
  return [currentWord[field], ...shuffled.slice(0, count).map((w) => w[field])].sort(
    () => Math.random() - 0.5
  )
}

  const correctAnswer = useMemo(() => {
    if (!currentWord) return ''

  switch (type) {
    case LearnQuizType.EN_TO_VI:
      return currentWord[UI_LANGUAGE]
    case LearnQuizType.EN_TO_IMAGE:
      return currentWord.img
    case LearnQuizType.VI_TO_EN:
      return currentWord[TARGET_LANGUAGE]
    case LearnQuizType.PICK_IN_EN_EXAMPLE:
      return currentWord[TARGET_LANGUAGE]
    default:
      return ''
  }
  }, [currentWord, type])

  const question = useMemo(() => {
    if (!currentWord) return ''

  switch (type) {
    case LearnQuizType.EN_TO_VI:
      return currentWord[TARGET_LANGUAGE]
    case LearnQuizType.EN_TO_IMAGE:
      return currentWord[TARGET_LANGUAGE]
    case LearnQuizType.VI_TO_EN:
      return currentWord[UI_LANGUAGE]
    // TODO: Write unit tests for this
    case LearnQuizType.PICK_IN_EN_EXAMPLE:
      return currentWord.example[getRandomInt(0, currentWord.example.length - 1)][TARGET_LANGUAGE]
        .toLowerCase()
        .replace(currentWord[TARGET_LANGUAGE].toLowerCase(), '________')
    default:
      return ''
  }
  }, [currentWord, type])

  const options = useMemo(
    () => {
        if (!currentWord) return []
      
        switch (type) {
          case LearnQuizType.EN_TO_VI:
            return getRandomOptions(allWords, currentWord, UI_LANGUAGE as 'en' | 'vi')
          case LearnQuizType.EN_TO_IMAGE:
            return getRandomOptions(allWords, currentWord, 'img').map((imgUri) => ({
              text: imgUri,
              render: (text: string) => (
                <Image
                  source={{ uri: text }} // Use { uri: text } for network images
                  alt={imgUri} // alt is not directly used in RN Image
                  className="w-24 h-24 object-cover mx-auto"
                />
              ),
            }))
          case LearnQuizType.VI_TO_EN:
          case LearnQuizType.PICK_IN_EN_EXAMPLE:
            return getRandomOptions(allWords, currentWord, 'en')
          default:
            return []
        }
    },
    [currentWord, type, allWords]
  )

  const wordMatching = useMemo(() => {
    if (!currentWord) return []
    if (type !== LearnQuizType.MATCHING) return []

    const otherWords = allWords.filter((w) => w.id !== currentWord.id)
    const shuffled = [...otherWords].sort(() => Math.random() - 0.5)

    return [currentWord, ...shuffled.slice(0, 3)].sort(() => Math.random() - 0.5)
  }, [currentWord, type, allWords])

  const handleCorrect = () => {
    playCorrectAudio()
    setScore((prev) => Math.min(prev + 1, TOTAL_QUIZ_PER_LESSON))
    setResult('correct')
  }

  const handleIncorrect = () => {
    playIncorrectAudio()
    setScore((prev) => Math.min(prev + 1, TOTAL_QUIZ_PER_LESSON))
    setWrongWords((prev) => [...prev, currentWord])
    setResult('wrong')
  }

  const handleNext = () => {
    const nextIndex = getRandomInt(0, words.length - 1, [currentIndex])
    setCurrentIndex(nextIndex)

    let tried = 0

    while (tried < 3) {
      const nextType = getRandomQuizType()
      if (nextType !== type) {
        setType(nextType)
        break
      }
      tried++
    }
    setResult(null)
  }

  // cập nhật last lesson khi hoàn thành
  useEffect(() => {
    if (score >= totalQuestions) {
      handleWrongWords(wrongWords)
    }
  }, [score, wrongWords])

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setResult(null)
    setType(getRandomQuizType())
    setWrongWords([])
  }, [words])

  const renderContent = () => {
    if (!currentWord) return null

    switch (type) {
      case LearnQuizType.EN_TO_VI:
        return (
          <SelectOne
            question={currentWord[TARGET_LANGUAGE]}
            options={options}
            correctAnswer={correctAnswer}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )
      case LearnQuizType.EN_TO_IMAGE:
        return (
          <SelectOne
            question={currentWord[TARGET_LANGUAGE]}
            options={options}
            correctAnswer={correctAnswer}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )
      case LearnQuizType.VI_TO_EN:
        return (
          <SelectOne
            question={currentWord[UI_LANGUAGE]}
            options={options}
            correctAnswer={correctAnswer}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )
      case LearnQuizType.PICK_IN_EN_EXAMPLE:
        return (
          <SelectOne
            question={question}
            options={options}
            correctAnswer={correctAnswer}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )
      case LearnQuizType.MATCHING:
        return <Matching words={wordMatching} onCorrect={handleCorrect} />
      default:
        return null
    }
  }

  return (
    <>
      <View className="flex-1 flex flex-col justify-center gap-8 web:max-w-4xl web:mx-auto web:relative web:w-full">
        {/* Progress bar header */}
        <View className="absolute top-0 left-0 right-0 z-10">
          <View className="mx-4 py-4">
            <View className="flex flex-row gap-4 items-center justify-between ">
              <Pressable
                onPress={() => {
                  if (router.canGoBack()) {
                    router.back()
                  } else {
                    router.navigate('/')
                  }
                }}
              >
                <X />
              </Pressable>

              <Progress value={(score / totalQuestions) * 100} indicatorClassName="bg-primary" />
            </View>

            {isDoWrongWords && (
              <View className="flex flex-row items-center justify-start gap-2 mt-4">
                <Image
                  source={BrokenHeartImage}
                  style={{ width: 32, height: 32 }}
                  contentFit="cover"
                />
                <Text className="font-medium">Làm lại những từ chọn sai</Text>
              </View>
            )}
          </View>
        </View>

        <View className="px-4">{renderContent()}</View>

        {currentWord?.explanation && type !== LearnQuizType.MATCHING && (
          <View className="flex flex-col gap-2 px-4">
            <Text>{currentWord.explanation[TARGET_LANGUAGE]}</Text>
            <Text>{currentWord.explanation[UI_LANGUAGE]}</Text>
          </View>
        )}

        <View
          className={cn(
            'native:absolute web:fixed left-0 right-0 bottom-0 z-10',
            !isAnswered ? 'hidden' : '',
            result === 'correct' ? 'bg-green-100' : 'bg-red-100'
          )}
          style={{ paddingBottom: insets.bottom / 2 }}
        >
          <View className="px-4 py-6 web:max-w-4xl web:mx-auto web:w-full flex flex-col md:flex-row md:justify-between md:items-center">
            {result === 'correct' ? (
              <Text className="font-semibold text-2xl text-green-600">Tuyệt vời 🎉</Text>
            ) : (
              <View>
                <Text className="font-semibold text-2xl text-red-600 pt-2 md:pt-0">
                  Đáp án đúng:
                </Text>
                <Text className="text-red-500 text-lg mt-1">{correctAnswer}</Text>
              </View>
            )}

            <Button
              onPress={handleNext}
              className={cn(
                'mt-10 w-full md:w-auto md:mt-0',
                result === 'correct' ? 'bg-green-500' : 'bg-red-500'
              )}
            >
              <Text>Tiếp tục</Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  )
}

export default LearnQuiz