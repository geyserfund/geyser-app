import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

export const Promotion = () => {
  const textSize = { base: '16px', md: '28x', lg: '20px', xl: '34px', '3xl': '26px' }
  return (
    <VStack
      w="full"
      spacing={0}
      background="guardians.textBackground"
      borderTop="5px solid"
      borderColor="guardians.text"
      padding={{ base: '12px', lg: '20px', '2xl': '24px' }}
    >
      <Body fontSize={textSize} bold color="guardians.text">
        {t('21% of all sales go directly to fund our Bitcoin grants.')}
      </Body>
      <Body fontSize={textSize} bold color="guardians.text">
        {t('All prices include shipping.')}
      </Body>
    </VStack>
  )
}
