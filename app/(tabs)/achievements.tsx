import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Typography, Card, GradientBackground } from '~/components/design-system'
import { designTokens } from '~/components/design-system'
import { useScores } from '~/store/useScore'
import { Trophy, Target, Flame, Star } from 'lucide-react-native'

export default function AchievementsScreen() {
  const scores = useScores((t) => t.scores)
  
  const totalLessonsCompleted = Object.keys(scores).length
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  const achievements = [
    {
      id: 'first_lesson',
      title: 'Bài học đầu tiên',
      description: 'Hoàn thành bài học đầu tiên',
      icon: Star,
      unlocked: totalLessonsCompleted >= 1,
      progress: Math.min(totalLessonsCompleted, 1),
      target: 1,
    },
    {
      id: 'five_lessons',
      title: 'Người học tập',
      description: 'Hoàn thành 5 bài học',
      icon: Target,
      unlocked: totalLessonsCompleted >= 5,
      progress: Math.min(totalLessonsCompleted, 5),
      target: 5,
    },
    {
      id: 'ten_lessons',
      title: 'Chuyên gia',
      description: 'Hoàn thành 10 bài học',
      icon: Trophy,
      unlocked: totalLessonsCompleted >= 10,
      progress: Math.min(totalLessonsCompleted, 10),
      target: 10,
    },
    {
      id: 'high_score',
      title: 'Điểm cao',
      description: 'Đạt tổng điểm 100',
      icon: Flame,
      unlocked: totalScore >= 100,
      progress: Math.min(totalScore, 100),
      target: 100,
    },
  ]

  return (
    <GradientBackground variant="accent">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Typography variant="h2" color={designTokens.colors.white} weight="bold">
            Thành tích
          </Typography>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.9)">
            Theo dõi tiến trình học tập của bạn
          </Typography>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.statsContainer}>
            <Card style={styles.statCard} variant="elevated">
              <Typography variant="h3" weight="bold" color={designTokens.colors.primary[500]}>
                {totalLessonsCompleted}
              </Typography>
              <Typography variant="body2" color={designTokens.colors.neutral[600]}>
                Bài học hoàn thành
              </Typography>
            </Card>
            
            <Card style={styles.statCard} variant="elevated">
              <Typography variant="h3" weight="bold" color={designTokens.colors.secondary[500]}>
                {totalScore}
              </Typography>
              <Typography variant="body2" color={designTokens.colors.neutral[600]}>
                Tổng điểm
              </Typography>
            </Card>
          </View>

          <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
            Huy hiệu
          </Typography>

          {achievements.map((achievement) => {
            const IconComponent = achievement.icon
            const progressPercentage = (achievement.progress / achievement.target) * 100

            return (
              <Card
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  achievement.unlocked && styles.unlockedCard
                ]}
                variant="elevated"
                pressable={false}
              >
                <View style={styles.achievementContent}>
                  <View style={[
                    styles.iconContainer,
                    achievement.unlocked && styles.unlockedIcon
                  ]}>
                    <IconComponent 
                      size={32} 
                      color={achievement.unlocked ? designTokens.colors.warning[500] : designTokens.colors.neutral[400]}
                      strokeWidth={2}
                    />
                  </View>
                  
                  <View style={styles.achievementInfo}>
                    <Typography 
                      variant="subtitle1" 
                      weight="bold"
                      color={achievement.unlocked ? designTokens.colors.neutral[900] : designTokens.colors.neutral[500]}
                    >
                      {achievement.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={achievement.unlocked ? designTokens.colors.neutral[600] : designTokens.colors.neutral[400]}
                    >
                      {achievement.description}
                    </Typography>
                    
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${progressPercentage}%` },
                            achievement.unlocked && styles.completedProgress
                          ]} 
                        />
                      </View>
                      <Typography variant="caption" color={designTokens.colors.neutral[500]}>
                        {achievement.progress}/{achievement.target}
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
  statsContainer: {
    flexDirection: 'row',
    gap: designTokens.spacing.lg,
    marginBottom: designTokens.spacing['2xl'],
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: designTokens.spacing['2xl'],
  },
  sectionTitle: {
    marginBottom: designTokens.spacing.xl,
  },
  achievementCard: {
    marginBottom: designTokens.spacing.lg,
    opacity: 0.6,
  },
  unlockedCard: {
    opacity: 1,
    borderWidth: 2,
    borderColor: designTokens.colors.warning[200],
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: designTokens.colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing.lg,
  },
  unlockedIcon: {
    backgroundColor: designTokens.colors.warning[100],
  },
  achievementInfo: {
    flex: 1,
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
  completedProgress: {
    backgroundColor: designTokens.colors.warning[500],
  },
})