import React, { useEffect, useMemo, useState, type FC } from 'react'

import type { ILesson } from '~/types/word'
import LearnQuiz from '~/components/learn'
import { useLocalSearchParams } from 'expo-router'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { Completed } from '~/components/learn/Completed'
import { useLastLessonId } from '~/store/useLastLessonId'
import { DATA_ALL_LESSON } from '~/lib/section'
import { useScores } from '~/store/useScore'

const LearnPage: FC = () => {
  const { lessonId, topicId, addition } = useLocalSearchParams()

  const [isDoWrongWords, setIsDoWrongWords] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const setLastLesson = useLastLessonId((t) => t.setLastLesson)
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

  const handleWrongWords = (wrongWOrds?: ILesson['words']) => {
    if (wrongWOrds.length < 1) {
      setLastLesson(topic.id, lesson.id)
      setIsCompleted(true)
      addCompletedLesson(lessonId as string)
      return
    }
    setCurrentWords(wrongWOrds)
    setIsDoWrongWords(true)
  }

  useEffect(() => {
    if (lesson.id) {
      setLastLesson(topic.id, lessonId as string)
    }
  }, [lesson])

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

  if (isCompleted) {
    return <Completed />
  }

  return (
    <LearnQuiz
      words={currentWords}
      topic={topic}
      lesson={lesson}
      handleWrongWords={handleWrongWords}
      isDoWrongWords={isDoWrongWords}
    />
  )
}

export default LearnPage
