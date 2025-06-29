import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Typography, Card, GradientBackground, Button } from '~/components/design-system'
import { designTokens } from '~/components/design-system'
import { useScores } from '~/store/useScore'
import { usetargetLanguage } from '~/store/useTargetLanguage'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { LANGUAGES } from '~/lib/constants'
import { User, Globe, Settings, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native'
import { Image } from 'expo-image'

export default function ProfileScreen() {
  const router = useRouter()
  const scores = useScores((t) => t.scores)
  const { targetLanguage, setTargetLanguage } = usetargetLanguage()
  const { nativeLanguage, set: setNativeLanguage } = useNativeLanguage()
  
  const totalLessonsCompleted = Object.keys(scores).length
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  const targetLang = LANGUAGES.find(lang => lang.code === targetLanguage)
  const nativeLang = LANGUAGES.find(lang => lang.code === nativeLanguage)

  const menuItems = [
    {
      id: 'target-language',
      title: 'Ngôn ngữ học',
      subtitle: targetLang?.name || 'Chưa chọn',
      icon: Globe,
      onPress: () => router.push('/select-language'),
      rightElement: targetLang && (
        <Image source={targetLang.image} style={styles.flagIcon} contentFit="cover" />
      ),
    },
    {
      id: 'native-language',
      title: 'Ngôn ngữ hiển thị',
      subtitle: nativeLang?.name || 'Chưa chọn',
      icon: Settings,
      onPress: () => router.push('/select-native-language'),
      rightElement: nativeLang && (
        <Image source={nativeLang.image} style={styles.flagIcon} contentFit="cover" />
      ),
    },
    {
      id: 'help',
      title: 'Trợ giúp',
      subtitle: 'Hướng dẫn và hỗ trợ',
      icon: HelpCircle,
      onPress: () => Alert.alert('Trợ giúp', 'Tính năng đang được phát triển'),
    },
  ]

  return (
    <GradientBackground variant="primaryReverse">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color={designTokens.colors.white} strokeWidth={2} />
            </View>
          </View>
          
          <Typography variant="h3" color={designTokens.colors.white} weight="bold">
            Hồ sơ cá nhân
          </Typography>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.9)">
            Quản lý thông tin và cài đặt
          </Typography>
        </View>

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Cards */}
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

          {/* Settings Menu */}
          <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
            Cài đặt
          </Typography>

          {menuItems.map((item) => {
            const IconComponent = item.icon
            
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <Card style={styles.menuCard} variant="elevated" pressable={false}>
                  <View style={styles.menuContent}>
                    <View style={styles.menuLeft}>
                      <View style={styles.menuIconContainer}>
                        <IconComponent 
                          size={24} 
                          color={designTokens.colors.primary[500]}
                          strokeWidth={2}
                        />
                      </View>
                      
                      <View style={styles.menuText}>
                        <Typography variant="subtitle1" weight="semibold">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color={designTokens.colors.neutral[600]}>
                          {item.subtitle}
                        </Typography>
                      </View>
                    </View>
                    
                    <View style={styles.menuRight}>
                      {item.rightElement}
                      <ChevronRight 
                        size={20} 
                        color={designTokens.colors.neutral[400]}
                        strokeWidth={2}
                      />
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            )
          })}

          {/* Reset Progress Button */}
          <View style={styles.dangerZone}>
            <Typography variant="h4" weight="bold" style={styles.sectionTitle}>
              Vùng nguy hiểm
            </Typography>
            
            <Button
              title="Đặt lại tiến trình"
              onPress={() => {
                Alert.alert(
                  'Đặt lại tiến trình',
                  'Bạn có chắc chắn muốn đặt lại toàn bộ tiến trình học tập? Hành động này không thể hoàn tác.',
                  [
                    { text: 'Hủy', style: 'cancel' },
                    { 
                      text: 'Đặt lại', 
                      style: 'destructive',
                      onPress: () => {
                        // Reset scores logic would go here
                        Alert.alert('Thành công', 'Tiến trình đã được đặt lại')
                      }
                    }
                  ]
                )
              }}
              variant="outline"
              style={styles.dangerButton}
              textStyle={{ color: designTokens.colors.error[500] }}
            />
          </View>
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
  avatarContainer: {
    marginBottom: designTokens.spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
    marginBottom: designTokens.spacing.lg,
  },
  menuItem: {
    marginBottom: designTokens.spacing.md,
  },
  menuCard: {
    paddingVertical: designTokens.spacing.lg,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: designTokens.colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: designTokens.spacing.lg,
  },
  menuText: {
    flex: 1,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: designTokens.spacing.sm,
  },
  flagIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dangerZone: {
    marginTop: designTokens.spacing['3xl'],
  },
  dangerButton: {
    borderColor: designTokens.colors.error[500],
  },
})