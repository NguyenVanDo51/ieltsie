import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Image } from 'expo-image'
import { Check } from 'lucide-react-native'
import { Card } from './Card'
import { Typography } from './Typography'
import { designTokens } from './tokens'

const { width } = Dimensions.get('window')

interface LanguageCardProps {
  name: string
  image: any
  selected?: boolean
  onPress: () => void
  variant?: 'default' | 'gradient'
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  name,
  image,
  selected = false,
  onPress,
  variant = 'default',
}) => {
  const cardStyle = variant === 'gradient' && selected 
    ? [styles.card, styles.selectedGradientCard]
    : styles.card

  return (
    <Card
      style={cardStyle}
      onPress={onPress}
      selected={selected && variant === 'default'}
      variant="elevated"
    >
      <View style={styles.content}>
        <View style={styles.flagContainer}>
          <Image 
            source={image} 
            style={styles.flag} 
            contentFit="cover" 
          />
        </View>
        
        <Typography
          variant="subtitle2"
          weight="semibold"
          align="center"
          color={selected && variant === 'gradient' ? designTokens.colors.white : designTokens.colors.neutral[800]}
          style={styles.name}
        >
          {name}
        </Typography>
        
        {selected && (
          <View style={[
            styles.checkContainer,
            variant === 'gradient' && styles.gradientCheck
          ]}>
            <Check size={20} color={designTokens.colors.white} strokeWidth={3} />
          </View>
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    width: (width - 56) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGradientCard: {
    backgroundColor: 'rgba(79, 172, 254, 0.95)',
    borderColor: designTokens.colors.white,
    shadowColor: '#4facfe',
    shadowOpacity: 0.3,
  },
  content: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  flagContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: designTokens.spacing.lg,
    ...designTokens.shadows.sm,
  },
  flag: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: designTokens.spacing.xs,
  },
  checkContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: designTokens.colors.primary[500],
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...designTokens.shadows.sm,
  },
  gradientCheck: {
    backgroundColor: '#00f2fe',
  },
})