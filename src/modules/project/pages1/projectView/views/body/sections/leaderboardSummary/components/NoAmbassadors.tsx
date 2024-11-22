import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { MegaphoneUrl } from '@/shared/constants'

export const NoAmbassadors = () => {
  const { t } = useTranslation()
  return (
    <VStack w="full" justifyContent="center" flex={1} padding={6}>
      <Image src={MegaphoneUrl} height="auto" width="300px" py={4} />
      <Body size="md" medium muted>
        {t('No contributions have been enabled through sharing yet.')}
      </Body>
    </VStack>
  )
}
