import React from 'react'
import { View, ViewStyle, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text } from '../ui/text'
import { Button } from '../ui/button'

type ViewWithFixedButtonProps = {
  children: React.ReactNode
  onButtonPress: () => void
}

const ViewWithFixedButton: React.FC<ViewWithFixedButtonProps> = ({ children, onButtonPress }) => {
  const insets = useSafeAreaInsets()

  return (
    <View className="flex-1 relative" style={{ paddingTop: insets.top }}>
      <ScrollView className="flex-1">{children}</ScrollView>

      <View
        className="fixed left-0 right-0 bottom-0 z-10 py-4 px-4"
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
