import { Image, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { NoLeaderboardDataImageUrl } from '@/constants'
import { Body } from '@/shared/components/typography'

export const NoContribution = () => {
  const { t } = useTranslation()
  return (
    <VStack w="full" justifyContent="center" flex={1} padding={6}>
      <Image src={NoLeaderboardDataImageUrl} height="222px" width="150px" />
      <Body size="md" medium muted>
        {t('No contributions have been made to this project so far.')}
      </Body>
    </VStack>
  )
}