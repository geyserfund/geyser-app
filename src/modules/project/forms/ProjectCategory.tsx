import { StackProps } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Body } from '@/shared/components/typography'
import {
  ProjectSubCategoryLabel,
  ProjectSubCategoryList,
  ProjectSubCategoryMap,
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

  const handleSubCategoryChange = (value: SingleValue<{ value: ProjectSubCategory; label: string | undefined }>) => {
    if (value) {
      const categoryForSubcategory = Object.keys(ProjectSubCategoryMap).find((key) =>
        ProjectSubCategoryMap[key as ProjectCategory].includes(value.value),
      )

      updateProject({
        subCategory: value.value,
        category: categoryForSubcategory,
      } as ProjectState)
    }
  }

  const clearSubCategoryError = () => {
    setProjectFormError((prev) => ({ ...prev, category: undefined, subCategory: undefined }))
  }

  const subCategoryValue = subCategory ? { value: subCategory, label: ProjectSubCategoryLabel[subCategory] } : null

  return (
    <FieldContainer
      title={`${t('Project Category')}*`}
      subtitle={
        <span>{t('Choose the most fitting category. Landing page features trending projects in each category.')}</span>
      }
      {...rest}
    >
      <CustomSelect
        className={classes.select}
        onChange={handleSubCategoryChange}
        name="subCategory"
        placeholder={t('Select category')}
        value={subCategoryValue}
        options={ProjectSubCategoryList.map((subCategory) => ({
          label: ProjectSubCategoryLabel[subCategory],
          value: subCategory,
        }))}
        isInvalid={Boolean(projectFormError.subCategory)}
        onFocus={clearSubCategoryError}
      />

      {projectFormError.subCategory && (
        <Body size="xs" color="error.9" w="full" textAlign={'start'}>
          {projectFormError.subCategory}
        </Body>
      )}
    </FieldContainer>
  )
}
