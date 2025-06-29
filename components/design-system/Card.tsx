import React from 'react'
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'
import { designTokens } from './tokens'

interface CardProps {
  children: React.ReactNode
  onPress?: () => void
  selected?: boolean
  variant?: 'default' | 'elevated' | 'outlined'
  style?: ViewStyle
  pressable?: boolean
  activeOpacity?: number
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  selected = false,
  variant = 'default',
  style,
  pressable = true,
  activeOpacity = 0.8,
}) => {
  const cardStyles = [
    styles.base,
    styles[variant],
    selected && styles.selected,
    style,
  ]

  if (onPress && pressable) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={activeOpacity}
      >
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <View style={cardStyles}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing.xl,
    backgroundColor: designTokens.colors.white,
  },
  default: {
    ...designTokens.shadows.sm,
  },
  elevated: {
    ...designTokens.shadows.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: designTokens.colors.neutral[200],
  },
  selected: {
    borderWidth: 2,
    borderColor: designTokens.colors.primary[500],
    backgroundColor: designTokens.colors.primary[50],
    ...designTokens.shadows.md,
    transform: [{ scale: 1.02 }],
  },
})