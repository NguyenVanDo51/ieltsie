import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import { designTokens } from './tokens'

interface TypographyProps {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2'
  color?: string
  align?: 'left' | 'center' | 'right'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  style?: TextStyle
  numberOfLines?: number
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color,
  align = 'left',
  weight,
  style,
  numberOfLines,
}) => {
  const textStyles = [
    styles.base,
    styles[variant],
    weight && styles[`weight${weight.charAt(0).toUpperCase() + weight.slice(1)}` as keyof typeof styles],
    { textAlign: align },
    color && { color },
    style,
  ]

  return (
    <Text style={textStyles} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    color: designTokens.colors.neutral[900],
  },
  
  // Variants
  h1: {
    fontSize: designTokens.typography.fontSize['6xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    lineHeight: designTokens.typography.fontSize['6xl'] * designTokens.typography.lineHeight.tight,
  },
  h2: {
    fontSize: designTokens.typography.fontSize['4xl'],
    fontWeight: designTokens.typography.fontWeight.bold,
    lineHeight: designTokens.typography.fontSize['4xl'] * designTokens.typography.lineHeight.tight,
  },
  h3: {
    fontSize: designTokens.typography.fontSize['3xl'],
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.fontSize['3xl'] * designTokens.typography.lineHeight.tight,
  },
  h4: {
    fontSize: designTokens.typography.fontSize['2xl'],
    fontWeight: designTokens.typography.fontWeight.semibold,
    lineHeight: designTokens.typography.fontSize['2xl'] * designTokens.typography.lineHeight.normal,
  },
  subtitle1: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.medium,
    lineHeight: designTokens.typography.fontSize.lg * designTokens.typography.lineHeight.normal,
  },
  subtitle2: {
    fontSize: designTokens.typography.fontSize.base,
    fontWeight: designTokens.typography.fontWeight.medium,
    lineHeight: designTokens.typography.fontSize.base * designTokens.typography.lineHeight.normal,
  },
  body1: {
    fontSize: designTokens.typography.fontSize.base,
    fontWeight: designTokens.typography.fontWeight.normal,
    lineHeight: designTokens.typography.fontSize.base * designTokens.typography.lineHeight.normal,
  },
  body2: {
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.normal,
    lineHeight: designTokens.typography.fontSize.sm * designTokens.typography.lineHeight.normal,
  },
  caption: {
    fontSize: designTokens.typography.fontSize.xs,
    fontWeight: designTokens.typography.fontWeight.normal,
    lineHeight: designTokens.typography.fontSize.xs * designTokens.typography.lineHeight.normal,
  },

  // Weights
  weightNormal: {
    fontWeight: designTokens.typography.fontWeight.normal,
  },
  weightMedium: {
    fontWeight: designTokens.typography.fontWeight.medium,
  },
  weightSemibold: {
    fontWeight: designTokens.typography.fontWeight.semibold,
  },
  weightBold: {
    fontWeight: designTokens.typography.fontWeight.bold,
  },
  weightExtrabold: {
    fontWeight: designTokens.typography.fontWeight.extrabold,
  },
})