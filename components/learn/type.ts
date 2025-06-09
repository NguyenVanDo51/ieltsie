
export enum LearnQuizType {
  EN_TO_VI = "EN_TO_VI",
  EN_TO_IMAGE = "EN_TO_IMAGE",
  VI_TO_EN = "VI_TO_EN",
  PICK_IN_EN_EXAMPLE = "PICK_IN_EN_EXAMPLE",
  MATCHING = "MATCHING",
}

export type QuizTypePercentConfig = Partial<Record<LearnQuizType, number>>;

