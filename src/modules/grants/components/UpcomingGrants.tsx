import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { Grant } from '@/types'

import { LargeGrantCard } from './LargeGrantCard'

const UpcomingGrants = ({ upcomingGrants }: { upcomingGrants: Grant[] }) => {
  const { t } = useTranslation()

  if (upcomingGrants.length === 0) {
    return null
  }

  return (
    <VStack mt={10} w="100%" alignItems="flex-start">
      <Body fontSize={'24px'} bold>
        {t('Upcoming Grants')}
      </Body>
      {upcomingGrants.map((grant) => (
        <LargeGrantCard key={grant.id} grant={grant} showBanner />
      ))}
    </VStack>
  )
}

export default UpcomingGrants
