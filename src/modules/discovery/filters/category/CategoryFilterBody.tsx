import { Box, Divider, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { useFilterContext } from '@/context/filter'
import { Body } from '@/shared/components/typography'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'
import { standardPadding } from '@/shared/styles'

interface CategoryFilterBodyProps {
  onClose?: () => void
  searchCode?: string
}

export const CategoryFilterBody = ({ searchCode, onClose }: CategoryFilterBodyProps) => {
  const { filters, updateFilter } = useFilterContext()
  const { category, subCategory } = filters

  const handleCategoryClick = (selectedCategory: string) => {
    if (selectedCategory === category) {
      updateFilter({ category: undefined })
    } else {
      updateFilter({ subCategory: undefined, category: selectedCategory })
    }

    if (onClose) {
      onClose()
    }
  }

  const handleSubCategoryClick = (selectedSubCategory: string) => {
    if (selectedSubCategory === subCategory) {
      updateFilter({ subCategory: undefined })
    } else {
      updateFilter({ subCategory: selectedSubCategory, category: undefined })
    }

    if (onClose) {
      onClose()
    }
  }

  const value = subCategory ? subCategory : category

  const handleClick = (value: string) => {
    if (value.length === 2) {
      handleSubCategoryClick(value)
    } else {
      handleCategoryClick(value)
    }
  }

  const subCategoriesToRender = useMemo(() => {
    if (searchCode) {
      return ProjectSubCategoryList.filter((subCategory) =>
        subCategory.toLowerCase().includes(searchCode.toLowerCase()),
      )
    }

    return ProjectSubCategoryList
  }, [subCategory, searchCode])

  const categoriesToRender = useMemo(() => {
    if (searchCode) {
      return ProjectCategoryList.filter((category) => category.toLowerCase().includes(searchCode.toLowerCase()))
    }

    return ProjectCategoryList
  }, [category, searchCode])

  return (
    <Box width="100%" overflowY="auto" paddingX={standardPadding}>
      <RadioGroup onChange={handleClick} value={value}>
        <VStack w="full" alignItems="start">
          <Radio value={''}>
            <Body>{t('All categories')}</Body>
          </Radio>
          {categoriesToRender.map((category) => {
            return (
              <Radio key={category} value={category}>
                <Body>{`${ProjectCategoryLabel[category]} `}</Body>
              </Radio>
            )
          })}

          {subCategoriesToRender.length > 0 && categoriesToRender.length > 0 && <Divider />}

          {subCategoriesToRender.map((subCategory) => {
            return (
              <Radio key={subCategory} value={subCategory}>
                <Body>{`${ProjectSubCategoryLabel[subCategory]} `}</Body>
              </Radio>
            )
          })}
        </VStack>
      </RadioGroup>
    </Box>
  )
}
