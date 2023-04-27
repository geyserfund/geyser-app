import { Box, useDisclosure, VStack } from '@chakra-ui/react'
import { MultiValue } from 'react-select'

import { SelectComponent } from '../../../../components/ui'
import { useFilterContext } from '../../../../context'
import { TagsGetResult } from '../../../../types'
import { RenderTags } from '../components'

interface TagsFilterBodyProps {
  allTags: TagsGetResult[]
  handleTagsClick: (tag: TagsGetResult) => void
}

export const TagsFilterBody = ({
  allTags,
  handleTagsClick,
}: TagsFilterBodyProps) => {
  const { filters, updateFilter } = useFilterContext()

  const { tagIds = [] } = filters

  const {
    isOpen: selectMenuOpen,
    onOpen: onSelectMenuOpen,
    onClose: onSelectMenuClose,
  } = useDisclosure()

  const isDisabled = tagIds.length >= 3

  const handleTagsSelection = (newValue: MultiValue<TagsGetResult>) => {
    if (newValue[0]) {
      updateFilter({ tagIds: [...tagIds, newValue[0].id] })
    }
  }

  const handleInputChange = (newValue: string) => {
    if (newValue?.length >= 1) {
      onSelectMenuOpen()
    } else {
      onSelectMenuClose()
    }
  }

  return (
    <>
      <Box width="100%" paddingX="24px">
        <SelectComponent<TagsGetResult, true>
          isMulti
          isDisabled={isDisabled}
          menuIsOpen={selectMenuOpen}
          onBlur={onSelectMenuClose}
          options={allTags}
          value={[]}
          getOptionLabel={(option) => option.label}
          onChange={handleTagsSelection}
          onInputChange={handleInputChange}
        />
      </Box>

      <Box width="100%" overflowY="auto">
        <VStack
          width="100%"
          padding="0px 24px"
          alignItems="start"
          spacing="5px"
        >
          <RenderTags {...{ allTags, tagIds, handleClick: handleTagsClick }} />
        </VStack>
      </Box>
    </>
  )
}
