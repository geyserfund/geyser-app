import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiX } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { standardPadding } from '@/shared/styles'

import { TagsGetResult, useTagsGetQuery } from '../../../../types'
import { useNotification } from '../../../../utils'
import { TagsFilterBody } from './TagsFilterBody'

interface FilterByTagsProps {
  mobile?: boolean
}

export const FilterByTags = ({ mobile }: FilterByTagsProps) => {
  const { toast } = useNotification()

  const { filters, updateFilter } = useFilterContext()
  const { tagIds = [] } = filters
  const isDisabled = tagIds.length >= 3

  const [searchCode, setSearchCode] = useState('')

  const [allTags, setAllTags] = useState<TagsGetResult[]>([])

  const { loading } = useTagsGetQuery({
    onCompleted(data) {
      if (data.tagsGet) {
        const sortedTags = [...data.tagsGet].sort((a, b) => b.count - a.count)
        setAllTags(sortedTags)
      }
    },
  })

  const handleTagsClick = (tag: TagsGetResult) => {
    if (tagIds.includes(tag.id)) {
      updateFilter({ tagIds: tagIds.filter((val) => val !== tag.id) })
    } else {
      if (isDisabled) {
        toast({
          status: 'info',
          title: t('cannot select more than 3 tags'),
        })
        return
      }

      updateFilter({ tagIds: [...tagIds, tag.id] })
    }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <Box width="100%" paddingX={standardPadding}>
        <InputGroup>
          <Input placeholder={t('Search tags')} value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
          {searchCode && (
            <InputRightElement>
              <IconButton
                aria-label="clear-region-search"
                variant="ghost"
                colorScheme="neutral"
                icon={<PiX />}
                onClick={() => setSearchCode('')}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
      <TagsFilterBody searchCode={searchCode} allTags={allTags} handleTagsClick={handleTagsClick} />
    </>
  )
}
