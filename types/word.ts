export type IText = {
  en: string // English text
  fr: string // French translation
  es: string // Spanish translation
  de: string // German translation
  cn: string // Chinese translation
  vi: string // Vietnamese translation
}

export type IWord = IText & {
  id: string
  example: IText[] // 2 examples, contain exactly the vocabulary word
  img: string
  explanation: IText // short and simple explanation of the word
}

export type ILesson = {
  id: string
  words: IWord[]
}

export type ITopic = {
  id: string
  name: IText
  icon: string
  lessons: ILesson[]
}

// gom theo topic, và mỗi topic có nhiều phần, mỗi phần có nhiều từ
// các phần trong topic có liên quan, khi học có thể học theo topic hoặc theo phần
// phần sau có thể có các từ đã học ở phần trước

// bài tập 1 unit:
// 1. học lesson 1
// 2. học lesson 2
// 3. ôn tập lại lesson 1,2
// 4. học lesson 3
// 5. học lesson 4
// 6. ôn tập lại lesson 3,4
// 7. học lesson 5
// 8. ôn tập lại lesson 4,5
// 9. ôn tập lại lesson 1,2,3,4,5
// 10. ôn tập lại lesson 1,2,3,4,5
