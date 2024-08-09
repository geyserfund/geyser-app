import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

import { UpdateProjectInput } from '../../../types'
import { linkToHttps, toInt, useNotification } from '../../../utils'
import { useProjectAPI } from '../API/useProjectAPI'
import { projectAtom } from '../state/projectAtom'
import { diffProjectAtom, formProjectAtom, partialUpdateFormProjectAtom } from '../state/projectFormAtom'

export const useProjectState = () => {
  const baseProject = useAtomValue(projectAtom)
  const project = useAtomValue(formProjectAtom)
  const toast = useNotification()

  const updateFormProject = useSetAtom(partialUpdateFormProjectAtom)

  const [isDiff, diffKeys] = useAtomValue(diffProjectAtom)

  useEffect(() => {
    if (baseProject) {
      updateFormProject(baseProject)
    }
  }, [baseProject, updateFormProject])

  const { updateProject } = useProjectAPI()

  const saveProject = async () => {
    if (!isDiff || !diffKeys || !project) {
      return
    }

    const input = {} as UpdateProjectInput

    diffKeys.map((key) => {
      if (key === 'location') {
        input.countryCode = project.location?.country?.code
        input.region = project.location?.region
        return
      }

      if (key === 'links') {
        input.links = project.links.filter((link) => link).map((link) => linkToHttps(link))
        return
      }

      input[key as keyof UpdateProjectInput] = project[key]
    })
    input.projectId = toInt(project.id)

    await updateProject.execute({
      variables: { input },
      onError(error) {
        toast.error({
          title: 'failed to update project',
          description: `${error}`,
        })
      },
    })
  }

  return {
    saving: updateProject.loading,
    project,
    updateProject: updateFormProject,
    saveProject,
    isDirty: isDiff,
  }
}
