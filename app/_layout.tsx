import '~/global.css'

import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'
import { NAV_THEME } from '~/lib/constants'
import { useColorScheme } from '~/lib/useColorScheme'
import { PortalHost } from '@rn-primitives/portal'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated'
import { PopoverProvider } from '~/components/ui/popover'
import { usetargetLanguage, usetargetLanguageState } from '~/store/useTargetLanguage'
import { Indicator } from '@rn-primitives/progress'
import { useNativeLanguage } from '~/store/useNativeLanguage'
import { useScores } from '~/store/useScore'

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
}

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
  const hasMounted = React.useRef(false)
  const { isDarkColorScheme } = useColorScheme()
  const [isLoading, setIsLoading] = React.useState(false)
  const fetch = usetargetLanguage((t) => t.fetch)
  const fetchNativeLang = useNativeLanguage((t) => t.fetch)
  const fetchScores = useScores((t) => t.fetchScores)

  useIsomorphicLayoutEffect(() => {
    setIsLoading(true)
    if (hasMounted.current) {
      return
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background')
    }
    fetch()
    fetchNativeLang()
    fetchScores()
    
    setTimeout(() => {
      setIsLoading(false)
      hasMounted.current = true
    }, 1000)
  }, [])

  const insets = useSafeAreaInsets()

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <PopoverProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />

        <View style={{ flex: 1, marginTop: insets.top }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        <PortalHost />
      </ThemeProvider>
    </PopoverProvider>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect
