import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { LoadingPage } from '@/modules/general/loading/index.tsx'
import { noUrlRegex, validUrl } from '@/utils/index.ts'

import { useAuthContext } from '../../../../../context'
import { ProjectValidations } from '../../../../../shared/constants'
import { ProjectPageBodyFragment, ProjectPageDetailsFragment } from '../../../../../types'
import { ProjectCountryCodesThatAreRestricted } from '../constants.ts'
import { ProjectCreationVariables } from '../types'

const DEFAULT_VALUES: ProjectCreationVariables = {
  title: '',
  shortDescription: '',
  description: '',
  images: [],
  thumbnailImage: '',
  name: '',
  category: '',
  subCategory: '',
  location: '',
  links: [],
  tags: [],
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
    thumbnailImage: yup.string().required('Thumbnail image is a required field.'),
    images: yup
      .array()
      .of(yup.string())
      .required('Images are a required field.')
      .min(1, 'At least one image is required.'),
    category: yup
      .string()
      .required('Category is a required field.')
      .test('is-valid', 'We are unable to support projects from this country.', (value) => {
        if (ProjectCountryCodesThatAreRestricted.includes(value)) {
          return false
        }

        return true
      }),
    subCategory: yup.string().required('Subcategory is a required field.'),
    location: yup.string().required('Country is a required field.'),
    links: yup.array().of(yup.string().matches(validUrl, 'Please enter a valid URL')),
    tags: yup.array().of(yup.number()),
  })
  .required()

type UseProjectFormProps = {
  isEdit: boolean
  project: (ProjectPageBodyFragment & ProjectPageDetailsFragment) | undefined | null
  loading: boolean
}

export const useProjectForm = ({ isEdit, project, loading }: UseProjectFormProps) => {
  const { user } = useAuthContext()

  const form = useForm<ProjectCreationVariables>({
    resolver: yupResolver(schema) as any,
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: useMemo(() => {
      if (isEdit && project && !loading) {
        return {
          title: project.title,
          name: project.name,
          images: project.images || [],
          thumbnailImage: project.thumbnailImage || '',
          shortDescription: project.shortDescription || '',
          description: project.description || '',
          category: project.category || '',
          subCategory: project.subCategory || '',
          location: project.location?.country?.code || '',
          links: project.links || [],
          tags: project?.tags?.map((tag) => tag.id) || [],
        }
      }

      return { ...DEFAULT_VALUES, email: user.email || '' }
    }, [isEdit, project, user, loading]),
  })

  return form
}
