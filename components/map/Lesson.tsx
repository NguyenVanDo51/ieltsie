import { Link } from 'expo-router'
import { FC } from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../ui/text'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Circle } from './Circle'
import { IScore } from '~/lib/storage'
import { QUESTION_MULTIPLES } from '~/lib/constants'

export type LessonProps = {
  lessonId1: string
  icon?: any
  marginLeft?: number
  lastLessonId: string | undefined
  addition?: 'prev' | 'allTopic'
  popoverContent?: string
  popoverDescription?: string
  scores: IScore
  totalWord: number
}

export const Lesson: FC<LessonProps> = ({
  lessonId1,
  addition,
  marginLeft = 0,
  icon,
  popoverContent,
  popoverDescription,
  scores,
  totalWord,
  lastLessonId = undefined,
}) => {
  const insets = useSafeAreaInsets()
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  const progress = Math.round(((scores[lessonId1] || 0) / (totalWord * QUESTION_MULTIPLES)) * 100)
  const isDisabled = progress < 1 && lessonId1 !== lastLessonId

  return (
    <Tooltip delayDuration={150}>
      <View className="gap-4 p-2 flex justify-center items-center" style={{ marginLeft }}>
        <TooltipTrigger asChild disabled={isDisabled}>
          <Pressable>
            <Circle width={90} progress={progress}>
              {isDisabled && (
                <View className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-full bg-white/50 z-10" />
              )}

              <View className="p-2 rounded-lg">
                <Image source={icon} style={{ width: 50, height: 50 }} contentFit="cover" />
              </View>
            </Circle>
          </Pressable>
        </TooltipTrigger>

        <TooltipContent insets={contentInsets} className="w-80 p-4 gap-1 rounded-2xl">
          <Text className="font-medium leading-none text-xl">{popoverContent}</Text>

          {popoverDescription && <Text className="text-gray-600">{popoverDescription}</Text>}

          <Link
            href={{
              pathname: '/lessons/[lessonId]',
              params: { lessonId: lessonId1, addition: addition || '' },
            }}
            className="mt-4"
          >
            <Button className="w-full" size="default">
              <Text className="text-lg font-bold uppercase web:text-base">Bắt đầu +10 KN</Text>
            </Button>
          </Link>
        </TooltipContent>
        {/* <Progress value={progress} indicatorClassName="bg-primary" /> */}
      </View>
    </Tooltip>
  )
}
