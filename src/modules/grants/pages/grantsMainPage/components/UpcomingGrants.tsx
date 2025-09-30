import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { Grant } from '@/types'

import { LargeGrantCard } from './LargeGrantCard'

export const UpcomingGrants = ({ upcomingGrants }: { upcomingGrants: Grant[] }) => {
  const { t } = useTranslation()

  if (upcomingGrants.length < 1) {
    return null
  }

  return (
    <VStack w="100%" alignItems="flex-start">
      <Body size={'2xl'} bold>
        {t('Live Grants')}
      </Body>
      {upcomingGrants.map((grant) => (
        <LargeGrantCard key={grant.id} grant={grant} showBanner />
      ))}
    </VStack>
  )
}
