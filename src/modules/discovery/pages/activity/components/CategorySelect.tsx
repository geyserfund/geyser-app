import { Box } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { PiCaretDown } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryLabel,
  ProjectSubCategoryMap,
} from '@/shared/constants/platform/projectCategory.ts'
import type { ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

type CategoryOption = {
  label: string
  value: ProjectCategory | ProjectSubCategory
  isSubCategory?: boolean
  parentCategory?: ProjectCategory
}

type CategorySelectProps = {
  selectedCategory: ProjectCategory | null
  selectedSubCategory: ProjectSubCategory | null
  onCategoryChange: (category: ProjectCategory | null) => void
  onSubCategoryChange: (subCategory: ProjectSubCategory | null) => void
  isOpen: boolean
  onClose: () => void
}

/** Component for selecting project categories and subcategories */
export const CategorySelect = ({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  isOpen,
  onClose,
}: CategorySelectProps) => {
  const options = useMemo(() => {
    const categoryOptions: CategoryOption[] = ProjectCategoryList.map((category) => ({
      label: ProjectCategoryLabel[category] || category,
      value: category,
      isSubCategory: false,
    }))

    const subCategoryOptions: CategoryOption[] = []

    ProjectCategoryList.forEach((category) => {
      const subCategories = ProjectSubCategoryMap[category] || []
      subCategories.forEach((subCategory) => {
        subCategoryOptions.push({
          label: `  ${ProjectSubCategoryLabel[subCategory] || subCategory}`,
          value: subCategory,
          isSubCategory: true,
          parentCategory: category,
        })
      })
    })

    return [...categoryOptions, ...subCategoryOptions]
  }, [])

  const selectedValue = useMemo(() => {
    if (selectedSubCategory) {
      return options.find((option) => option.value === selectedSubCategory)
    }

    if (selectedCategory) {
      return options.find((option) => option.value === selectedCategory)
    }

    return null
  }, [selectedCategory, selectedSubCategory, options])

  const handleChange = (option: CategoryOption | null) => {
    if (!option) {
      onCategoryChange(null)
      onSubCategoryChange(null)
      return
    }

    if (option.isSubCategory) {
      onSubCategoryChange(option.value as ProjectSubCategory)
      onCategoryChange(option.parentCategory || null)
    } else {
      onCategoryChange(option.value as ProjectCategory)
      onSubCategoryChange(null)
    }

    onClose()
  }

  return (
    <Box width="250px">
      <CustomSelect
        menuIsOpen={isOpen}
        onMenuClose={onClose}
        placeholder={t('Select category')}
        options={options}
        value={selectedValue}
        onChange={handleChange}
        isSearchable
        isClearable
        dropdownIndicator={<PiCaretDown />}
        customChakraStyles={{
          option: (provided, state) => ({
            ...provided,
            fontWeight: state.data?.isSubCategory ? '400' : '600',
            fontSize: state.data?.isSubCategory ? '14px' : '16px',
            paddingLeft: state.data?.isSubCategory ? '24px' : '12px',
          }),
        }}
      />
    </Box>
  )
}
