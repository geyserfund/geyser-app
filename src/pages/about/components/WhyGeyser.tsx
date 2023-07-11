import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H1, H3 } from '../../../components/typography'

export const WhyGeyser = () => {
  const { t } = useTranslation()
  return (
    <VStack w={'full'} maxWidth={'1068px'} spacing={50} padding={3}>
      <VStack>
        <H1>{t('Why Geyser?')}</H1>
        <H3 color={'neutral.600'}>
          {t(
            "Our name 'Geyser' was inspired by naturally occurring geysers, which are astounding spectacles. Given enough pressure water can be ejected with force up into the sky defying gravity. In a similar way, given enough community support, important project ideas can take off and bring about change in the world.",
          )}
        </H3>
      </VStack>
    </VStack>
  )
}
