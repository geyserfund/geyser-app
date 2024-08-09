import { Box, Button, HStack, Select, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'
import { LeaderboardPeriod } from '@/types'
import { useMobileMode } from '@/utils'

import { SummaryBanner, TopContributors, TopProjects } from '../components'

export const Leaderboard = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.AllTime)

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(event.target.value as LeaderboardPeriod)
  }

  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      position="relative"
      bg="utils.pbg"
    >
      <VStack
        width="100%"
        height="100%"
        paddingTop={{
          base: `${dimensions.projectNavBar.mobile.height}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
        paddingX={standardPadding}
        alignItems="center"
      >
        <Box w="100%" height="100%" maxWidth={dimensions.maxWidth}>
          <VStack spacing={6} width="full">
            <HStack width="full" justifyContent="flex-end">
              <Select value={period} onChange={handlePeriodChange} width="200px">
                <option value={LeaderboardPeriod.Month}>{t('Past month')}</option>
                <option value={LeaderboardPeriod.AllTime}>{t('All time')}</option>
              </Select>
            </HStack>
            <SummaryBanner />
            {isMobile ? (
              <MobileLeaderboard period={period} />
            ) : (
              <HStack width="full" alignItems="flex-start" spacing={6}>
                <TopProjects period={period} />
                <TopContributors period={period} />
              </HStack>
            )}
          </VStack>{' '}
        </Box>
      </VStack>
    </Box>
  )
}

const MobileLeaderboard = ({ period }: { period: LeaderboardPeriod }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'contributors'>('projects')
  const { t } = useTranslation()

  return (
    <VStack width="full" spacing={4}>
      <HStack width="full" justifyContent="center">
        <Button onClick={() => setActiveTab('projects')} variant={activeTab === 'projects' ? 'solid' : 'outline'}>
          {t('Projects')}
        </Button>
        <Button
          onClick={() => setActiveTab('contributors')}
          variant={activeTab === 'contributors' ? 'solid' : 'outline'}
        >
          {t('Contributors')}
        </Button>
      </HStack>
      {activeTab === 'projects' ? <TopProjects period={period} /> : <TopContributors period={period} />}
    </VStack>
  )
}
