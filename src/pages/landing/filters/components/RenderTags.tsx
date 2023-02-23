import { useEffect, useState } from 'react'

import { TagsGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

const MAX_TAG_INDEX_DEFAULT_VIEW = 5
const MAX_TAG_INDEX_EXTENDED_VIEW = 9

export const RenderTags = ({
  isOpen,
  allTags,
  tagIds,
  handleClick,
}: {
  isOpen: boolean
  allTags: TagsGetResult[]
  tagIds: number[]
  handleClick: (_: TagsGetResult) => void
}) => {
  const [tagsToRender, setTagsToRender] = useState<TagsGetResult[]>([])

  useEffect(() => {
    const selectedTags = allTags.filter((tag) => tagIds.includes(tag.id))

    const maxNumberOfSelectableTags = isOpen
      ? MAX_TAG_INDEX_EXTENDED_VIEW
      : MAX_TAG_INDEX_DEFAULT_VIEW

    let toBeRenderedTags = allTags.slice(0, maxNumberOfSelectableTags)

    selectedTags.map((selectedTag) => {
      if (
        !toBeRenderedTags.some(
          (toBeRenderedTag) => toBeRenderedTag.id === selectedTag.id,
        )
      ) {
        toBeRenderedTags = [selectedTag, ...toBeRenderedTags]
      }
    })
    setTagsToRender(toBeRenderedTags)
  }, [allTags, tagIds, isOpen])

  return (
    <>
      {tagsToRender.map((tag) => {
        const isActive = tagIds.includes(tag.id)
        return (
          <FilterListItem
            key={tag.id}
            isActive={isActive}
            label={tag.label}
            value={tag}
            count={tag.count}
            handleClick={handleClick}
          />
        )
      })}
    </>
  )
}
