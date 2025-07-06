import { HStack, StackProps } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import {
  ProjectCategoryLabel,
  ProjectCategoryList,
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
} from '@/shared/constants/platform/projectCategory.ts'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { ProjectCreationVariables } from '../pages1/projectCreation/types.ts'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  select: {
    width: '100%',
    borderRadius: '8px',
  },
}))

interface ProjectCategoryProps extends StackProps {
  form: UseFormReturn<ProjectCreationVariables>
}

export const SelectProjectCategory = ({ form, ...rest }: ProjectCategoryProps) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const { clearErrors } = form

  const clearSubCategoryError = () => {
    clearErrors('subCategory')
  }

  const clearCategoryError = () => {
    clearErrors('category')
  }

  return (
    <FieldContainer
      title={`${t('Project Category')}*`}
      subtitle={
        <span>{t('Choose the most fitting category. Landing page features trending projects in each category.')}</span>
      }
      {...rest}
    >
      <HStack w="full" alignItems="flex-start">
        <ControlledCustomSelect
          className={classes.select}
          control={form.control}
          name="category"
          placeholder={t('Select category')}
          options={ProjectCategoryList.map((subCategory) => ({
            label: ProjectCategoryLabel[subCategory],
            value: subCategory,
          }))}
          onFocus={clearCategoryError}
        />
        <ControlledCustomSelect
          className={classes.select}
          control={form.control}
          name="subCategory"
          placeholder={t('Select sub-category')}
          options={ProjectSubCategoryList.map((subCategory) => ({
            label: ProjectSubCategoryLabel[subCategory],
            value: subCategory,
          }))}
          onFocus={clearSubCategoryError}
        />
      </HStack>
    </FieldContainer>
  )
}
