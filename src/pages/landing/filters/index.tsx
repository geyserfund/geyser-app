import { SearchIcon } from '@chakra-ui/icons'
import { StackProps, VStack } from '@chakra-ui/react'

import { TextInputBox } from '../../../components/ui'
import { colors } from '../../../styles'
import { FilterByTags } from './FilterByTags'

export const Filters = (rest: StackProps) => {
  return (
    <VStack {...rest}>
      <TextInputBox
        leftIcon={<SearchIcon color={colors.neutral700} />}
        placeholder="Search"
      />
      <FilterByTags />
    </VStack>
  )
}
