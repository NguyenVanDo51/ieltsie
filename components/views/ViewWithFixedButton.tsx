import React from 'react'
import { View, ViewStyle, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { cn } from '~/lib/utils'

type ViewWithFixedButtonProps = {
  children?: React.ReactNode
  className?: string
  onButtonPress: () => void
}

const ViewWithFixedButton: React.FC<ViewWithFixedButtonProps> = ({ children, className, onButtonPress }) => {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 relative" style={{ paddingTop: insets.top }}>
      <ScrollView className={cn("flex-1", className)}>{children}</ScrollView>

      <View
        className="fixed left-0 right-0 bottom-0 z-10 py-4 px-4 web:mb-4"
        style={{ paddingBottom: insets.bottom / 2 }}
      >
        <Button onPress={onButtonPress}>
          <Text>Tiếp tục</Text>
        </Button>
      </View>
    </View>
  )
}
export default ViewWithFixedButton
