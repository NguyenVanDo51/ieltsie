import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Play, Lock, CircleCheck as CheckCircle, Star } from 'lucide-react-native'
import { DATA_ALL_LESSON, DATA_FLAT_LIST } from '~/lib/section'
import { useScores } from '~/store/useScore'
import { usetargetLanguage } from '~/store/useTargetLanguage'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { designTokens } from '~/components/design-system'

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

  const renderLessonItem = ({ item, index }) => {
    const isCompleted = !!scores[item.id]
    const isDisabled = index > lastLessonIndex + 1
    const isActive = index === lastLessonIndex + 1
    const score = scores[item.id] || 0
    const progress = Math.min((score / 3) * 100, 100)

    const handlePress = () => {
      if (!isDisabled) {
        router.push({
          pathname: '/lessons/[lessonId]',
          params: {
            lessonId: item.id,
            topicId: item.topicId,
            addition: item.addition || '',
          },
        })
      }
    }

    return (
      <TouchableOpacity
        style={[
          styles.lessonCard,
          isDisabled && styles.disabledCard,
          isActive && styles.activeCard,
        ]}
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={
            isCompleted 
              ? ['#22c55e', '#16a34a'] 
              : isActive 
                ? ['#3b82f6', '#1d4ed8']
                : isDisabled
                  ? ['#f3f4f6', '#e5e7eb']
                  : ['#ffffff', '#f8fafc']
          }
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardContent}>
            {/* Lesson Icon */}
            <View style={[
              styles.iconContainer,
              isCompleted && styles.completedIconContainer,
              isDisabled && styles.disabledIconContainer,
            ]}>
              {isDisabled ? (
                <Lock size={24} color={designTokens.colors.neutral[400]} />
              ) : isCompleted ? (
                <CheckCircle size={24} color={designTokens.colors.white} />
              ) : (
                <Image 
                  source={item.icon} 
                  style={styles.lessonIcon}
                  contentFit="cover"
                />
              )}
            </View>

            {/* Lesson Info */}
            <View style={styles.lessonInfo}>
              <Text style={[
                styles.lessonTitle,
                isCompleted && styles.completedText,
                isDisabled && styles.disabledText,
              ]}>
                {item.popoverContent}
              </Text>
              
              {item.popoverDescription && (
                <Text style={[
                  styles.lessonDescription,
                  isCompleted && styles.completedDescriptionText,
                  isDisabled && styles.disabledText,
                ]}>
                  {item.popoverDescription}
                </Text>
              )}

              {/* Progress Bar */}
              {(isCompleted || isActive) && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${progress}%` },
                        isCompleted && styles.completedProgress,
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.progressText,
                    isCompleted && styles.completedText,
                  ]}>
                    {Math.round(progress)}%
                  </Text>
                </View>
              )}
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
              {isCompleted ? (
                <View style={styles.scoreContainer}>
                  <Star size={16} color={designTokens.colors.warning[500]} fill={designTokens.colors.warning[500]} />
                  <Text style={styles.scoreText}>{score}</Text>
                </View>
              ) : !isDisabled ? (
                <View style={[
                  styles.playButton,
                  isActive && styles.activePlayButton,
                ]}>
                  <Play 
                    size={20} 
                    color={isActive ? designTokens.colors.white : designTokens.colors.primary[500]}
                    fill={isActive ? designTokens.colors.white : designTokens.colors.primary[500]}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLine} />
      <Text style={styles.sectionTitle}>{section.title[nativeLang]}</Text>
      <View style={styles.sectionLine} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Học từ vựng</Text>
        <Text style={styles.headerSubtitle}>Tiếp tục hành trình học tập của bạn</Text>
      </LinearGradient>

      <FlatList
        data={DATA_FLAT_LIST}
        keyExtractor={(item) => item.title.en}
        renderItem={({ item }) => (
          <View style={styles.section}>
            {renderSectionHeader({ section: item })}
            <FlatList
              data={item.data}
              keyExtractor={(lesson) => lesson.id}
              renderItem={renderLessonItem}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        inverted
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.neutral[50],
  },
  header: {
    paddingHorizontal: designTokens.spacing.xl,
    paddingVertical: designTokens.spacing['2xl'],
    borderBottomLeftRadius: designTokens.borderRadius['2xl'],
    borderBottomRightRadius: designTokens.borderRadius['2xl'],
  },
  headerTitle: {
    fontSize: designTokens.typography.fontSize['3xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.white,
    marginBottom: designTokens.spacing.xs,
  },
  headerSubtitle: {
    fontSize: designTokens.typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  listContent: {
    padding: designTokens.spacing.xl,
    paddingBottom: designTokens.spacing['6xl'],
  },
  section: {
    marginBottom: designTokens.spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: designTokens.spacing.xl,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: designTokens.colors.neutral[200],
  },
  sectionTitle: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.neutral[700],
    marginHorizontal: designTokens.spacing.lg,
  },
  lessonCard: {
    marginBottom: designTokens.spacing.lg,
    borderRadius: designTokens.borderRadius.xl,
    overflow: 'hidden',
    ...designTokens.shadows.md,
  },
  disabledCard: {
    opacity: 0.6,
  },
  activeCard: {
    ...designTokens.shadows.lg,
    transform: [{ scale: 1.02 }],
  },
  cardGradient: {
    padding: designTokens.spacing.lg,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing.lg,
  },
  completedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  disabledIconContainer: {
    backgroundColor: designTokens.colors.neutral[200],
  },
  lessonIcon: {
    width: 32,
    height: 32,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.neutral[900],
    marginBottom: designTokens.spacing.xs,
  },
  completedText: {
    color: designTokens.colors.white,
  },
  disabledText: {
    color: designTokens.colors.neutral[500],
  },
  lessonDescription: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.neutral[600],
    marginBottom: designTokens.spacing.sm,
  },
  completedDescriptionText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: designTokens.colors.primary[500],
    borderRadius: 3,
  },
  completedProgress: {
    backgroundColor: designTokens.colors.white,
  },
  progressText: {
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.medium,
    color: designTokens.colors.neutral[600],
    minWidth: 35,
  },
  actionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: designTokens.colors.primary[500],
  },
  activePlayButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: designTokens.colors.white,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: designTokens.spacing.sm,
    paddingVertical: designTokens.spacing.xs,
    borderRadius: designTokens.borderRadius.lg,
  },
  scoreText: {
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.white,
  },
})