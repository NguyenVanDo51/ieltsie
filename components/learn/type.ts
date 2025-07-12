
export enum LearnQuizType {
  EN_CHOISE = "EN_CHOISE",
  VI_CHOISE = "VI_CHOISE",
  PICK_IN_EN_EXAMPLE = "PICK_IN_EN_EXAMPLE",
  MATCHING = "MATCHING",
  SELECT_WORD_FROM_EXPLANATION = "SELECT_WORD_FROM_EXPLANATION",
}

export type QuizTypePercentConfig = Partial<Record<LearnQuizType, number>>;

