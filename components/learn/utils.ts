import { LearnQuizType } from './type'
import { getRandomInt } from '~/lib/utils'

const types = [
  LearnQuizType.EN_CHOISE,
  LearnQuizType.EN_CHOISE,
  LearnQuizType.VI_CHOISE,
  LearnQuizType.VI_CHOISE,
  LearnQuizType.PICK_IN_EN_EXAMPLE,
  LearnQuizType.PICK_IN_EN_EXAMPLE,
  LearnQuizType.MATCHING,
  LearnQuizType.SELECT_WORD_FROM_EXPLANATION,
  LearnQuizType.SELECT_WORD_FROM_EXPLANATION,
]

export const getRandomQuizType = (): LearnQuizType => {
  const randomIndex = getRandomInt(0, types.length - 1)
  return types[randomIndex]
}

const correctMessages = [
  "Bạn đã làm đúng! 🎉",
  "Tuyệt vời, bạn đã chọn đúng! 🌟",
  "Chính xác, bạn đã hiểu đúng! 👍",
  "Xuất sắc, bạn đã trả lời đúng! 🥳",
]

const wrongMessages = [
  "Không chính xác, hãy thử lại! ❌",
  "Gần đúng rồi, đừng bỏ cuộc! 💔",
  "Cố gắng tiếp nhé, bạn sẽ làm được! 🔄",
  "Sai rồi, nhưng không sao, hãy học từ sai lầm! 📚",
]

export const getRandomCorrectMessage = (): string => {
  const randomIndex = getRandomInt(0, correctMessages.length - 1)
  return correctMessages[randomIndex]
}

export const getRandomWrongMessage = (): string => {
  const randomIndex = getRandomInt(0, wrongMessages.length - 1)
  return wrongMessages[randomIndex]
}