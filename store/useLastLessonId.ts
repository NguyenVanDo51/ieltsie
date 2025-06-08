import { create } from 'zustand'
import { getLastLessonId, setLastLessonId } from '~/lib/storage'

type LastLessonIdState = {
  lastLessonId: string
  fetchLastLessonId: () => Promise<void>
  setLastLessonId: (lessonId: string) => Promise<void>
}

export const useLastLessonId = create<LastLessonIdState>((set) => ({
  lastLessonId: '',
  fetchLastLessonId: async () => {
    const lastLessonId = await getLastLessonId()
    set({ lastLessonId: lastLessonId || '' })
  },
  setLastLessonId: async (lessonId: string) => {
    setLastLessonId(lessonId)
    set({ lastLessonId: lessonId })
  },
}))
