import { useColorScheme as useNativewindColorScheme } from 'nativewind'

export function useColorScheme() {
  const { setColorScheme, toggleColorScheme } = useNativewindColorScheme()
  const colorScheme: string = 'light'
  // const colorScheme: string = 'dark'

  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  }
}
