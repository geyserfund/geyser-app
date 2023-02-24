import { StackProps, VStack } from '@chakra-ui/react'

import { FilterState } from '../../../hooks/state'
import { FilterByRegion } from './FilterByRegion'
import { FilterBySearch } from './FilterBySearch'
import { FilterByStatus } from './FilterByStatus'
import { FilterByTags } from './FilterByTags'

interface FiltersProps extends StackProps, FilterState {}

export const Filters = ({ filters, updateFilter, ...rest }: FiltersProps) => {
  return (
    <VStack {...rest}>
      <FilterBySearch {...{ filters, updateFilter }} />
      <FilterByTags {...{ filters, updateFilter }} />
      <FilterByRegion {...{ filters, updateFilter }} />
      <FilterByStatus {...{ filters, updateFilter }} />
    </VStack>
  )
}
