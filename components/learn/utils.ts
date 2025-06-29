import { LearnQuizType } from './type'
import { getRandomInt } from '~/lib/utils'

const types = [
  LearnQuizType.EN_TO_VI,
  LearnQuizType.EN_TO_VI,
  LearnQuizType.VI_TO_EN,
  LearnQuizType.VI_TO_EN,
  LearnQuizType.PICK_IN_EN_EXAMPLE,
  LearnQuizType.PICK_IN_EN_EXAMPLE,
  LearnQuizType.MATCHING,
]

// return a random type
export const getRandomQuizType = (): LearnQuizType => {
  const randomIndex = getRandomInt(0, types.length - 1)
  return types[randomIndex]
}
