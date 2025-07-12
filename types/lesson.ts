import { IScore } from "~/lib/storage"

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

export type LessonPart = Omit<LessonProps, 'onStart' | 'lastLessonId' | 'scores'> & {
  id: string
}