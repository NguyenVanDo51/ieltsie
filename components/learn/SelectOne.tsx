import React, { useEffect, useState, ReactElement, useCallback, JSX } from 'react'
import { View, Pressable } from 'react-native'
import { cn } from '~/lib/utils'
import { Text } from '../ui/text'

type OptionType = {
  text: string
  render: (text: string) => ReactElement
}

type Props = {
  question: JSX.Element | string
  options: (OptionType | string)[]
  optionContainerClassName?: string
  correctAnswer: string
  onCorrect: () => void
  onIncorrect: () => void
}

export const SelectOne: React.FC<Props> = ({
  question,
  options,
  correctAnswer,
  optionContainerClassName = '',
  onCorrect,
  onIncorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleOptionClick = (option: OptionType | string) => {
    if (isAnswered) return

    const optionText = typeof option === 'string' ? option : option.text
    setSelectedAnswer(optionText)
    setIsAnswered(true)

    if (optionText === correctAnswer) {
      onCorrect()
    } else {
      onIncorrect()
    }
  }

  const getOptionElement = (option: OptionType | string) => {
    if (typeof option === 'string') return <Text>{option}</Text>

    return option.render(option.text)
  }

  const getOptionClassName = useCallback(
    (option: OptionType | string): string => {
      const optionText = typeof option === 'string' ? option : option.text
      const baseClass = 'text-center items-center w-full p-4 rounded-lg text-base border'

      if (!isAnswered) {
        return `${baseClass} bg-white border-gray-300 text-red-500`
      }

      // đáp án đúng
      if (optionText === correctAnswer) {
        return `${baseClass} bg-green-100 border-green-500`
      }

      // đáp án sai
      if (optionText === selectedAnswer) {
        return `${baseClass} bg-red-100 border-red-500`
      }

      // mờ đi khi công bố kết quả
      return `${baseClass} opacity-70 bg-white border-gray-300`
    },
    [correctAnswer, isAnswered, selectedAnswer]
  )

  useEffect(() => {
    setSelectedAnswer(null)
    setIsAnswered(false)
  }, [question, options, correctAnswer])

  return (
    <View className="w-full">
      <View className="mb-10">
        {typeof question === 'string' ? (
          <Text className="text-2xl font-semibold text-gray-800 ">{question}</Text>
        ) : (
          question
        )}
      </View>

      <View className={`flex flex-col gap-4 ${optionContainerClassName}`}>
        {options.map((option, index) => (
          <Pressable
            key={index}
            disabled={isAnswered}
            onPressIn={() => handleOptionClick(option)}
            className={getOptionClassName(option)}
          >
            {getOptionElement(option)}
          </Pressable>
        ))}
      </View>
    </View>
  )
}
