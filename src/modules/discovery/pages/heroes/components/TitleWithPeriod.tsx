import { Button, HStack, StackProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCalendarDots } from 'react-icons/pi'
import { Link } from 'react-router'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { H3 } from '@/shared/components/typography'
import { LeaderboardPeriod } from '@/types'

import { StandardOption } from '../types'

export const periodOptions: StandardOption<LeaderboardPeriod>[] = [
  { value: LeaderboardPeriod.Month, label: t('This month') },
  { value: LeaderboardPeriod.AllTime, label: t('All time') },
]

type TitleWithPeriodProps = {
  title?: string
  period: LeaderboardPeriod
  seeAllTo?: string
  handlePeriodChange: (selectedOption: StandardOption<LeaderboardPeriod> | null) => void
} & StackProps

export const TitleWithPeriod = ({ title, period, seeAllTo, handlePeriodChange, ...props }: TitleWithPeriodProps) => {
  return (
    <HStack w="full" justifyContent="space-between" flexWrap={'wrap'} spacing={1} {...props}>
      <HStack w={{ base: 'full', sm: 'auto' }} justifyContent="space-between">
        {title && (
          <H3 size={{ base: 'lg', lg: 'xl' }} bold dark wordBreak={'keep-all'} width={{ sm: '230px' }}>
            {title}
          </H3>
        )}
        {seeAllTo && (
          <Button
            display={{ base: 'flex', sm: 'none' }}
            height="32px"
            as={Link}
            to={seeAllTo}
            variant="soft"
            colorScheme="neutral1"
          >
            {t('See all')}
          </Button>
        )}
      </HStack>
      <HStack spacing={2} w={{ base: 'full', sm: 'auto' }}>
        {seeAllTo && (
          <Button
            display={{ base: 'none', sm: 'flex' }}
            height="32px"
            as={Link}
            to={seeAllTo}
            variant="soft"
            colorScheme="neutral1"
          >
            {t('See all')}
          </Button>
        )}
        <CustomSelect
          isSearchable={false}
          width={{ base: 'full', sm: '135px' }}
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
            valueContainer: (provided) => ({
              ...provided,
              paddingLeft: '10px',
              paddingRight: 0,
            }),
          }}
        />
      </HStack>
    </HStack>
  )
}
