import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ProjectValidations } from '../../../constants'
import { ProjectFragment } from '../../../types'

const schema = yup.object({
  description: yup
    .string()
    .required('You must write a project story.')
    .max(
      ProjectValidations.description.maxLength,
      `Project story should be shorter than ${ProjectValidations.description.maxLength} characters.`,
    ),
})

export const useProjectStoryForm = ({
  project,
}: {
  project?: ProjectFragment | null
}) => {
  const form = useForm<{ description: string }>({
    resolver: yupResolver(schema),
    values: useMemo(
      () =>
        project ? { description: project.description } : { description: '' },
      [project],
    ),
  })

  return form
}
