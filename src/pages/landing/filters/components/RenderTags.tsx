import { useEffect, useState } from 'react'

import { TagsGetResult } from '../../../../types'
import { FilterListItem } from './FilterListButton'

export const RenderTags = ({
  max,
  allTags,
  tagIds,
  handleClick,
}: {
  max?: number
  allTags: TagsGetResult[]
  tagIds: number[]
  handleClick: (_: TagsGetResult) => void
}) => {
  const [tagsToRender, setTagsToRender] = useState<TagsGetResult[]>([])

  useEffect(() => {
    const selectedTags = allTags.filter((tag) => tagIds.includes(tag.id))
    const usedTags = allTags.filter((tag) => tag.count > 0)

    if (max) {
      let toBeRenderedTags = usedTags.slice(0, max)

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
    } else {
      setTagsToRender(usedTags)
    }
  }, [allTags, tagIds, max])

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
