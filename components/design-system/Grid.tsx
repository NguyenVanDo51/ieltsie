import React from 'react'
import { View, StyleSheet } from 'react-native'
import { designTokens } from './tokens'

interface GridProps {
  children: React.ReactNode
  columns?: number
  gap?: number
  style?: any
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 2,
  gap = designTokens.spacing.lg,
  style,
}) => {
  return (
    <View style={[styles.container, { gap }, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})