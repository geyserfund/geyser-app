import { SearchIcon } from '@chakra-ui/icons'
import { HStack, VStack } from '@chakra-ui/react'
import { HiOutlineTag } from 'react-icons/hi'

import { CardLayout } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { TextInputBox } from '../../../components/ui'
import { colors } from '../../../styles'
import { FilterByTags } from './FilterByTags'

export const Filters = () => {
  return (
    <VStack>
      <TextInputBox
        leftIcon={<SearchIcon color={colors.neutral700} />}
        placeholder="Search"
      />
      <FilterByTags />
    </VStack>
  )
}
