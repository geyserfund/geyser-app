import { Box, Checkbox, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'

import { useFilterContext } from '@/context/filter'
import { standardPadding } from '@/shared/styles'

import { TagsGetResult } from '../../../../types'

interface TagsFilterBodyProps {
  allTags: TagsGetResult[]
  handleTagsClick: (tag: TagsGetResult) => void
  searchCode?: string
}

export const TagsFilterBody = ({ allTags, handleTagsClick, searchCode }: TagsFilterBodyProps) => {
  const { filters } = useFilterContext()

  const { tagIds = [] } = filters

  const tagsToRender = useMemo(() => {
    const usedTags = allTags.filter((tag) => tag.count > 0)
    if (searchCode) {
      return usedTags.filter(
        (tag) => tag.label.toLowerCase().includes(searchCode.toLowerCase()) || tagIds.includes(tag.id),
      )
    }

    return usedTags
  }, [allTags, searchCode, tagIds])

  return (
    <Box width="100%" overflowY="auto">
      <VStack width="100%" paddingX={standardPadding} alignItems="start">
        {tagsToRender.map((tag) => {
          const isChecked = tagIds.includes(tag.id)

          return (
            <Checkbox value={tag.id} key={tag.id} isChecked={isChecked} onChange={() => handleTagsClick(tag)}>
              {tag.label}
            </Checkbox>
          )
        })}
      </VStack>
    </Box>
  )
}
