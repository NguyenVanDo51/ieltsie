import { LessonProps } from '~/components/map/Lesson'
import { ITopic } from '~/types/word'
import { IScore } from './storage'

const StartImg = require('~/assets/lesson/start.gif')
const NewLessonImg = require('~/assets/lesson/new.gif')
const PracticeImg = require('~/assets/lesson/practice.gif')
const FinalImg = require('~/assets/lesson/final.png')

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

export const transformDataSection = (data: ITopic[], scores: IScore, lastLessonId: string) => {
  const sectionTemp = data.map((topic) => {
    const lessonParts: (LessonProps & { id: string })[] = []

    lessonParts.push({
      id: `${topic.lessons[0].id}-start`,
      topicId: topic.id,
      lessonId1: topic.lessons[0].id,
      marginLeft: marginLefts[0],
      icon: StartImg,
      popoverContent: 'Bắt đầu bài học',
      popoverDescription: 'Học từ mới và làm bài tập',
      scores: scores,
      totalWord: topic.lessons[0].words.length,
      lastLessonId: lastLessonId,
    })

    lessonParts.push({
      id: `${topic.lessons[0].id}-new`,
      topicId: topic.id,
      lessonId1: topic.lessons[1].id,
      marginLeft: marginLefts[1],
      icon: NewLessonImg,
      popoverContent: 'Học thêm từ mới',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
      scores: scores,
      totalWord: topic.lessons[1].words.length,
      lastLessonId: lastLessonId,
    })

    lessonParts.push({
      id: `${topic.lessons[1].id}-practice`,
      topicId: topic.id,
      lessonId1: topic.lessons[1].id,
      addition: 'prev',
      marginLeft: marginLefts[2],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
      scores: scores,
      totalWord: topic.lessons[1].words.length,
      lastLessonId: lastLessonId,
    })
    lessonParts.push({
      id: `${topic.lessons[2].id}-new`,
      topicId: topic.id,
      lessonId1: topic.lessons[2].id,
      marginLeft: marginLefts[3],
      icon: NewLessonImg,
      popoverContent: 'Học từ mới tiếp theo',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
      scores: scores,
      totalWord: topic.lessons[2].words.length,
      lastLessonId: lastLessonId,
    })

    lessonParts.push({
      id: `${topic.lessons[2].id}-practice`,
      topicId: topic.id,
      lessonId1: topic.lessons[2].id,
      addition: 'prev',
      marginLeft: marginLefts[4],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
      scores: scores,
      totalWord: topic.lessons[2].words.length,
      lastLessonId: lastLessonId,
    })
    lessonParts.push({
      id: `${topic.lessons[3].id}-new`,
      topicId: topic.id,
      lessonId1: topic.lessons[3].id,
      marginLeft: marginLefts[5],
      icon: NewLessonImg,
      popoverContent: 'Học thêm từ mới',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
      scores: scores,
      totalWord: topic.lessons[3].words.length,
      lastLessonId: lastLessonId,
    })
    lessonParts.push({
      id: `${topic.lessons[3].id}-practice`,
      topicId: topic.id,
      lessonId1: topic.lessons[3].id,
      addition: 'prev',
      marginLeft: marginLefts[6],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
      scores: scores,
      totalWord: topic.lessons[3].words.length,
      lastLessonId: lastLessonId,
    })
    lessonParts.push({
      id: `${topic.lessons[3].id}-final`,
      topicId: topic.id,
      lessonId1: topic.lessons[3].id,
      addition: 'all',
      marginLeft: marginLefts[7],
      icon: FinalImg,
      popoverContent: 'Ôn tập tất cả từ mới',
      popoverDescription: 'Ôn tập tất cả từ mới đã học trong chủ đề này',
      scores: scores,
      totalWord: topic.lessons[3].words.length,
      lastLessonId: lastLessonId,
    })

    return {
      title: topic.name,
      data: lessonParts,
    }
  })

  return sectionTemp
}
