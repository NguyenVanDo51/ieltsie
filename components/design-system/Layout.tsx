import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { designTokens } from './tokens'

interface LayoutProps {
  children: React.ReactNode
  scrollable?: boolean
  safeArea?: boolean
  padding?: boolean
  style?: any
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  scrollable = false,
  safeArea = true,
  padding = true,
  style,
}) => {
  const Container = safeArea ? SafeAreaView : View
  const Content = scrollable ? ScrollView : View

  const contentProps = scrollable ? {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: padding ? styles.padding : undefined,
  } : {
    style: [styles.flex, padding && styles.padding],
  }

  return (
    <Container style={[styles.container, style]}>
      <Content {...contentProps}>
        {children}
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: designTokens.spacing.xl,
  },
})