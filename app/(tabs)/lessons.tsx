import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Typography, Card, GradientBackground } from '~/components/design-system'
import { designTokens } from '~/components/design-system'
import { IT_VOCAB_LESSONS } from '~/data/vocab'
import { useScores } from '~/store/useScore'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { Image } from 'expo-image'

const LessonImage = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'

export default function LessonsScreen() {
  const router = useRouter()
  const scores = useScores((t) => t.scores)
  const nativeLang = useNativeLanguage((t) => t.nativeLanguage)

  const getTopicProgress = (topicId: string) => {
    const topic = IT_VOCAB_LESSONS.find(t => t.id === topicId)
    if (!topic) return 0
    
    const totalLessons = topic.lessons.length
    const completedLessons = topic.lessons.filter(lesson => scores[lesson.id]).length
    return Math.round((completedLessons / totalLessons) * 100)
  }

  return (
    <GradientBackground variant="primary">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h2" color={designTokens.colors.white} weight="bold">
            Bài học
          </Typography>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.9)">
            Khám phá các chủ đề học tập
          </Typography>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {IT_VOCAB_LESSONS.map((topic) => {
            const progress = getTopicProgress(topic.id)
            
            return (
              <Card
                key={topic.id}
                style={styles.topicCard}
                onPress={() => {
                  router.push({
                    pathname: '/lessons/[lessonId]',
                    params: {
                      lessonId: topic.lessons[0].id,
                      topicId: topic.id,
                    },
                  })
                }}
                variant="elevated"
              >
                <View style={styles.cardContent}>
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: LessonImage }}
                      style={styles.topicImage}
                      contentFit="cover"
                    />
                    <View style={styles.iconOverlay}>
                      <Typography variant="h2">{topic.icon}</Typography>
                    </View>
                  </View>
                  
                  <View style={styles.topicInfo}>
                    <Typography variant="h4" weight="bold" style={styles.topicTitle}>
                      {topic.name[nativeLang]}
                    </Typography>
                    
                    <Typography variant="body2" color={designTokens.colors.neutral[600]}>
                      {topic.lessons.length} bài học
                    </Typography>
                    
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${progress}%` }
                          ]} 
                        />
                      </View>
                      <Typography variant="caption" color={designTokens.colors.neutral[500]}>
                        {progress}% hoàn thành
                      </Typography>
                    </View>
                  </View>
                </View>
              </Card>
            )
          })}
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: designTokens.spacing.xl,
    paddingTop: designTokens.spacing.xl,
    paddingBottom: designTokens.spacing['2xl'],
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: designTokens.colors.neutral[50],
    borderTopLeftRadius: designTokens.borderRadius['2xl'],
    borderTopRightRadius: designTokens.borderRadius['2xl'],
  },
  scrollContent: {
    padding: designTokens.spacing.xl,
    paddingBottom: designTokens.spacing['6xl'],
  },
  topicCard: {
    marginBottom: designTokens.spacing.xl,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: designTokens.borderRadius.lg,
    overflow: 'hidden',
    marginRight: designTokens.spacing.lg,
  },
  topicImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    marginBottom: designTokens.spacing.xs,
  },
  progressContainer: {
    marginTop: designTokens.spacing.md,
  },
  progressBar: {
    height: 6,
    backgroundColor: designTokens.colors.neutral[200],
    borderRadius: 3,
    marginBottom: designTokens.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: designTokens.colors.primary[500],
    borderRadius: 3,
  },
})