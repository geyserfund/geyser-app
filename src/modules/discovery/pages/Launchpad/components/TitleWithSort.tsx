import { HStack, StackProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiSortAscending } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { H3 } from '@/shared/components/typography'

import { StandardOption } from '../../hallOfFame/types.ts'

export enum SortBy {
  PreLaunchDate = 'preLaunchedAt',
  Followers = 'followersCount',
}

export const sortOptions: StandardOption<SortBy>[] = [
  { value: SortBy.PreLaunchDate, label: t('Pre-launch') },
  { value: SortBy.Followers, label: t('Followers') },
]

type TitleWithSortProps = {
  title: string
  sortBy: SortBy
  onSortByChange: (sortBy: SortBy) => void
} & StackProps

export const TitleWithSort = ({ title, sortBy, onSortByChange, ...props }: TitleWithSortProps) => {
  return (
    <HStack w="full" justifyContent="space-between" flexWrap={'wrap'} spacing={1} {...props}>
      <H3 size="2xl" bold dark wordBreak={'keep-all'} width={{ sm: '230px' }}>
        {title}
      </H3>

      <HStack spacing={2} w={{ base: 'full', sm: 'auto' }}>
        <CustomSelect
          isSearchable={false}
          width={{ base: 'full', sm: '140px' }}
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sortBy)}
          onChange={(option) => onSortByChange(option?.value as SortBy)}
          placeholder={t('Sort by...')}
          dropdownIndicator={<PiSortAscending />}
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
