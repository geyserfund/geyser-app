import { Box, Button, HStack, Icon, Text, useColorModeValue, UseDisclosureReturn } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretDown, PiX } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'

import type { FilterState } from '../hooks/useFilterComponent.tsx'
import { CategorySelect } from './CategorySelect.tsx'

type PostTypeOption = {
  label: string
  value: string
}

type FilterComponentProps = {
  filters: FilterState
  postTypeDropdown: UseDisclosureReturn
  categoryDropdown: UseDisclosureReturn
  onPostTypeChange: (postType: any) => void
  onCategoryChange: (category: any) => void
  onSubCategoryChange: (subCategory: any) => void
  onFollowedProjectsChange: (followed: boolean) => void
  onTogglePostTypeDropdown: () => void
  onToggleCategoryDropdown: () => void
  onCloseAllDropdowns: () => void
}

/** Filter pill component with dropdown functionality */
const FilterPill = ({
  label,
  value,
  isActive,
  hasDropdown = false,
  onClick,
  onRemove,
}: {
  label: string
  value?: string
  isActive: boolean
  hasDropdown?: boolean
  onClick: () => void
  onRemove?: () => void
}) => {
  const inactiveBg = useColorModeValue('neutral1.3', 'neutral1.7')
  const inactiveColor = useColorModeValue('neutral1.11', 'neutral1.3')
  const hoverBg = useColorModeValue('utils.danger', 'utils.danger')

  return (
    <Button
      variant="soft"
      colorScheme={isActive ? 'primary1' : 'neutral1'}
      borderRadius="full"
      px={4}
      cursor="pointer"
      display="flex"
      alignItems="center"
      gap={2}
      fontSize="sm"
      fontWeight="medium"
      transition="all 0.2s"
      _hover={{
        bg: isActive ? hoverBg : inactiveBg,
        color: isActive ? 'red' : inactiveColor,
      }}
      onClick={onClick}
    >
      <Text fontSize="sm">{value ? `${label}: ${value}` : label}</Text>
      {isActive && onRemove ? (
        <Icon
          as={PiX}
          fontSize="14px"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        />
      ) : hasDropdown ? (
        <Icon as={PiCaretDown} fontSize="14px" />
      ) : null}
    </Button>
  )
}

const postTypeOptions: PostTypeOption[] = [
  { label: t('Announcement'), value: 'ANNOUNCEMENT' },
  { label: t('Behind the Scenes'), value: 'BEHIND_THE_SCENES' },
  { label: t('Feedback Request'), value: 'FEEDBACK_REQUEST' },
  { label: t('Goal Reached'), value: 'GOAL_REACHED' },
  { label: t('Goal Update'), value: 'GOAL_UPDATE' },
  { label: t('Impact'), value: 'IMPACT' },
  { label: t('New Goal'), value: 'NEW_GOAL' },
  { label: t('New Reward'), value: 'NEW_REWARD' },
  { label: t('Reward Update'), value: 'REWARD_UPDATE' },
]

/** Component for filtering activity feed with pill-based interface */
export const FilterComponent = ({
  filters,
  postTypeDropdown,
  categoryDropdown,
  onPostTypeChange,
  onCategoryChange,
  onSubCategoryChange,
  onFollowedProjectsChange,
  onTogglePostTypeDropdown,
  onToggleCategoryDropdown,
  onCloseAllDropdowns,
}: FilterComponentProps) => {
  const getPostTypeLabel = (postType: string) => {
    const option = postTypeOptions.find((opt) => opt.value === postType)
    return option?.label || postType
  }

  const getCategoryLabel = () => {
    if (filters.subCategory) {
      return ProjectSubCategoryLabel[filters.subCategory] || filters.subCategory
    }

    if (filters.category) {
      return ProjectCategoryLabel[filters.category] || filters.category
    }

    return null
  }

  return (
    <HStack spacing={3} wrap="wrap">
      {/* Projects I follow pill */}
      <FilterPill
        label={t('Projects I follow')}
        isActive={filters.followedProjects}
        onClick={() => onFollowedProjectsChange(!filters.followedProjects)}
        onRemove={filters.followedProjects ? () => onFollowedProjectsChange(false) : undefined}
      />

      {/* Post Type pill */}
      <Box position="relative">
        <FilterPill
          label={t('Post Type')}
          value={filters.postType ? getPostTypeLabel(filters.postType) : undefined}
          isActive={Boolean(filters.postType)}
          hasDropdown={!filters.postType}
          onClick={onTogglePostTypeDropdown}
          onRemove={filters.postType ? () => onPostTypeChange(null) : undefined}
        />
        {postTypeDropdown.isOpen && (
          <Box position="absolute" top="100%" left={0} zIndex={10} mt={1}>
            <CustomSelect
              onMenuClose={onCloseAllDropdowns}
              placeholder={t('Select post type')}
              options={postTypeOptions}
              value={postTypeOptions.find((opt) => opt.value === filters.postType)}
              onChange={(option: PostTypeOption | null) => {
                onPostTypeChange(option?.value || null)
                onCloseAllDropdowns()
              }}
              isSearchable
              isClearable
              dropdownIndicator={<PiCaretDown />}
              width="200px"
              menuIsOpen={postTypeDropdown.isOpen}
            />
          </Box>
        )}
      </Box>

      {/* Category pill */}
      <Box position="relative">
        <FilterPill
          label={t('Category')}
          value={getCategoryLabel() || undefined}
          isActive={Boolean(filters.category || filters.subCategory)}
          hasDropdown={!(filters.category || filters.subCategory)}
          onClick={onToggleCategoryDropdown}
          onRemove={
            filters.category || filters.subCategory
              ? () => {
                  onCategoryChange(null)
                  onSubCategoryChange(null)
                }
              : undefined
          }
        />
        {categoryDropdown.isOpen && (
          <Box position="absolute" top="100%" left={0} zIndex={10} mt={1}>
            <CategorySelect
              selectedCategory={filters.category}
              selectedSubCategory={filters.subCategory}
              onCategoryChange={onCategoryChange}
              onSubCategoryChange={onSubCategoryChange}
              isOpen={categoryDropdown.isOpen}
              onClose={onCloseAllDropdowns}
            />
          </Box>
        )}
      </Box>
    </HStack>
  )
}
