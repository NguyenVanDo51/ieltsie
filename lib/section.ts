import { ITopic } from '~/types/word'
import { IScore } from './storage'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { LessonPart } from '~/types/lesson'

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

const transformDataSection = (data: ITopic[]) => {
  const sectionTemp = data.map((topic) => {
    const lessonParts: LessonPart[] = []

    lessonParts.push({
      id: `${topic.lessons[0].id}-start`,
      topicId: topic.id,
      originLessonId: topic.lessons[0].id,
      marginLeft: marginLefts[0],
      icon: StartImg,
      popoverContent: 'Bắt đầu bài học',
      popoverDescription: 'Học từ mới và làm bài tập',
    })

    lessonParts.push({
      id: `${topic.lessons[0].id}-new`,
      topicId: topic.id,
      originLessonId: topic.lessons[1].id,
      marginLeft: marginLefts[1],
      icon: NewLessonImg,
      popoverContent: 'Học thêm từ mới',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
    })

    lessonParts.push({
      id: `${topic.lessons[1].id}-practice`,
      topicId: topic.id,
      originLessonId: topic.lessons[1].id,
      prevLessonId: topic.lessons[0].id,
      marginLeft: marginLefts[2],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
    })

    lessonParts.push({
      id: `${topic.lessons[2].id}-new`,
      topicId: topic.id,
      originLessonId: topic.lessons[2].id,
      marginLeft: marginLefts[3],
      icon: NewLessonImg,
      popoverContent: 'Học từ mới tiếp theo',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
    })

    lessonParts.push({
      id: `${topic.lessons[2].id}-practice`,
      topicId: topic.id,
      originLessonId: topic.lessons[2].id,
      prevLessonId: topic.lessons[1].id,
      marginLeft: marginLefts[4],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
    })

    lessonParts.push({
      id: `${topic.lessons[3].id}-new`,
      topicId: topic.id,
      originLessonId: topic.lessons[3].id,
      marginLeft: marginLefts[5],
      icon: NewLessonImg,
      popoverContent: 'Học thêm từ mới',
      popoverDescription: 'Tiếp tục học từ mới trong bài học này',
    })
    
    lessonParts.push({
      id: `${topic.lessons[3].id}-practice`,
      topicId: topic.id,
      originLessonId: topic.lessons[3].id,
      prevLessonId: topic.lessons[2].id,
      marginLeft: marginLefts[6],
      icon: PracticeImg,
      popoverContent: 'Luyện tập từ đã học',
      popoverDescription: 'Luyện tập từ mới đã học trong bài học này',
    })
    lessonParts.push({
      id: `${topic.lessons[3].id}-final`,
      topicId: topic.id,
      originLessonId: topic.lessons[3].id,
      prevLessonId: 'all',
      marginLeft: marginLefts[7],
      icon: FinalImg,
      popoverContent: 'Ôn tập tất cả từ mới',
      popoverDescription: 'Ôn tập tất cả từ mới đã học trong chủ đề này',
    })

    return {
      title: topic.name,
      data: lessonParts,
    }
  })

  return sectionTemp
}

export const DATA_FLAT_LIST = transformDataSection(IT_VOCAB_LESSONS)

export const DATA_ALL_LESSON = DATA_FLAT_LIST.map((item) => item.data).flat()
