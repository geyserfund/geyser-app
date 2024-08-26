import { HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Banner } from '@/shared/components/display/Banner'
import { StickToTop } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { LeaderboardPeriod } from '@/types'
import { getBitcoinAmount, getShortAmountLabel, useMobileMode } from '@/utils'

import { TopContributors, TopProjects } from './components'
import { useSummaryBannerStats } from './hooks'

interface PeriodOption {
  value: LeaderboardPeriod
  label: string
}
export const Leaderboard = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.AllTime)

  const { projectsCount, bitcoinsRaised, contributorsCount, loading } = useSummaryBannerStats()

  const bannerItems = [
    { label: 'Projects', value: getShortAmountLabel(projectsCount) },
    { label: 'Bitcoin raised', value: getBitcoinAmount(bitcoinsRaised, true) },
    { label: 'Contributors', value: getShortAmountLabel(contributorsCount) },
  ]

  const periodOptions: PeriodOption[] = [
    { value: LeaderboardPeriod.Month, label: t('Past month') },
    { value: LeaderboardPeriod.AllTime, label: t('All time') },
  ]

  const handlePeriodChange = (selectedOption: PeriodOption | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <VStack spacing={4} width="full">
      <Banner
        title={t('The projects and contributors making world-changing ideas a reality')}
        items={bannerItems}
        loading={loading}
      />
      <HStack width="100%" justifyContent="space-between">
        {!isMobile && (
          <Body fontSize="24px" bold>
            {t('Top Projects and Contributors')}
          </Body>
        )}
        <CustomSelect
          isSearchable={false}
          options={periodOptions}
          value={periodOptions.find((option) => option.value === period)}
          onChange={handlePeriodChange}
          placeholder={t('Select period...')}
          dropdownIndicator={<PiCalendarDots />}
        />
      </HStack>

      {isMobile ? (
        <MobileLeaderboard period={period} />
      ) : (
        <HStack width="full" alignItems="flex-start" spacing={6}>
          <TopProjects period={period} />
          <TopContributors period={period} />
        </HStack>
      )}
    </VStack>
  )
}

const MobileLeaderboard = ({ period }: { period: LeaderboardPeriod }) => {
  const { t } = useTranslation()

  const items: AnimatedNavBarItem[] = [
    {
      name: t('Projects'),
      key: 'projects',
      render: () => <TopProjects period={period} />,
    },
    {
      name: t('Contributors'),
      key: 'contributors',
      render: () => <TopContributors period={period} />,
    },
  ]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: 'projects' })

  return (
    <VStack id="leaderboard-mobile-wrapper" width="full" height="120%" spacing={4}>
      <StickToTop
        width={'100%'}
        id="leaderboard-mobile"
        wrapperId="leaderboard-mobile-wrapper"
        offset={dimensions.projectNavBar.mobile.height + 20}
        bias={-70}
      >
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </StickToTop>
      {render && render()}
    </VStack>
  )
}
