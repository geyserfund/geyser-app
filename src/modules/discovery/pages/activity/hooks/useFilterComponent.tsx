import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

import type { PostType, ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

export type FilterState = {
  postType: PostType | null
  category: ProjectCategory | null
  subCategory: ProjectSubCategory | null
  followedProjects: boolean
}

export type FilterOption = {
  label: string
  value: string
}

/** Hook for managing filter component state and actions */
export const useFilterComponent = () => {
  const [filters, setFilters] = useState<FilterState>({
    postType: null,
    category: null,
    subCategory: null,
    followedProjects: false,
  })

  const postTypeDropdown = useDisclosure()
  const categoryDropdown = useDisclosure()

  const setPostType = (postType: PostType | null) => {
    setFilters((prev) => ({ ...prev, postType }))
  }

  const setCategory = (category: ProjectCategory | null) => {
    setFilters((prev) => ({ ...prev, category, subCategory: null }))
  }

  const setSubCategory = (subCategory: ProjectSubCategory | null) => {
    setFilters((prev) => ({ ...prev, subCategory }))
  }

  const setFollowedProjects = (followedProjects: boolean) => {
    setFilters((prev) => ({ ...prev, followedProjects }))
  }

  const resetFilters = () => {
    setFilters({
      postType: null,
      category: null,
      subCategory: null,
      followedProjects: false,
    })
  }

  const togglePostTypeDropdown = () => {
    postTypeDropdown.onToggle()
    categoryDropdown.onClose()
  }

  const toggleCategoryDropdown = () => {
    categoryDropdown.onToggle()
    postTypeDropdown.onClose()
  }

  const closeAllDropdowns = () => {
    postTypeDropdown.onClose()
    categoryDropdown.onClose()
  }

  return {
    filters,
    postTypeDropdown,
    categoryDropdown,
    setPostType,
    setCategory,
    setSubCategory,
    setFollowedProjects,
    resetFilters,
    togglePostTypeDropdown,
    toggleCategoryDropdown,
    closeAllDropdowns,
  }
}
