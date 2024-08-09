import { HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useMobileMode } from '@/utils'

import { useSummaryBannerStats } from '../hooks'

export const SummaryBanner = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { projectsCount, bitcoinsRaised, contributorsCount, loading } = useSummaryBannerStats()

  const Direction = isMobile ? VStack : HStack

  return (
    <Direction width="full" justifyContent="space-around" bg="gray.100" p={4} borderRadius="md" spacing={4}>
      <BannerItem label={t('Projects')} value={loading ? <Skeleton height="20px" width="60px" /> : projectsCount} />
      <BannerItem
        label={t('Bitcoins raised')}
        value={loading ? <Skeleton height="20px" width="60px" /> : bitcoinsRaised}
      />
      <BannerItem
        label={t('Contributors')}
        value={loading ? <Skeleton height="20px" width="60px" /> : contributorsCount}
      />
    </Direction>
  )
}

const BannerItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <VStack>
    <Text fontWeight="bold">{label}</Text>
    <Text>{value}</Text>
  </VStack>
)
