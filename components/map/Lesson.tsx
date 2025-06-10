import { Link } from 'expo-router'
import { FC, useRef } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../ui/text'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Circle } from './Circle'
import { IScore } from '~/lib/storage'
import { TOTAL_QUIZ_PER_LESSON } from '~/lib/constants'
import { usePopover } from '../ui/popover'

export type LessonProps = {
  lessonId1: string
  icon?: any
  marginLeft?: number
  addition?: 'prev' | 'all'
  popoverContent?: string
  popoverDescription?: string
  scores: IScore
  topicId: string
  disabled?: boolean
  onStart: () => void
}

const scoreProcessMapping = {
  0: 0,
  1: 33.333,
  2: 66.666,
  3: 100,
  4: 100,
  5: 100,
  6: 100,
}

export const Lesson: FC<LessonProps> = ({
  lessonId1,
  marginLeft = 0,
  icon,
  popoverContent,
  popoverDescription,
  scores,
  disabled = false,
  onStart,
}) => {
  const anchorRef = useRef<View>(null)
  const { openPopover, closePopover } = usePopover()

  const progress = scoreProcessMapping[scores[lessonId1] || 0]

  return (
    <View className="gap-4 p-2 flex justify-center items-center" style={{ marginLeft }}>
      <Pressable
        ref={anchorRef}
        disabled={disabled}
        onPress={() => {
          openPopover({
            anchorRef,
            content: (
              <View className="w-60 gap-1 rounded-2xl">
                <Text className="font-medium leading-none text-xl">{popoverContent}</Text>

                {popoverDescription && <Text className="text-gray-600">{popoverDescription}</Text>}

                <Button
                  className="w-full mt-4 web:rounded-xl"
                  size="default"
                  onPress={() => {
                    onStart()
                    setTimeout(() => {
                      closePopover()
                    }, 1)
                  }}
                >
                  <Text className="native:text-lg font-bold uppercase web:text-sm">
                    Bắt đầu +10 KN
                  </Text>
                </Button>
              </View>
            ),
          })
        }}
      >
        <Circle width={90} progress={progress}>
          {disabled && (
            <View className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full bg-white/50 z-10" />
          )}

          <View className="p-2 rounded-lg">
            <Image source={icon} style={{ width: 50, height: 50 }} contentFit="cover" />
          </View>
        </Circle>
      </Pressable>
    </View>
  )
}
