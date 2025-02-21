import { HStack, Stack, StackProps, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Body } from '@/shared/components/typography'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'
import { Maybe, ProjectCategory, ProjectSubCategory } from '@/types/index.ts'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectState } from '../state/projectAtom'
import { projectFormErrorAtom } from '../state/projectFormAtom'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  select: {
    width: '100%',
    borderRadius: '8px',
  },
}))

interface ProjectCategoryProps extends StackProps {
  category?: Maybe<ProjectCategory>
  subCategory?: Maybe<ProjectSubCategory>
  updateProject: (project: Partial<ProjectState>) => void
}

export const SelectProjectCategory = ({ category, subCategory, updateProject, ...rest }: ProjectCategoryProps) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const [projectFormError, setProjectFormError] = useAtom(projectFormErrorAtom)
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [subCategoryInputValue, setSubCategoryInputValue] = useState('')

  const handleCategoryChange = (value: SingleValue<{ value: ProjectCategory; label: string | undefined }>) => {
    if (value) {
      updateProject({
        category: value.value,
      } as ProjectState)
    }
  }

  const handleSubCategoryChange = (value: SingleValue<{ value: ProjectSubCategory; label: string | undefined }>) => {
    if (value) {
      updateProject({
        subCategory: value.value,
      } as ProjectState)
    }
  }

  const handleCategoryInputChange = (newValue: string) => {
    setCategoryInputValue(newValue)
  }

  const handleSubCategoryInputChange = (newValue: string) => {
    setSubCategoryInputValue(newValue)
  }

  const clearCategoryError = () => {
    setProjectFormError((prev) => ({ ...prev, category: undefined }))
  }

  const categoryValue = category ? { value: category, label: ProjectCategoryLabel[category] } : null
  const subCategoryValue = subCategory ? { value: subCategory, label: ProjectSubCategoryLabel[subCategory] } : null
  return (
    <FieldContainer
      title={`${t('Project Category')}*`}
      subtitle={
        <span>
          {t(
            'Choose the most fitting category and sub-category. Landing page features trending projects in each category.',
          )}
        </span>
      }
      {...rest}
    >
      <VStack width="100%" border="1px solid" borderColor="neutral1.6" borderRadius="8px" p="10px">
        <Stack direction={{ base: 'column', md: 'row' }} spacing="10px" width="100%">
          <CustomSelect
            className={classes.select}
            onChange={handleCategoryChange}
            name="category"
            placeholder={t('Select category')}
            value={null}
            options={ProjectCategoryList.map((category) => ({
              label: ProjectCategoryLabel[category],
              value: category,
            }))}
            onInputChange={handleCategoryInputChange}
            inputValue={categoryInputValue}
            isInvalid={Boolean(projectFormError.category)}
            onFocus={clearCategoryError}
          />

          <CustomSelect
            className={classes.select}
            onChange={handleSubCategoryChange}
            name="subCategory"
            placeholder={t('Select subcategory')}
            value={null}
            options={ProjectSubCategoryList.map((subCategory) => ({
              label: ProjectSubCategoryLabel[subCategory],
              value: subCategory,
            }))}
            onInputChange={handleSubCategoryInputChange}
            inputValue={subCategoryInputValue}
            isInvalid={Boolean(projectFormError.subCategory)}
            onFocus={() => setProjectFormError((prev) => ({ ...prev, subCategory: undefined }))}
          />
        </Stack>
        <HStack width="100%" spacing="10px" flexWrap={'wrap'}>
          {categoryValue && (
            <HStack flex={1}>
              <Body borderRadius="4px" paddingX="8px" backgroundColor="neutral1.2">
                {t('category')}:{' '}
                <Body as="span" medium>
                  {categoryValue.label}
                </Body>{' '}
              </Body>
            </HStack>
          )}
          {subCategoryValue && (
            <HStack flex={1}>
              <Body borderRadius="4px" paddingX="8px" backgroundColor="neutral1.2">
                {t('subcategory')}:{' '}
                <Body as="span" medium>
                  {subCategoryValue.label}
                </Body>{' '}
              </Body>
            </HStack>
          )}
        </HStack>
      </VStack>

      {(projectFormError.category || projectFormError.subCategory) && (
        <Body size="xs" color="error.9" w="full" textAlign={'start'}>
          {projectFormError.category || projectFormError.subCategory}
        </Body>
      )}
    </FieldContainer>
  )
}
