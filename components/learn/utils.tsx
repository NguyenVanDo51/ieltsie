import { IWord } from "~/types/word";
import { LearnQuizType, QuizTypePercentConfig } from "./type";
import { getRandomInt } from "~/lib/utils";
import { Image } from "react-native";

export const getRandomQuizType = (): LearnQuizType => {
  const percentConfig: QuizTypePercentConfig = {
    [LearnQuizType.EN_TO_VI]: 30,
    [LearnQuizType.VI_TO_EN]: 30,
    [LearnQuizType.MATCHING]: 30,
    [LearnQuizType.PICK_IN_EN_EXAMPLE]: 10,
  };
  const config = { ...percentConfig };

  // Filter out types with 0 percent
  const types = Object.entries(config)
    .filter(([_, percent]) => percent && percent > 0)
    .map(([type, percent]) => ({
      type: type as LearnQuizType,
      percent: percent!,
    }));

  // Build a weighted array
  const weighted: LearnQuizType[] = [];
  types.forEach(({ type, percent }) => {
    for (let i = 0; i < percent; i++) {
      weighted.push(type);
    }
  });

  // Fallback to equal distribution if weighted is empty
  if (weighted.length === 0) {
    return LearnQuizType.EN_TO_VI;
  }

  const idx = Math.floor(Math.random() * weighted.length);
  return weighted[idx];
};

export const getQuestion = (type: LearnQuizType, currentWord: IWord) => {
  if (!currentWord) return "";

  switch (type) {
    case LearnQuizType.EN_TO_VI:
      return currentWord.en;
    case LearnQuizType.EN_TO_IMAGE:
      return currentWord.en;
    case LearnQuizType.VI_TO_EN:
      return currentWord.vi;
    // TODO: Write unit tests for this
    case LearnQuizType.PICK_IN_EN_EXAMPLE:
      return currentWord.example[
        getRandomInt(0, currentWord.example.length - 1)
      ].en
        .toLowerCase()
        .replace(currentWord.en.toLowerCase(), "________");
    default:
      return "";
  }
};

export const getCorrectAnswer = (type: LearnQuizType, currentWord: IWord) => {
  if (!currentWord) return "";

  switch (type) {
    case LearnQuizType.EN_TO_VI:
      return currentWord.vi;
    case LearnQuizType.EN_TO_IMAGE:
      return currentWord.img;
    case LearnQuizType.VI_TO_EN:
      return currentWord.en;
    case LearnQuizType.PICK_IN_EN_EXAMPLE:
      return currentWord.en;
    default:
      return "";
  }
};

const getRandomOptions = (
  allWords: IWord[],
  currentWord: IWord,
  field: keyof Pick<IWord, "en" | "vi" | "img">,
  count: number = getRandomInt(2, 3)
): string[] => {
  const otherWords = allWords.filter((w) => w.id !== currentWord.id);
  const shuffled = [...otherWords].sort(() => Math.random() - 0.5);
  return [
    currentWord[field],
    ...shuffled.slice(0, count).map((w) => w[field]),
  ].sort(() => Math.random() - 0.5);
};

export const getOptions = (
  type: LearnQuizType,
  currentWord: IWord,
  allWords: IWord[]
) => {
  if (!currentWord) return [];

  switch (type) {
    case LearnQuizType.EN_TO_VI:
      return getRandomOptions(allWords, currentWord, "vi");
    case LearnQuizType.EN_TO_IMAGE:
      return getRandomOptions(allWords, currentWord, "img").map((imgUri) => ({
        text: imgUri,
        render: (text: string) => (
          <Image
            source={{ uri: text }} // Use { uri: text } for network images
            alt={imgUri} // alt is not directly used in RN Image
            className="w-24 h-24 object-cover mx-auto"
          />
        ),
      }));
    case LearnQuizType.VI_TO_EN:
    case LearnQuizType.PICK_IN_EN_EXAMPLE:
      return getRandomOptions(allWords, currentWord, "en");
    default:
      return [];
  }
};
