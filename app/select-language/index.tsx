import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import ViewWithFixedButton from '~/components/views/ViewWithFixedButton'
import { LANGUAGES } from '~/lib/constants'
import { cn } from '~/lib/utils'
import { usetargetLanguage } from '~/store/useTargetLanguage'

const Screen = () => {
  const { setTargetLanguage } = usetargetLanguage((t) => t)
  const [value, setValue] = useState<string>(LANGUAGES[0].code)
  const router = useRouter()

  return (
    <ViewWithFixedButton
      onButtonPress={() => {
        setTargetLanguage(value)
        router.push('/select-native-language')
      }}
    >
      <View className="flex-1 p-4 flex-col gap-2">
        <Text className='text-2xl font-bold mb-2'>Chọn ngôn ngữ muốn học</Text>

        {LANGUAGES.map((language) => (
          <Button
            variant="outline"
            className={cn(
              'w-full flex-row gap-4 px-4 justify-start',
              language.code === value ? 'border-primary' : ''
            )}
            key={language.code}
            onPress={() => {
              setValue(language.code)
            }}
          >
            <Image source={language.image} style={{ width: 40, height: 40 }} contentFit="cover" />
            <Text>{language.name}</Text>
          </Button>
        ))}
      </View>
    </ViewWithFixedButton>
  )
}

export default Screen
