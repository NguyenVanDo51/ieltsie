import { createAudioPlayer } from 'expo-audio'
import * as Speech from 'expo-speech'

const correctAudio = require('~/assets/audio/correct.mp3')
const incorrectAudio = require('~/assets/audio/incorrect.mp3')

export const playCorrectAudio = (): void => {
  const player = createAudioPlayer(correctAudio)
  player.play()
}

export const playIncorrectAudio = (): void => {
  const player = createAudioPlayer(incorrectAudio)
  player.play()
}

export const textToSpeech = async (text: string, lang: string = 'en-US'): Promise<void> => {
  Speech.speak(text, { language: lang })
}
