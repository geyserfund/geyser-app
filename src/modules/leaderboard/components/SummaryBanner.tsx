import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import { getBitcoinAmount, getShortAmountLabel, useMobileMode } from '@/utils'

import { useSummaryBannerStats } from '../hooks'

export const SummaryBanner = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const { projectsCount, bitcoinsRaised, contributorsCount, loading } = useSummaryBannerStats()

  const Direction = isMobile ? HStack : VStack
  const Column = isMobile ? VStack : HStack

  return (
    <Direction
      width="full"
      border="1px solid"
      justifyContent="center"
      borderColor="primaryAlpha.6"
      bgGradient="linear(to-r, #B2FAEC, #F1FAFD)"
      p={4}
      borderRadius="md"
      height="130px"
      maxHeight="130px"
    >
      <Box>
        <Body fontSize={isMobile ? '16px' : '20px'} color="primary1.12">
          {t('The leaders making world-changing ideas possible')}
        </Body>
      </Box>
      <Column w={isMobile ? '100%' : 'auto'} spacing={isMobile ? 2 : 6} alignItems={isMobile ? 'flex-end' : 'center'}>
        <BannerItem
          label={t('Projects')}
          value={loading ? <Skeleton height="20px" width="60px" /> : getShortAmountLabel(projectsCount)}
        />
        <BannerItem
          label={t('Bitcoin raised')}
          value={loading ? <Skeleton height="20px" width="60px" /> : getBitcoinAmount(bitcoinsRaised, true)}
        />
        <BannerItem
          label={t('Contributors')}
          value={loading ? <Skeleton height="20px" width="60px" /> : getShortAmountLabel(contributorsCount)}
        />
      </Column>
    </Direction>
  )
}

const BannerItem = ({ label, value }: { label: string; value: React.ReactNode }) => {
  const isMobile = useMobileMode()

  return (
    <HStack>
      <Body fontSize={isMobile ? '16px' : '24px'} color="neutral1.12" bold>
        {value}
      </Body>
      <Body fontSize={isMobile ? '16px' : '24px'} color="neutral1.12" bold>
        {label}
      </Body>
    </HStack>
  )
}
