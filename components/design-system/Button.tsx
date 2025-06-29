import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { designTokens } from './tokens'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  gradient?: boolean
  gradientColors?: string[]
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
  gradient = false,
  gradientColors,
  icon,
  iconPosition = 'left',
}) => {
  const buttonStyles = [
    styles.base,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style,
  ]

  const textStyles = [
    styles.text,
    styles[`text${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof styles],
    styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}` as keyof typeof styles],
    disabled && styles.textDisabled,
    textStyle,
  ]

  const content = (
    <>
      {icon && iconPosition === 'left' && icon}
      <Text style={textStyles}>{title}</Text>
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (gradient && !disabled) {
    const colors = gradientColors || designTokens.gradients.accent
    return (
      <TouchableOpacity
        style={[styles.gradientContainer, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colors}
          style={[styles.base, styles[size], { backgroundColor: 'transparent' }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {content}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: designTokens.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: designTokens.spacing.sm,
  },
  gradientContainer: {
    borderRadius: designTokens.borderRadius.lg,
    overflow: 'hidden',
    ...designTokens.shadows.lg,
  },
  
  // Sizes
  sm: {
    paddingVertical: designTokens.spacing.sm,
    paddingHorizontal: designTokens.spacing.lg,
    minHeight: 36,
  },
  md: {
    paddingVertical: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.xl,
    minHeight: 44,
  },
  lg: {
    paddingVertical: designTokens.spacing.lg,
    paddingHorizontal: designTokens.spacing['2xl'],
    minHeight: 52,
  },

  // Variants
  primary: {
    backgroundColor: designTokens.colors.primary[500],
    ...designTokens.shadows.md,
  },
  secondary: {
    backgroundColor: designTokens.colors.secondary[500],
    ...designTokens.shadows.md,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: designTokens.colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: designTokens.colors.neutral[300],
    opacity: 0.6,
  },

  // Text styles
  text: {
    fontWeight: designTokens.typography.fontWeight.semibold,
    textAlign: 'center',
  },
  textSm: {
    fontSize: designTokens.typography.fontSize.sm,
  },
  textMd: {
    fontSize: designTokens.typography.fontSize.base,
  },
  textLg: {
    fontSize: designTokens.typography.fontSize.lg,
  },
  textPrimary: {
    color: designTokens.colors.white,
  },
  textSecondary: {
    color: designTokens.colors.white,
  },
  textOutline: {
    color: designTokens.colors.primary[500],
  },
  textGhost: {
    color: designTokens.colors.primary[500],
  },
  textDisabled: {
    color: designTokens.colors.neutral[500],
  },
})