import React, { useEffect, useMemo, useState, type FC } from 'react'

import type { ILesson } from '~/types/word'
import LearnQuiz from '~/components/learn'
import { useLocalSearchParams } from 'expo-router'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { Completed } from '~/components/learn/Completed'
import { DATA_ALL_LESSON } from '~/lib/section'
import { useScores } from '~/store/useScore'
import { View } from 'lucide-react-native'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'
import ViewWithFixedButton from '~/components/views/ViewWithFixedButton'

const LearnPage: FC = () => {
  const { lessonId, topicId, addition } = useLocalSearchParams()

  const [isDoWrongWords, setIsDoWrongWords] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const addCompletedLesson = useScores((t) => t.addCompletedLesson)

  const topic = useMemo(() => {
    return IT_VOCAB_LESSONS.find((t) => t.id === topicId)
  }, [topicId])

  const lessonIndex = useMemo(() => {
    return DATA_ALL_LESSON.findIndex((l) => l.id === lessonId)
  }, [lessonId])

  const lesson = useMemo(() => {
    return topic.lessons[lessonIndex]
  }, [topicId, lessonId, lessonIndex])

  const [currentWords, setCurrentWords] = useState<ILesson['words']>([])
  const [isShowWrongNotification, setIsShowWrongNotification] = useState(false)
  console.log('isShowWrongNotification', isShowWrongNotification)
  const handleWrongWords = (wrongWords?: ILesson['words']) => {
    if (wrongWords.length < 1) {
      setIsCompleted(true)
      addCompletedLesson(lessonId as string)
      return
    }
    setIsShowWrongNotification(true)
    setCurrentWords(wrongWords)
    setIsDoWrongWords(true)
  }

  useEffect(() => {
    if (currentWords.length === 0) {
      const words = []

      if (!addition) {
        words.push(...lesson.words)
      }

      if (addition === 'prev') {
        const prevLesson = topic.lessons[lessonIndex - 1]
        if (prevLesson) {
          words.push(...prevLesson.words)
        }
      }
      if (addition === 'all') {
        topic.lessons.forEach((l) => {
          words.push(...l.words)
        })
      }

      setCurrentWords(words)
    }
  }, [])

  if (isShowWrongNotification) {
    return (
      <ViewWithFixedButton className="items-center justify-center" onButtonPress={() => setIsShowWrongNotification(false)}>
        <Text className="text-2xl font-semibold text-gray-800 mb-4">
          Cùng làm lại những từ chưa đúng nhé!
        </Text>
      </ViewWithFixedButton>
    )
  }

  if (isCompleted) {
    return <Completed />
  }

  return (
    <LearnQuiz
      words={currentWords}
      topic={topic}
      handleWrongWords={handleWrongWords}
      isDoWrongWords={isDoWrongWords}
    />
  )
}

export default LearnPage
