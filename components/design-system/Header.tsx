import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { Typography } from './Typography'
import { designTokens } from './tokens'

interface HeaderProps {
  title?: string
  subtitle?: string
  showBack?: boolean
  onBack?: () => void
  rightElement?: React.ReactNode
  variant?: 'default' | 'transparent'
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightElement,
  variant = 'default',
}) => {
  return (
    <View style={styles.container}>
      {(showBack || rightElement) && (
        <View style={styles.navigation}>
          {showBack ? (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <ArrowLeft 
                size={24} 
                color={variant === 'transparent' ? designTokens.colors.white : designTokens.colors.neutral[800]} 
                strokeWidth={2} 
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
          
          {rightElement || <View style={styles.placeholder} />}
        </View>
      )}

      {(title || subtitle) && (
        <View style={styles.content}>
          {title && (
            <Typography
              variant="h3"
              weight="bold"
              align="center"
              color={variant === 'transparent' ? designTokens.colors.white : designTokens.colors.neutral[900]}
              style={styles.title}
            >
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography
              variant="body1"
              align="center"
              color={variant === 'transparent' ? 'rgba(255, 255, 255, 0.9)' : designTokens.colors.neutral[600]}
              style={styles.subtitle}
            >
              {subtitle}
            </Typography>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: designTokens.spacing.xl,
    paddingTop: designTokens.spacing.md,
    paddingBottom: designTokens.spacing['3xl'],
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: designTokens.spacing.xl,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 44,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginBottom: designTokens.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    paddingHorizontal: designTokens.spacing.xl,
    lineHeight: 24,
  },
})