import { Link } from 'expo-router'
import { FC, useMemo } from 'react'
import { Platform, Pressable, View } from 'react-native'
import { ITopic } from '~/types/word'
import { Progress } from '../ui/progress'
import { Book, ChevronRight } from 'lucide-react-native'
import { Text } from '../ui/text'
import { Image } from 'expo-image'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Circle } from './Circle'
import { IScore } from '~/lib/storage'
import { TOTAL_QUIZ_PER_LESSON } from '~/lib/constants'
import { Lesson } from './Lesson'

const StartImg = require('~/assets/lesson/start.gif')
const NewLessonImg = require('~/assets/lesson/new.gif')
const PracticeImg = require('~/assets/lesson/practice.gif')
const FinalImg = require('~/assets/lesson/final.png')

export const LessonMap: FC<{ topic: ITopic; scores: IScore; lastLessonId: string }> = ({
  topic,
  scores,
  lastLessonId,
}) => {
  const marginLefts = useMemo(() => {
    const step = 70
    const marginLeft = 0 // Initial margin left for the first lesson
    const marginLefts = [
      -1 * marginLeft,
      -1 * marginLeft + step,
      -1 * marginLeft + step * 2,
      -1 * marginLeft + step,
      -1 * marginLeft + step - step,
      -1 * marginLeft + step - step * 2,
      -1 * marginLeft + step - step,
      -1 * marginLeft + step,
    ]
    return marginLefts
  }, [])

  return (
    <View className="flex-col-reverse gap-4 justify-center items-center">
      <View className="flex-row items-center bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/50">
        <Text>{topic.icon}</Text>
        <Text className="text-lg font-semibold ml-3 text-gray-800">{topic.name.vi}</Text>
      </View>
      <Lesson
        lessonId1={topic.lessons[0].id}
        marginLeft={marginLefts[0]}
        icon={StartImg}
        popoverContent="Bắt đầu bài học"
        popoverDescription="Học từ mới và làm bài tập"
        scores={scores}
        totalWord={topic.lessons[0].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[1].id}
        marginLeft={marginLefts[1]}
        icon={NewLessonImg}
        popoverContent="Học thêm từ mới"
        popoverDescription="Tiếp tục học từ mới trong bài học này"
        scores={scores}
        totalWord={topic.lessons[1].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[1].id}
        addition="prev"
        marginLeft={marginLefts[2]}
        icon={PracticeImg}
        popoverContent="Luyện tập từ đã học"
        popoverDescription="Luyện tập từ mới đã học trong bài học này"
        scores={scores}
        totalWord={topic.lessons[1].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[2].id}
        marginLeft={marginLefts[3]}
        icon={NewLessonImg}
        popoverContent="Học từ mới tiếp theo"
        popoverDescription="Tiếp tục học từ mới trong bài học này"
        scores={scores}
        totalWord={topic.lessons[2].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[2].id}
        addition="prev"
        marginLeft={marginLefts[4]}
        icon={PracticeImg}
        popoverContent="Luyện tập từ đã học"
        popoverDescription="Luyện tập từ mới đã học trong bài học này"
        scores={scores}
        totalWord={topic.lessons[2].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[3].id}
        marginLeft={marginLefts[5]}
        icon={NewLessonImg}
        popoverContent="Học thêm từ mới"
        popoverDescription="Tiếp tục học từ mới trong bài học này"
        scores={scores}
        totalWord={topic.lessons[3].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[3].id}
        addition="prev"
        marginLeft={marginLefts[6]}
        icon={PracticeImg}
        popoverContent="Luyện tập từ đã học"
        popoverDescription="Luyện tập từ mới đã học trong bài học này"
        scores={scores}
        totalWord={topic.lessons[3].words.length}
        lastLessonId={lastLessonId}
      />

      <Lesson
        lessonId1={topic.lessons[3].id}
        addition="all"
        marginLeft={marginLefts[7]}
        icon={FinalImg}
        popoverContent="Ôn tập tất cả từ mới"
        popoverDescription="Ôn tập tất cả từ mới đã học trong chủ đề này"
        scores={scores}
        totalWord={topic.lessons[3].words.length}
        lastLessonId={lastLessonId}
      />
    </View>
  )
}
