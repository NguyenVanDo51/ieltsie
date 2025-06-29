import { useRouter } from 'expo-router'
import { useState } from 'react'
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
import { usetargetLanguage } from '~/store/useTargetLanguage'

const Screen = () => {
  const { setTargetLanguage } = usetargetLanguage((t) => t)
  const [value, setValue] = useState<string>(LANGUAGES[0].code)
  const router = useRouter()

  const handleContinue = () => {
    setTargetLanguage(value)
    router.push('/select-native-language')
  }

  return (
    <GradientBackground variant="primary">
      <Layout safeArea scrollable>
        <Header
          title="Chọn ngôn ngữ muốn học"
          subtitle="Hãy chọn ngôn ngữ bạn muốn học để bắt đầu hành trình của mình"
          variant="transparent"
        />

        <Grid style={styles.grid}>
          {LANGUAGES.map((language) => (
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
            title="Tiếp tục"
            onPress={handleContinue}
            gradient
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