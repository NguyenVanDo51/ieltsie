import { View, Text, SectionList } from 'react-native'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { getScores } from '~/lib/storage'
import { useEffect, useMemo, useState } from 'react'
import { useLastLessonId } from '~/store/useLastLessonId'
import { Lesson } from '~/components/map/Lesson'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { DATA_ALL_LESSON, DATA_FLAT_LIST } from '~/lib/section'

export default function HomePage() {
  const [scores, setScores] = useState<Record<string, number>>({})
  const { lastLessonId, fetchLastLessonId } = useLastLessonId((t) => t)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const initData = async () => {
    setLoading(true)

    await getScores().then((savedScore) => {
      setScores(savedScore)
    })

    await fetchLastLessonId()
    setLoading(false)
  }

  const lastLessonIndex = useMemo(() => {
    return DATA_ALL_LESSON.findIndex((t) => t.id === lastLessonId)
  }, [lastLessonId])

  useEffect(() => {
    initData()
  }, [])
  console.log('lastLessonIndex', lastLessonId, lastLessonIndex)
  return (
    <SafeAreaView className="flex-1">
      {loading && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Loading...</Text>
        </View>
      )}

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
              <Text className="text-xl text-gray-500 font-semibold">{section.title.vi}</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}
