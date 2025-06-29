import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { create } from 'zustand'

type State = {
  targetLanguage?: string
  fetch: () => Promise<string>
  setTargetLanguage: (targetLanguage: string) => Promise<void>
}

export const usetargetLanguage = create<State>((set) => ({
  fetch: async () => {
    const targetLanguage = await AsyncStorage.getItem('targetLanguage')
    set({ targetLanguage: targetLanguage })
    return targetLanguage
  },
  setTargetLanguage: async (targetLanguage) => {
    await AsyncStorage.setItem('targetLanguage', targetLanguage)
    set({ targetLanguage })
  },
}))
