import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { designTokens } from './tokens'

interface GradientBackgroundProps {
  children: React.ReactNode
  colors?: string[]
  style?: ViewStyle
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  variant?: 'primary' | 'primaryReverse' | 'accent' | 'accentReverse' | 'success' | 'warning' | 'sunset' | 'ocean'
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors,
  style,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  variant = 'primary',
}) => {
  const gradientColors = colors || designTokens.gradients[variant]

  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.container, style]}
      start={start}
      end={end}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})