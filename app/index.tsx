import { View, Text, SectionList } from 'react-native'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { getKnownWords, getScores, IScore } from '~/lib/storage'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLastLessonId } from '~/store/useLastLessonId'
import { Lesson, LessonProps } from '~/components/map/Lesson'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ITopic } from '~/types/word'
import { transformDataSection } from '~/lib/section'

export default function HomePage() {
  const [knownWords, setKnownWords] = useState<Record<string, string[]>>({})
  const [scores, setScores] = useState<Record<string, number>>({})
  const { lastLessonId, setLastLessonId, fetchLastLessonId } = useLastLessonId((t) => t)
  const [loading, setLoading] = useState(true)

  const initData = async () => {
    setLoading(true)
    await getKnownWords().then((words) => {
      setKnownWords(words)
    })

    await getScores().then((savedScore) => {
      setScores(savedScore)
    })

    await fetchLastLessonId()
    setLoading(false)
  }

  useEffect(() => {
    initData()
  }, [])

  useEffect(() => {
    if (!lastLessonId && loading === false) {
      setLastLessonId(IT_VOCAB_LESSONS[0].lessons[0].id)
    }
  }, [lastLessonId])

  const sections = useMemo(() => {
    return transformDataSection(IT_VOCAB_LESSONS, scores, lastLessonId)
  }, [scores, lastLessonId])

  return (
    <SafeAreaView className="flex-1 ">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item }) => <Lesson {...item} />}
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
