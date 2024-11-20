import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { MegaphoneOutlineUrl } from '@/shared/constants'

export const NoAmbassadors = () => {
  const { t } = useTranslation()
  return (
    <VStack w="full" justifyContent="center" flex={1} padding={6}>
      <Image src={MegaphoneOutlineUrl} height="auto" width="200px" />
      <Body size="md" medium muted>
        {t('No contributions have been made to this project.')}
      </Body>
    </VStack>
  )
}
