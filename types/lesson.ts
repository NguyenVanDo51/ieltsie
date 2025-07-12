import { IScore } from "~/lib/storage"

export type LessonProps = {
  originLessonId: string
  icon?: any
  marginLeft?: number
  prevLessonId?: string | 'all'
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