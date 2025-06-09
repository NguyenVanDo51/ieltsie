import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { getLastLessonId, setLastLessonId } from '~/lib/storage'

type LastLessonIdState = {
  topicId?: string
  lastLessonId?: string
  fetchLastLessonId: () => Promise<void>
  setLastLesson: (lessonId: string, topicId: string) => Promise<void>
}

export const useLastLessonId = create<LastLessonIdState>((set) => ({
  topicId: undefined,
  lastLessonId: undefined,
  fetchLastLessonId: async () => {
    const lastLessonId = await AsyncStorage.getItem('last_lesson_id')
    const topicId = await AsyncStorage.getItem('topic_id')
    set({ lastLessonId: lastLessonId || undefined, topicId: topicId || undefined })
  },
  setLastLesson: async (topicId: string, lessonId: string) => {
    await AsyncStorage.setItem('last_lesson_id', lessonId)
    await AsyncStorage.setItem('topic_id', topicId)
    set({ lastLessonId: lessonId })
  },
}))
