import { StackProps, VStack } from '@chakra-ui/react'

import { FilterBySearch } from './FilterBySearch'
import { FilterByRegion } from './region'
import { FilterByStatus } from './status'
import { FilterByTags } from './tag'

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
