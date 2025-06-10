import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { IScore } from '~/lib/storage'
import { ILesson } from '~/types/word'

type ScoresState = {
  scores?: IScore
  fetchScores: () => Promise<void>
  addCompletedLesson: (lessonId: string) => Promise<void>
}

export const useScores = create<ScoresState>((set) => ({
  scores: {},
  fetchScores: async () => {
    const scores = JSON.parse(await AsyncStorage.getItem('scores') || '{}')
    set({ scores: scores })
  },
  addCompletedLesson: async (lessonId: string) => {
    const scores = JSON.parse(await AsyncStorage.getItem('scores') || '{}')
    if (!scores[lessonId]) {
      scores[lessonId] = 1
    } else {
      scores[lessonId]++
    }
    await AsyncStorage.setItem('scores', JSON.stringify(scores))
    set({ scores })
  },
}))
