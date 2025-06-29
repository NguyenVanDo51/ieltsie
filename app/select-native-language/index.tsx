import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Check, ArrowLeft } from 'lucide-react-native'
import { LANGUAGES } from '~/lib/constants'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { usetargetLanguage } from '~/store/useTargetLanguage'

const { width } = Dimensions.get('window')

const Screen = () => {
  const { targetLanguage } = usetargetLanguage((t) => t)
  const { set } = useNativeLanguage((t) => t)
  const languages = useMemo(() => {
    return LANGUAGES.filter((language) => language.code !== targetLanguage)
  }, [targetLanguage])
  const [value, setValue] = useState<string>(languages[0]?.code || 'vi')
  const router = useRouter()

  const handleContinue = () => {
    set(value)
    router.push('/')
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#764ba2', '#667eea']}
        style={styles.gradient}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#fff" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bước 2/2</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Ngôn ngữ hiển thị</Text>
            <Text style={styles.subtitle}>Chọn ngôn ngữ để hiển thị giao diện và hướng dẫn</Text>
          </View>

          <View style={styles.languageGrid}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageCard,
                  language.code === value && styles.selectedCard
                ]}
                onPress={() => setValue(language.code)}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <View style={styles.flagContainer}>
                    <Image 
                      source={language.image} 
                      style={styles.flag} 
                      contentFit="cover" 
                    />
                  </View>
                  <Text style={[
                    styles.languageName,
                    language.code === value && styles.selectedLanguageName
                  ]}>
                    {language.name}
                  </Text>
                  {language.code === value && (
                    <View style={styles.checkContainer}>
                      <Check size={20} color="#fff" strokeWidth={3} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#00f2fe', '#4facfe']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Bắt đầu học</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  languageCard: {
    width: (width - 56) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    transform: [{ scale: 1 }],
  },
  selectedCard: {
    backgroundColor: 'rgba(0, 242, 254, 0.95)',
    borderColor: '#fff',
    transform: [{ scale: 1.02 }],
    shadowColor: '#00f2fe',
    shadowOpacity: 0.3,
  },
  cardContent: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  flagContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  selectedLanguageName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#4facfe',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  continueButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00f2fe',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
})

export default Screen