import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { Grant } from '@/types'

import { SmallGrantCard } from './SmallGrantCard'

export const ClosedGrants = ({ closedGrants }: { closedGrants: Grant[] }) => {
  const { t } = useTranslation()

  if (closedGrants.length === 0) {
    return null
  }

  return (
    <VStack mt={10} w="100%" alignItems="flex-start">
      <Body size="2xl" bold>
        {t('Past Grants')}
      </Body>
      {closedGrants.map((grant) => (
        <SmallGrantCard key={grant.id} grant={grant} showBanner />
      ))}
    </VStack>
  )
}
