import React, { useEffect, useMemo, useState, type FC } from "react";
import { View, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native"; // For the icon

// Assuming these are defined elsewhere and compatible with RN
import type { ILesson } from "~/types/word";
import LearnQuiz from "~/components/learn";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { IT_VOCAB_LESSONS } from "~/data/vocab";

const LearnPage: FC = () => {
  const a = useLocalSearchParams();

  const { lessonId, topicId, addition } = a;

  const [isDoWrongWords, setIsDoWrongWords] = useState(false);

  const topic = useMemo(() => {
    return IT_VOCAB_LESSONS.find((t) => t.id === topicId);
  }, [topicId]);

  const lessonIndex = useMemo(() => {
    return topic.lessons.findIndex((l) => l.id === lessonId);
  }, [topicId, lessonId]);

  const lesson = useMemo(() => {
    return topic.lessons[lessonIndex];
  }, [topicId, lessonId, lessonIndex]);

  const [currentWords, setCurrentWords] = useState<ILesson["words"]>([]);

  const handleWrongWords = (wrongWOrds?: ILesson["words"]) => {
    // If words are passed, use them; otherwise, use all words from the lesson
    setCurrentWords(wrongWOrds);
    setIsDoWrongWords(true);
  };

  useEffect(() => {
    if (currentWords.length === 0) {
      const words = [];

      if (!addition) {
        words.push(...lesson.words);
      }

      if (addition === "prev") {
        // If addition is "prev", get words from the previous lesson
        const prevLesson = topic.lessons[lessonIndex - 1];
        if (prevLesson) {
          words.push(...prevLesson.words);
        }
      }
      if (addition === "all") {
        topic.lessons.forEach((l) => {
          words.push(...l.words);
        });
      }

      setCurrentWords(words);
    }
  }, []);

  return (
    <LearnQuiz
      words={currentWords}
      topic={topic}
      lesson={lesson}
      handleWrongWords={handleWrongWords}
      isDoWrongWords={isDoWrongWords}
    />
  );
};

export default LearnPage;
