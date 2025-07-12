import React, { useEffect, useState } from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import type { IWord } from '~/types/word'
import { cn } from '~/lib/utils'
import { Text } from '../ui/text'
import { TARGET_LANGUAGE, UI_LANGUAGE } from '~/lib/constants'

type Props = {
  words: IWord[]
  onCorrect: () => void
}

export const Matching: React.FC<Props> = ({ words, onCorrect }) => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [selectedRight, setSelectedRight] = useState<string | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())

  const [shuffledLeft, setShuffledLeft] = useState<IWord[]>([])
  const [shuffledRight, setShuffledRight] = useState<IWord[]>([])

  useEffect(() => {
    setShuffledLeft([...words].sort(() => Math.random() - 0.5))
    setShuffledRight([...words].sort(() => Math.random() - 0.5))
    setMatchedPairs(new Set())
    setSelectedLeft(null)
    setSelectedRight(null)
  }, [words])

  const handleSelect = (id: string, side: 'left' | 'right') => {
    if (matchedPairs.has(id)) return

    if (side === 'left') {
      setSelectedLeft(selectedLeft === id ? null : id)
    } else {
      setSelectedRight(selectedRight === id ? null : id)
    }
  }

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const leftWord = words.find((w) => w.id === selectedLeft)
      const rightWord = words.find((w) => w.id === selectedRight)

      if (leftWord && rightWord && leftWord.id === rightWord.id) {
        setMatchedPairs((prev) => new Set([...prev, leftWord.id]))
      }

      setTimeout(() => {
        setSelectedLeft(null)
        setSelectedRight(null)
      }, 500)
    }
  }, [selectedLeft, selectedRight, words])

  useEffect(() => {
    if (matchedPairs.size === words.length) {
      onCorrect()
    }
  }, [matchedPairs.size, words.length])

  const getButtonStyle = (id: string, isSelected: boolean): string => {
    if (matchedPairs.has(id)) {
      return 'bg-gray-200 border border-gray-300'
    }
    if (isSelected) {
      return 'bg-blue-100 border border-blue-500'
    }
    return 'bg-white border border-gray-200'
  }

  return (
    <ScrollView className="w-full py-6 ">
      <Text className="text-2xl font-semibold text-gray-800 mb-4">Ghép từ </Text>
      <View className="flex-row gap-4 mt-6">
        {/* Left Column */}
        <View className="flex-1 gap-4">
          {shuffledLeft.map((word) => (
            <TouchableOpacity
              key={`left-${word.id}`}
              onPress={() => handleSelect(word.id, 'left')}
              disabled={matchedPairs.has(word.id)}
              className={cn('p-4 rounded-lg', getButtonStyle(word.id, selectedLeft === word.id))}
            >
              <Text className="text-base text-center">{word[TARGET_LANGUAGE]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Column */}
        <View className="flex-1 gap-4">
          {shuffledRight.map((word) => (
            <TouchableOpacity
              key={`right-${word.id}`}
              onPress={() => handleSelect(word.id, 'right')}
              disabled={matchedPairs.has(word.id)}
              className={cn('p-4 rounded-lg', getButtonStyle(word.id, selectedRight === word.id))}
            >
              <Text className="text-base text-center">{word[UI_LANGUAGE]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
