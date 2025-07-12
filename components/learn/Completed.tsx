import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { Text } from '../ui/text'
import { Button } from '../ui/button'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from 'expo-image'

const SuccessImage = require('~/assets/lesson/success.png')

export const Completed = () => {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaProvider>
      <View
        className="flex-1 flex-col py-4 px-4 items-center justify-between"
        style={{ paddingBottom: insets.bottom }}
      >
        <View />
        
        <View className="flex flex-col items-center justify-center gap-6">
          <Image source={SuccessImage} style={{ width: 256, height: 256 }} contentFit="cover" />
          {/* <Text className="text-2xl font-bold mb-4 text-primary">Lesson Completed!</Text> */}
        </View>

        <Button onPress={() => router.back()} className="w-full web:mb-4">
          <Text>Tiếp tục</Text>
        </Button>
      </View>
    </SafeAreaProvider>
  )
}
