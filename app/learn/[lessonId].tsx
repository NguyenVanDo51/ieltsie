import React, { useEffect, useMemo, useState, type FC } from 'react'
import { View, Pressable } from 'react-native'
import { ChevronLeft } from 'lucide-react-native' // For the icon

// Assuming these are defined elsewhere and compatible with RN
import type { ILesson } from '~/types/word'
import { getKnownWords, clearKnownWords } from '~/lib/storage'
import LearnQuiz from '~/components/learn'
import { Text } from '~/components/ui/text'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { IT_VOCAB_LESSONS } from '~/data/vocab'

const LearnPage: FC = () => {
  const a = useLocalSearchParams()

  const navigation = useNavigation()
  const lessonId = a.lessonId as string

  const lesson = useMemo(() => {
    return IT_VOCAB_LESSONS.find((l) => l.id === lessonId) || IT_VOCAB_LESSONS[0]
  }, [])

  const router = useRouter()

  const wordsUnknown = lesson.words.filter((word) => !getKnownWords()[lesson.id]?.includes(word.id))

  const [currentWords, setCurrentWords] = useState<ILesson['words']>(wordsUnknown)

  const handleRestart = (words?: ILesson['words']) => {
    // If words are passed, use them; otherwise, use all words from the lesson
    setCurrentWords(words || lesson.words)
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  if (lesson.words.length > 0 && currentWords.length === 0) {
    return (
      <View className="flex flex-col items-center justify-center h-full px-4">
        <Text className="text-2xl font-bold mb-4 text-center">
          You've mastered all words in this lesson!
        </Text>
        <Text className="text-lg mb-6 text-center">
          Great job! You can restart the lesson to practice again.
        </Text>

        <View className="flex flex-col gap-4 mt-4 w-full max-w-sm">
          <Pressable
            onPress={() => router.navigate('/')}
            className="flex flex-row items-center justify-center border border-gray-300 px-4 py-3 rounded-lg"
          >
            <ChevronLeft size={20} color="black" className="mr-2" />
            <Text className="text-base">Go to Home</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              clearKnownWords(lesson.id)
              handleRestart()
            }}
            className="bg-blue-500 px-4 py-3 rounded-lg flex items-center justify-center"
          >
            <Text className="text-white text-base">Restart Lesson</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return <LearnQuiz words={currentWords} lesson={lesson} handleRestart={handleRestart} />
}

export default LearnPage
