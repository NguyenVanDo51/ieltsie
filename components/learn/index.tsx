import React, { useState, useCallback, type FC, useMemo, useEffect } from 'react'
import { View, Pressable, Image } from 'react-native'
import { Lightbulb, Check, ChevronLeft, X } from 'lucide-react-native' // Use lucide-react-native for icons

import { addKnownWord, getKnownWords, getScores, setScores, type IKnownWords } from '~/lib/storage'
import { SelectOne } from '~/components/learn/SelectOne'
import { Matching } from '~/components/learn/Matching'
import { useRouter } from 'expo-router'
import { ILesson, IWord } from '~/types/word'
import { cn, getRandomInt } from '~/lib/utils'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { playCorrectAudio, playIncorrectAudio } from '~/lib/audio'
import { QUESTION_MULTIPLES } from '~/lib/constants'
import { Progress } from '../ui/progress'

export const screenOptions = {
  headerShown: false,
}

enum LearnQuizType {
  EN_TO_VI = 'EN_TO_VI',
  EN_TO_IMAGE = 'EN_TO_IMAGE',
  VI_TO_EN = 'VI_TO_EN',
  PICK_IN_EN_EXAMPLE = 'PICK_IN_EN_EXAMPLE',
  MATCHING = 'MATCHING',
}

type QuizTypePercentConfig = Partial<Record<LearnQuizType, number>>

const getRandomQuizType = (): LearnQuizType => {
  // Default percent config if not provided
  const percentConfig: QuizTypePercentConfig = {
    [LearnQuizType.EN_TO_VI]: 30,
    [LearnQuizType.VI_TO_EN]: 30,
    [LearnQuizType.MATCHING]: 30,
    [LearnQuizType.PICK_IN_EN_EXAMPLE]: 10,
  }
  const config = { ...percentConfig }

  // Filter out types with 0 percent
  const types = Object.entries(config)
    .filter(([_, percent]) => percent && percent > 0)
    .map(([type, percent]) => ({ type: type as LearnQuizType, percent: percent! }))

  // Build a weighted array
  const weighted: LearnQuizType[] = []
  types.forEach(({ type, percent }) => {
    for (let i = 0; i < percent; i++) {
      weighted.push(type)
    }
  })

  // Fallback to equal distribution if weighted is empty
  if (weighted.length === 0) {
    return LearnQuizType.EN_TO_VI
  }

  const idx = Math.floor(Math.random() * weighted.length)
  return weighted[idx]
}

const LearnQuiz: FC<{
  words: ILesson['words']
  lesson: ILesson
  handleRestart: (wrongWords?: ILesson['words']) => void
}> = ({ words, lesson, handleRestart }) => {
  const allWords = lesson.words
  const totalQuestions = words.length * QUESTION_MULTIPLES

  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [wrongWords, setWrongWords] = useState<ILesson['words']>([])
  const [currentIndex, setCurrentIndex] = useState(getRandomInt(0, words.length - 1))
  const [type, setType] = useState<LearnQuizType>(getRandomQuizType())
  const [score, setScore] = useState(0)
  const [knownWords, setKnownWords] = useState<IKnownWords>({})
  const [savedScores, setSavedScores] = useState<Record<string, number>>({})

  const isAnswered = useMemo(() => result !== null, [result])

  const currentWord = words[currentIndex]

  const getRandomOptions = useCallback(
    (
      correctWord: IWord,
      field: keyof Pick<IWord, 'en' | 'vi' | 'img'>,
      count: number = getRandomInt(2, 3)
    ): string[] => {
      const otherWords = allWords.filter((w) => w.id !== correctWord.id)
      const shuffled = [...otherWords].sort(() => Math.random() - 0.5)
      return [correctWord[field], ...shuffled.slice(0, count).map((w) => w[field])].sort(
        () => Math.random() - 0.5
      )
    },
    [allWords]
  )

  const correctAnswer = useMemo(() => {
    if (!currentWord) return ''

    switch (type) {
      case LearnQuizType.EN_TO_VI:
        return currentWord.vi
      case LearnQuizType.EN_TO_IMAGE:
        return currentWord.img
      case LearnQuizType.VI_TO_EN:
        return currentWord.en
      case LearnQuizType.PICK_IN_EN_EXAMPLE:
        return currentWord.en
      default:
        return ''
    }
  }, [currentWord, type])

  const question = useMemo(() => {
    if (!currentWord) return ''

    switch (type) {
      case LearnQuizType.EN_TO_VI:
        return currentWord.en
      case LearnQuizType.EN_TO_IMAGE:
        return currentWord.en
      case LearnQuizType.VI_TO_EN:
        return currentWord.vi
      // TODO: Write unit tests for this
      case LearnQuizType.PICK_IN_EN_EXAMPLE:
        return currentWord.example[getRandomInt(0, currentWord.example.length - 1)].en
          .toLowerCase()
          .replace(currentWord.en.toLowerCase(), '________')
      default:
        return ''
    }
  }, [currentWord, type])

  const options = useMemo(() => {
    if (!currentWord) return []

    switch (type) {
      case LearnQuizType.EN_TO_VI:
        return getRandomOptions(currentWord, 'vi')
      case LearnQuizType.EN_TO_IMAGE:
        return getRandomOptions(currentWord, 'img').map((imgUri) => ({
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
        return getRandomOptions(currentWord, 'en')
      default:
        return []
    }
  }, [currentWord, type, getRandomOptions])

  const wordMatching = useMemo(() => {
    if (!currentWord) return []
    if (type !== LearnQuizType.MATCHING) return []

    const otherWords = allWords.filter((w) => w.id !== currentWord.id)
    const shuffled = [...otherWords].sort(() => Math.random() - 0.5)

    return [currentWord, ...shuffled.slice(0, 3)].sort(() => Math.random() - 0.5)
  }, [currentWord, type, allWords])

  const handleCorrect = () => {
    playCorrectAudio()
    setScore((prev) => prev + 1)
    setResult('correct')
  }

  const handleIncorrect = () => {
    playIncorrectAudio()
    setScore((prev) => prev + 1)
    setWrongWords((prev) => [...prev, currentWord])
    setResult('wrong')
  }

  const handleNext = () => {
    const nextIndex = getRandomInt(0, words.length - 1, [currentIndex])
    setCurrentIndex(nextIndex)

    while (1) {
      const nextType = getRandomQuizType()
      if (nextType !== type) {
        setType(nextType)
        break
      }
    }
    setResult(null)
  }

  const handleMarkAsKnown = async () => {
    addKnownWord(lesson.id, currentWord.id)
    setKnownWords(await getKnownWords())
  }

  const restart = () => {
    handleRestart()
  }

  useEffect(() => {
    getKnownWords().then((words) => {
      setKnownWords(words)
    })

    getScores().then((scores) => {
      setSavedScores(scores)
    })
  }, [])

  useEffect(() => {
    if (score > (savedScores[lesson.id] || 0)) {
      setScores(lesson.id, score)
    }
  }, [score, lesson.id, savedScores])

  useEffect(() => {
    setCurrentIndex(0)
    setScore(0)
    setResult(null)
    setType(getRandomQuizType())
    setWrongWords([])
  }, [words])

  if (score >= totalQuestions) {
    return (
      <SafeAreaProvider>
        <View className="flex flex-col items-center justify-center h-full">
          <Text className="text-4xl font-bold mb-4">Lesson Complete!</Text>
          <Text className="text-2xl">
            Your score: {score}/{words.length}
          </Text>

          <View className="flex flex-row gap-4 mt-4">
            <Pressable onPress={() => router.navigate('/')}>
              <Text className="text-blue-500">Home</Text>
            </Pressable>

            {wrongWords.length > 0 && (
              <Pressable
                onPress={() => handleRestart(wrongWords)}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                <Text>Practice {wrongWords.length} Wrong Questions</Text>
              </Pressable>
            )}
            <Pressable onPress={restart} className="bg-blue-500 px-4 py-2 rounded-md">
              <Text className="text-white">Restart</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaProvider>
    )
  }

  return (
    <>
      <View className="flex-1 flex flex-col justify-center gap-8 web:max-w-4xl web:mx-auto web:relative web:w-full">
        {/* Progress bar header */}
        <View className="absolute top-0 left-0 right-0 z-10 bg-white">
          <View className="mx-4 py-4">
            <View className="flex flex-row gap-4 items-center justify-between">
              <Pressable onPress={() => router.back()}>
                <X />
              </Pressable>

              <Progress value={(score / totalQuestions) * 100} indicatorClassName="bg-primary" />
            </View>
          </View>
        </View>

        {/* Main content - add pt-24 to account for fixed header */}
        <View className="px-4">
          {type === LearnQuizType.EN_TO_VI && (
            <SelectOne
              question={currentWord.en}
              options={options}
              correctAnswer={correctAnswer}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          )}

          {type === LearnQuizType.EN_TO_IMAGE && (
            <SelectOne
              question={currentWord.en}
              options={options}
              correctAnswer={correctAnswer}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          )}

          {type === LearnQuizType.VI_TO_EN && (
            <SelectOne
              question={currentWord.vi}
              options={options}
              correctAnswer={correctAnswer}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          )}

          {type === LearnQuizType.PICK_IN_EN_EXAMPLE && (
            <SelectOne
              question={question}
              options={options}
              correctAnswer={correctAnswer}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          )}

          {type === LearnQuizType.MATCHING && (
            <Matching words={wordMatching} onCorrect={handleCorrect} />
          )}
        </View>

        {currentWord?.explanation && type !== LearnQuizType.MATCHING && (
          <View className="flex flex-col gap-2 px-4">
            <Text>{currentWord.explanation.en}</Text>
            <Text>{currentWord.explanation.vi}</Text>
          </View>
        )}

        <View
          className={cn(
            'native:absolute web:fixed left-0 right-0 bottom-0 z-10',
            !isAnswered ? 'hidden' : '',
            result === 'correct' ? 'bg-green-100' : 'bg-red-200'
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

            {/* {!knownWords[lesson?.id]?.includes(currentWord.id) && type !== LearnQuizType.MATCHING && (
            <Pressable
              onPress={handleMarkAsKnown}
              className="border border-gray-300 px-3 py-1 rounded-md flex flex-row items-center gap-2 self-end"
            >
              <Check size={16} color="black" />
              <Text className="text-sm">Mark as Known</Text>
            </Pressable>
          )} */}

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
