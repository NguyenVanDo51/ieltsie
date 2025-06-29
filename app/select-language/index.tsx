import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Check } from 'lucide-react-native'
import { LANGUAGES } from '~/lib/constants'
import { usetargetLanguage } from '~/store/useTargetLanguage'

const { width } = Dimensions.get('window')

const Screen = () => {
  const { setTargetLanguage } = usetargetLanguage((t) => t)
  const [value, setValue] = useState<string>(LANGUAGES[0].code)
  const router = useRouter()

  const handleContinue = () => {
    setTargetLanguage(value)
    router.push('/select-native-language')
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Chọn ngôn ngữ muốn học</Text>
            <Text style={styles.subtitle}>Hãy chọn ngôn ngữ bạn muốn học để bắt đầu hành trình của mình</Text>
          </View>

          <View style={styles.languageGrid}>
            {LANGUAGES.map((language) => (
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
              colors={['#4facfe', '#00f2fe']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Tiếp tục</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
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
    backgroundColor: 'rgba(79, 172, 254, 0.95)',
    borderColor: '#fff',
    transform: [{ scale: 1.02 }],
    shadowColor: '#4facfe',
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
    backgroundColor: '#00f2fe',
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
    shadowColor: '#4facfe',
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