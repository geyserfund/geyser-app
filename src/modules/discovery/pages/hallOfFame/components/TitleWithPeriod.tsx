import { HStack, StackProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { H3 } from '@/shared/components/typography'
import { LeaderboardPeriod } from '@/types'

import { StandardOption } from '../types'

export const periodOptions: StandardOption<LeaderboardPeriod>[] = [
  { value: LeaderboardPeriod.Month, label: t('Current month') },
  { value: LeaderboardPeriod.AllTime, label: t('All time') },
]

type TitleWithPeriodProps = {
  title: string
  period: LeaderboardPeriod
  handlePeriodChange: (selectedOption: StandardOption<LeaderboardPeriod> | null) => void
} & StackProps

export const TitleWithPeriod = ({ title, period, handlePeriodChange, ...props }: TitleWithPeriodProps) => {
  return (
    <HStack w="full" justifyContent="space-between" flexWrap={'wrap'} spacing={1} {...props}>
      <H3 size="2xl" bold dark wordBreak={'keep-all'} width={{ base: '100%', sm: '230px' }}>
        {title}
      </H3>
      <CustomSelect
        isSearchable={false}
        width={{ base: '100%', sm: '200px' }}
        options={periodOptions}
        value={periodOptions.find((option) => option.value === period)}
        onChange={handlePeriodChange}
        placeholder={t('Select period...')}
        dropdownIndicator={<PiCalendarDots />}
      />
    </HStack>
  )
}
