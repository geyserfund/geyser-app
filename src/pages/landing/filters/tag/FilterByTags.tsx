import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { useFilterContext } from '../../../../context'
import { QUERY_TAGS } from '../../../../graphql/queries'
import { TagsGetResult } from '../../../../types'
import { useNotification } from '../../../../utils'
import {
  DesktopFilterLayoutSkeleton,
  DesktopTagsFilter,
} from './DesktopTagsFilter'
import { MobileTagsFilter } from './MobileTagsFilter'

interface FilterByTagsProps {
  mobile?: boolean
}

export const FilterByTags = ({ mobile }: FilterByTagsProps) => {
  const { toast } = useNotification()

  const { filters, updateFilter } = useFilterContext()

  const { tagIds = [] } = filters

  const isDisabled = tagIds.length >= 3

  const [allTags, setAllTags] = useState<TagsGetResult[]>([])

  const { loading } = useQuery<{ tagsGet: TagsGetResult[] }>(QUERY_TAGS, {
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
          title: 'cannot select more than 3 tags',
        })
        return
      }

      updateFilter({ tagIds: [...tagIds, tag.id] })
    }
  }

  if (loading) {
    return <DesktopFilterLayoutSkeleton />
  }

  if (mobile) {
    return <MobileTagsFilter {...{ handleTagsClick, allTags }} />
  }

  return <DesktopTagsFilter {...{ handleTagsClick, allTags }} />
}
