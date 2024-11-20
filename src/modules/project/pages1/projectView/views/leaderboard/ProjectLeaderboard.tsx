import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { StandardOption } from '@/modules/discovery/pages/hallOfFame/types'
import { H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { ProjectLeaderboardPeriod } from '@/types'
import { toPx, useMobileMode } from '@/utils'

import { Contributions, Leaderboard } from './views'

export const periodOptions: StandardOption<ProjectLeaderboardPeriod>[] = [
  { value: ProjectLeaderboardPeriod.Month, label: t('Current month') },
  { value: ProjectLeaderboardPeriod.Week, label: t('Current week') },
  { value: ProjectLeaderboardPeriod.AllTime, label: t('All time') },
]

export const ProjectLeaderboard = () => {
  const isMobile = useMobileMode()

  const [period, setPeriod] = useState<ProjectLeaderboardPeriod>(ProjectLeaderboardPeriod.Month)

  const handlePeriodChange = (selectedOption: StandardOption<ProjectLeaderboardPeriod> | null) => {
    if (selectedOption) {
      setPeriod(selectedOption.value)
    }
  }

  return (
    <HStack w="full" h="full" alignItems="start" spacing={dimensions.project.rightSideNav.gap} pb={6}>
      <VStack h="full" flex={1} alignItems="start" pt={{ base: '32px', lg: '0' }}>
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
          <H1 size="2xl" bold dark>
            {t('Leaderboard')}
          </H1>
          <CustomSelect
            isSearchable={false}
            width={{ base: 'full', xs: '180px' }}
            options={periodOptions}
            value={periodOptions.find((option) => option.value === period)}
            onChange={handlePeriodChange}
            placeholder={t('Select period...')}
            dropdownIndicator={<PiCalendarDots />}
            dropdownIndicatorPosition="left"
            fontSize="sm"
            customChakraStyles={{
              control: (provided) => ({
                ...provided,
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
    </HStack>
  )
}
