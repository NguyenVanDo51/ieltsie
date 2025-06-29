import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { 
  GradientBackground, 
  Header, 
  LanguageCard, 
  Grid, 
  Button, 
  Layout,
  Typography 
} from '~/components/design-system'
import { LANGUAGES } from '~/lib/constants'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { usetargetLanguage } from '~/store/useTargetLanguage'

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
    <GradientBackground variant="primaryReverse">
      <Layout safeArea scrollable>
        <Header
          title="Ngôn ngữ hiển thị"
          subtitle="Chọn ngôn ngữ để hiển thị giao diện và hướng dẫn"
          showBack
          onBack={handleBack}
          rightElement={
            <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.9)">
              Bước 2/2
            </Typography>
          }
          variant="transparent"
        />

        <Grid style={styles.grid}>
          {languages.map((language) => (
            <LanguageCard
              key={language.code}
              name={language.name}
              image={language.image}
              selected={language.code === value}
              onPress={() => setValue(language.code)}
              variant="gradient"
            />
          ))}
        </Grid>

        <View style={styles.footer}>
          <Button
            title="Bắt đầu học"
            onPress={handleContinue}
            gradient
            gradientColors={['#00f2fe', '#4facfe']}
            size="lg"
            style={styles.button}
          />
        </View>
      </Layout>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  grid: {
    marginBottom: 40,
  },
  footer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  button: {
    width: '100%',
  },
})

export default Screen