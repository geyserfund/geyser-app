import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { noUrlRegex } from '@/utils/index.ts'

import { useAuthContext } from '../../../../../context'
import { ProjectValidations } from '../../../../../shared/constants'
import { ProjectPageBodyFragment } from '../../../../../types'
import { ProjectCreationVariables } from '../types'

const DEFAULT_VALUES: ProjectCreationVariables = {
  title: '',
  shortDescription: '',
  description: '',
  images: [],
  thumbnailImage: '',
  email: '',
  name: '',
}

const schema = yup
  .object({
    shortDescription: yup
      .string()
      .required('Project objective is a required field.')
      .max(
        ProjectValidations.shortDescription.maxLength,
        `Project objective should be shorter than ${ProjectValidations.shortDescription.maxLength} characters.`,
      )
      .matches(noUrlRegex, 'Project short description cannot contain a URL'),
    name: yup
      .string()
      .required('Project name is a required field.')
      .min(
        ProjectValidations.name.minLength,
        `Project name should be between ${ProjectValidations.name.minLength} and ${ProjectValidations.name.maxLength} characters.`,
      )
      .max(
        ProjectValidations.name.maxLength,
        `Project name should be between ${ProjectValidations.name.minLength} and ${ProjectValidations.name.maxLength} characters.`,
      )
      .matches(noUrlRegex, 'Project name cannot contain a URL'),
    title: yup
      .string()
      .required('Title is a required field.')
      .max(
        ProjectValidations.title.maxLength,
        `Title should be shorter than ${ProjectValidations.title.maxLength} characters.`,
      )
      .matches(noUrlRegex, 'Project title cannot contain a URL'),
    email: yup.string().email('Please enter a valid email address').required('Email address is a required field.'),
  })
  .required()

type UseProjectFormProps = {
  isEdit: boolean
  project: ProjectPageBodyFragment | undefined | null
}

export const useProjectForm = ({ isEdit, project }: UseProjectFormProps) => {
  const { user } = useAuthContext()

  const form = useForm<ProjectCreationVariables>({
    resolver: yupResolver(schema) as any,
    defaultValues: DEFAULT_VALUES,
    values: useMemo(() => {
      if (isEdit && project) {
        return {
          title: project.title,
          name: project.name,
          images: project.images || '',
          thumbnailImage: project.thumbnailImage || '',
          shortDescription: project.shortDescription || '',
          description: project.description || '',
          email: user.email || '',
        }
      }

      return { ...DEFAULT_VALUES, email: user.email || '' }
    }, [isEdit, project, user]),
  })

  return form
}
