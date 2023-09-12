import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ProjectValidations } from '../../../constants'
import { useAuthContext } from '../../../context'
import { ProjectFragment } from '../../../types'
import { ProjectCreationVariables } from '../types'

const DEFAULT_VALUES: ProjectCreationVariables = {
  title: '',
  shortDescription: '',
  description: '',
  image: '',
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
      ),
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
      ),
    title: yup
      .string()
      .required('Title is a required field.')
      .max(
        ProjectValidations.title.maxLength,
        `Title should be shorter than ${ProjectValidations.title.maxLength} characters.`,
      ),
    email: yup.string().required('Email address is a required field.'),
  })
  .required()

type UseProjectFormProps = {
  isEdit: boolean
  project: ProjectFragment | undefined | null
}

export const useProjectForm = ({ isEdit, project }: UseProjectFormProps) => {
  const { user } = useAuthContext()

  const form = useForm<ProjectCreationVariables>({
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES,
    values: useMemo(() => {
      if (isEdit && project) {
        return {
          title: project.title,
          name: project.name,
          image: project.image || '',
          thumbnailImage: project.thumbnailImage || '',
          shortDescription: project.shortDescription,
          description: project.description,
          email: user.email || '',
        }
      }

      return { ...DEFAULT_VALUES, email: user.email || '' }
    }, [isEdit, project, user]),
  })

  return form
}
