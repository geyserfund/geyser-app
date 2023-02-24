import { StackProps, VStack } from '@chakra-ui/react'

import { FilterByRegion } from './FilterByRegion'
import { FilterBySearch } from './FilterBySearch'
import { FilterByStatus } from './FilterByStatus'
import { FilterByTags } from './FilterByTags'

type FiltersProps = StackProps

export const Filters = ({ ...rest }: FiltersProps) => {
  return (
    <VStack {...rest}>
      <FilterBySearch />
      <FilterByTags />
      <FilterByRegion />
      <FilterByStatus />
    </VStack>
  )
}
