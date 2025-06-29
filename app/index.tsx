import { View, Text, SectionList } from 'react-native'
import { useMemo } from 'react'
import { Lesson } from '~/components/map/Lesson'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, useRouter } from 'expo-router'
import { DATA_ALL_LESSON, DATA_FLAT_LIST } from '~/lib/section'
import { useScores } from '~/store/useScore'
import { usetargetLanguage } from '~/store/useTargetLanguage'
import { useNativeLanguage } from '~/store/useNativeLanguage'

export default function HomePage() {
  const scores = useScores((t) => t.scores)
  const router = useRouter()
  const targetLanguage = usetargetLanguage(t => t.targetLanguage)
  const nativeLang = useNativeLanguage(t => t.nativeLanguage)

  const lastLessonIndex = useMemo(() => {
    return DATA_ALL_LESSON.findIndex((t) => !scores[t.id]) || -1
  }, [scores])

  if (!targetLanguage) {
    return <Redirect href="/select-language" />
  }

  return (
    <SafeAreaView className="flex-1">
      <SectionList
        sections={DATA_FLAT_LIST}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item, index }) => (
          <Lesson
            {...item}
            scores={scores}
            disabled={index > lastLessonIndex + 1}
            onStart={() => {
              router.push({
                pathname: '/lessons/[lessonId]',
                params: {
                  lessonId: item.id,
                  topicId: item.topicId,
                  addition: item.addition || '',
                },
              })
            }}
          />
        )}
        renderSectionHeader={({ section }) => {
          return (
            <View className="flex-row items-center justify-center gap-4 px-4 py-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="text-xl text-gray-500 font-semibold">{section.title[nativeLang]}</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
