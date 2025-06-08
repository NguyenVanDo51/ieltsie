import AsyncStorage from '@react-native-async-storage/async-storage'
import type { ILesson } from '~/types/word'

export const KNOWN_WORDS_KEY = 'known_words'

export type IKnownWords = {
  [lessonId: string]: string[]
}

export const getKnownWords = async (): Promise<IKnownWords> => {
  try {
    const stored = await AsyncStorage.getItem(KNOWN_WORDS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Failed to get known words:', error)
    return {}
  }
}

export const addKnownWord = async (lessonId: string, wordId: string) => {
  try {
    const knownWords = await getKnownWords()

    if (!knownWords[lessonId]) {
      knownWords[lessonId] = []
    }

    if (!knownWords[lessonId].includes(wordId)) {
      knownWords[lessonId].push(wordId)
      await AsyncStorage.setItem(KNOWN_WORDS_KEY, JSON.stringify(knownWords))
    }
  } catch (error) {
    console.error('Failed to add known word:', error)
  }
}

export const clearKnownWords = async (lessonId: ILesson['id']) => {
  try {
    const knownWords = await getKnownWords()

    if (knownWords[lessonId]) {
      delete knownWords[lessonId]
      await AsyncStorage.setItem(KNOWN_WORDS_KEY, JSON.stringify(knownWords))
    }
  } catch (error) {
    console.error('Failed to clear known words:', error)
  }
}

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
    console.log('setScores', scores)
    await AsyncStorage.setItem('scores', JSON.stringify(scores))
  } catch (error) {
    console.error('Failed to set score:', error)
  }
}

export const getLastLessonId = async (): Promise<string | null> => {
  try {
    const stored = await AsyncStorage.getItem('last_lesson_id')
    return stored
  } catch (error) {
    console.error('Failed to get last lesson ID:', error)
    return null
  }
}

export const setLastLessonId = async (lessonId: ILesson['id']) => {
  try {
    await AsyncStorage.setItem('last_lesson_id', lessonId)
  } catch (error) {
    console.error('Failed to set last lesson ID:', error)
  }
}
