import { StackProps, VStack } from '@chakra-ui/react'
import { useMatch } from 'react-router-dom'

import { getPath } from '../../../constants'
import { FilterByActivity } from './activity'
import { FilterBySearch } from './FilterBySearch'
import { FilterFooter } from './FilterFooter'
import { FilterByRegion } from './region'
import { FilterByStatus } from './status'
import { FilterByTags } from './tag'

type FiltersProps = StackProps

export const Filters = ({ ...rest }: FiltersProps) => {
  const isLandingFeed = useMatch(getPath('landingFeed'))

  return (
    <VStack {...rest}>
      <FilterBySearch />
      <FilterByTags />
      <FilterByRegion />
      {isLandingFeed ? <FilterByActivity /> : <FilterByStatus />}
      <FilterFooter />
    </VStack>
  )
}
