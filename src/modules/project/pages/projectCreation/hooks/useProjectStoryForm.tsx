import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ProjectState } from '@/modules/project/state/projectAtom'

import { ProjectValidations } from '../../../../../shared/constants'

const schema = yup.object({
  description: yup
    .string()
    .min(ProjectValidations.description.minLength, 'Project story should be longer than 210 characters.')
    .max(
      ProjectValidations.description.maxLength,
      `Project story should be shorter than ${ProjectValidations.description.maxLength} characters.`,
    )
    .required('You must write a project story.'),
})

export const useProjectStoryForm = ({ project }: { project?: ProjectState | null }) => {
  const form = useForm<{ description: string }>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    values: useMemo(() => ({ description: project?.description || '' }), [project]),
  })

  return form
}
