import React, { useEffect, useState, ReactElement } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "../ui/text";

type OptionType = {
  text: string;
  render: (text: string) => ReactElement;
};

type Props = {
  question: string;
  options: (OptionType | string)[];
  optionContainerClassName?: string;
  correctAnswer: string;
  onCorrect: () => void;
  onIncorrect: () => void;
};

export const SelectOne: React.FC<Props> = ({
  question,
  options,
  correctAnswer,
  optionContainerClassName = "",
  onCorrect,
  onIncorrect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option: OptionType | string) => {
    if (isAnswered) return;

    const optionText = typeof option === "string" ? option : option.text;
    setSelectedAnswer(optionText);
    setIsAnswered(true);

    if (optionText === correctAnswer) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const getOptionElement = (option: OptionType | string) => {
    if (typeof option === "string") return <Text>{option}</Text>;

    return option.render(option.text);
  };

  const getOptionClassName = (option: OptionType | string): string => {
    const optionText = typeof option === "string" ? option : option.text;
    const baseClass =
      "text-center items-center w-full p-4 rounded-lg text-base border transition-all";

    if (!isAnswered) {
      return `${baseClass} bg-white border-gray-300`;
    }

    if (optionText === correctAnswer) {
      return `${baseClass} bg-green-100 border-green-500`;
    }

    if (optionText === selectedAnswer) {
      return `${baseClass} bg-red-100 border-red-500`;
    }

    return `${baseClass} opacity-50 bg-white border-gray-200`;
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question, correctAnswer]);

  return (
    <View className="w-full">
      <View className="mb-6">
        <Text
          className="text-2xl font-semibold text-gray-800 mb-4"
          style={{ textTransform: "capitalize" }}
        >
          {question}
        </Text>
      </View>

      <View className={`flex flex-col gap-4 ${optionContainerClassName}`}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            disabled={isAnswered}
            onPress={() => handleOptionClick(option)}
            className={cn(getOptionClassName(option))}
          >
            {getOptionElement(option)}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
