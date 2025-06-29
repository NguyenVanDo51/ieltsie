import AsyncStorage from '@react-native-async-storage/async-storage'
import type { ILesson } from '~/types/word'

export type IScore = {
  [lessonId: string]: number
}

export const getScores = async (): Promise<IScore> => {
  try {
    const stored = await AsyncStorage.getItem('scores')
    const scores: IScore = stored ? JSON.parse(stored) : {}
    return scores
  } catch (error) {
    console.error('Failed to get score:', error)
    return {}
  }
}

export const setScores = async (lessonId: ILesson['id'], score: number = 0) => {
  try {
    const scores = await getScores()

    scores[lessonId] = score
    await AsyncStorage.setItem('scores', JSON.stringify(scores))
  } catch (error) {
    console.error('Failed to set score:', error)
  }
}
