import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'

export const Promotion = () => {
  const textSize = { base: '16px', sm: '18px', md: '22x', lg: '38px', xl: '36px', '3xl': '42px' }
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
        {t('21% of sales goes to fund our Grants!')}
      </Body>
      <Body fontSize={textSize} bold color="guardians.text">
        {t('Shipping included')}
      </Body>
    </VStack>
  )
}
