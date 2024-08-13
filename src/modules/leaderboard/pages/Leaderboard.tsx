import { Box, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { StickToTop } from '@/shared/components/layouts'
import { AnimatedNavBar, NavBarItems } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'
import { LeaderboardPeriod } from '@/types'
import { useMobileMode } from '@/utils'

import { SummaryBanner, TopContributors, TopProjects } from '../components'

interface PeriodOption {
  value: LeaderboardPeriod
  label: string
}
export const Leaderboard = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const [period, setPeriod] = useState<LeaderboardPeriod>(LeaderboardPeriod.AllTime)

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
    <Box w="full" display="flex" justifyContent="center" alignItems="center" height="120%" bg="utils.pbg">
      <VStack
        width="100%"
        height="100%"
        paddingTop={{
          base: `${dimensions.projectNavBar.mobile.height - 20}px`,
          lg: `${dimensions.projectNavBar.desktop.height}px`,
        }}
        paddingX={standardPadding}
        alignItems="center"
      >
        <Box w="100%" height="100%" maxWidth={dimensions.maxWidth}>
          <VStack spacing={4} width="full">
            <SummaryBanner />
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
        </Box>
      </VStack>
    </Box>
  )
}

const MobileLeaderboard = ({ period }: { period: LeaderboardPeriod }) => {
  const { t } = useTranslation()

  const items: NavBarItems[] = [
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
        _onStick={{ width: '100%', px: '4' }}
      >
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </StickToTop>
      {render && render()}
    </VStack>
  )
}
