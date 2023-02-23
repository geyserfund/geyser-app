import { SearchIcon } from '@chakra-ui/icons'
import { StackProps, VStack } from '@chakra-ui/react'

import { AccordionLayout } from '../../../components/layouts/AccordionLayout'
import { TextInputBox } from '../../../components/ui'
import { FilterState } from '../../../hooks/state'
import { colors } from '../../../styles'
import { FilterByRegion } from './FilterByRegion'
import { FilterByTags } from './FilterByTags'

interface FiltersProps extends StackProps, FilterState {}

export const Filters = ({ filters, updateFilter, ...rest }: FiltersProps) => {
  return (
    <VStack {...rest}>
      <TextInputBox
        leftIcon={<SearchIcon color={colors.neutral700} />}
        placeholder="Search"
      />

      <FilterByTags {...{ filters, updateFilter }} />
      <FilterByRegion {...{ filters, updateFilter }} />
    </VStack>
  )
}
