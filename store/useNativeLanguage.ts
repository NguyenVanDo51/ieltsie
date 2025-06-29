import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

type ScoresState = {
  nativeLanguage?: string
  fetch: () => Promise<void>
  set: (nativeLanguage: string) => Promise<void>
}

export const useNativeLanguage = create<ScoresState>((set) => ({
  fetch: async () => {
    const nativeLanguage = await AsyncStorage.getItem('nativeLanguage')
    set({ nativeLanguage: nativeLanguage })
  },
  set: async (nativeLanguage) => {
    await AsyncStorage.setItem('nativeLanguage', nativeLanguage)
    set({ nativeLanguage })
  },
}))
