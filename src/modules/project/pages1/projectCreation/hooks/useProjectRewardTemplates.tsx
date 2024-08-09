import { useCallback, useMemo } from 'react'

import { Tag } from '../../../../../types'
import { rewardTemplates } from '../constants'
import { tagToRewardCategoryMapping } from '../constants'
import { RewardTemplateType } from '../types'

const useProjectRewardTemplates = (selectedTags: Tag[]): RewardTemplateType[] => {
  const tags = useMemo(() => selectedTags.map((tag: { label: string }) => tag.label), [selectedTags])

  const normalizeTagLabel = (label: string): string => {
    return label
      .toLowerCase()
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
      .replace(/^./, (str) => str.toLowerCase())
  }

  const getCategoriesByTags = useCallback((tags: string[]): string[] => {
    let matchedCategories: string[] = []
    tags.forEach((tag) => {
      const normalizedTag = normalizeTagLabel(tag)
      const categories = tagToRewardCategoryMapping[normalizedTag] || []
      matchedCategories = [...matchedCategories, ...categories]
    })
    return Array.from(new Set(matchedCategories))
  }, [])

  const getMostCommonCategories = useCallback(
    (tags: string[]): string[] => {
      const categories = getCategoriesByTags(tags)
      return categories
        .sort((a, b) => {
          return (
            rewardTemplates.filter((template) => template.category === a).length -
            rewardTemplates.filter((template) => template.category === b).length
          )
        })
        .slice(0, 4)
    },
    [getCategoriesByTags],
  )

  const displayedTemplates = useMemo(() => {
    const categories = getCategoriesByTags(tags)
    if (categories.length === 0) {
      return [...rewardTemplates].sort(() => 0.5 - Math.random()).slice(0, 4)
    }

    if (categories.length < 4) {
      const foundTemplates = rewardTemplates.filter((template) => categories.includes(template.category))
      const remainingTemplates = rewardTemplates.filter((template) => !categories.includes(template.category))
      return [
        ...foundTemplates,
        ...remainingTemplates.sort(() => 0.5 - Math.random()).slice(0, 4 - foundTemplates.length),
      ]
    }

    if (categories.length === 4) {
      return rewardTemplates.filter((template) => categories.includes(template.category))
    }

    const mostCommonCategories = getMostCommonCategories(tags)
    return rewardTemplates.filter((template) => mostCommonCategories.includes(template.category))
  }, [tags, getMostCommonCategories, getCategoriesByTags])

  return displayedTemplates
}

export default useProjectRewardTemplates
