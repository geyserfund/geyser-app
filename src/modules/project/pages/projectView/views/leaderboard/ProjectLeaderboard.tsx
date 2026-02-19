import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { StandardOption } from '@/modules/discovery/pages/heroes/types'
import { H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ProjectLeaderboardPeriod } from '@/types'
import { toPx, useMobileMode } from '@/utils'

import { ProjectVisitorBottomBar } from '../../components/ProjectVisitorBottomBar.tsx'
import { Contributions, Leaderboard } from './views'

export const periodOptions: StandardOption<ProjectLeaderboardPeriod>[] = [
  { value: ProjectLeaderboardPeriod.AllTime, label: t('All time') },
  { value: ProjectLeaderboardPeriod.Month, label: t('This month') },
  { value: ProjectLeaderboardPeriod.Week, label: t('This week') },
]

export const ProjectLeaderboard = () => {
  const isMobile = useMobileMode()

  const [period, setPeriod] = useState<ProjectLeaderboardPeriod>(ProjectLeaderboardPeriod.AllTime)

  const handlePeriodChange = (selectedOption: StandardOption<ProjectLeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <HStack w="full" h="full" alignItems="start" spacing={dimensions.project.rightSideNav.gap} pb={{ base: 28, lg: 6 }}>
      <VStack h="full" flex={1} alignItems="start" pt={{ base: '32px', lg: '0' }} pb={{ base: 28, lg: 0 }}>
        <HStack
          w="full"
          justifyContent={'space-between'}
          position={{ base: 'fixed', lg: 'relative' }}
          top={{ base: toPx(dimensions.topNavBar.mobile.height + dimensions.projectNavBar.mobile.height), lg: 'unset' }}
          left={{ base: 0, lg: 'unset' }}
          paddingX={{ base: 3, lg: 0 }}
          paddingY={{ base: 1, lg: 0 }}
          zIndex={3}
          backgroundColor="utils.pbg"
        >
          <VStack>
            <H1 size="2xl" bold dark>
              {t('Leaderboard')}
            </H1>
          </VStack>

          <CustomSelect
            isSearchable={false}
            responsiveWidth={{ base: 'full', xs: '135px' }}
            options={periodOptions}
            value={periodOptions.find((option) => option.value === period)}
            onChange={handlePeriodChange}
            placeholder={t('Select period...')}
            dropdownIndicator={<PiCalendarDots />}
            fontSize="sm"
            customChakraStyles={{
              control: () => ({
                height: '32px',
                minHeight: '32px',
              }),
            }}
          />
        </HStack>
        <Leaderboard period={period} />
      </VStack>
      {!isMobile && (
        <VStack h="full" width="full" maxWidth={dimensions.project.rightSideNav.width} alignItems="start">
          <H1 size="2xl" bold dark>
            {t('Contributions')}
          </H1>
          <Contributions />
        </VStack>
      )}
      <ProjectVisitorBottomBar />
    </HStack>
  )
}
