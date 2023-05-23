import { useProjectState } from '../../../hooks/graphqlState'
import { useProjectTagsState } from '../../../hooks/graphqlState/useProjectTagsState'
import { useProjectLinksValidation } from '../../../hooks/validations'
import { useNotification } from '../../../utils'

type UseProjectDetailsFormProps = {
  projectId?: number | string
}

export const useProjectDetailsForm = ({
  projectId,
}: UseProjectDetailsFormProps) => {
  const { toast } = useNotification()

  const {
    loading: projectLoading,
    project,
    isDirty,
    updateProject,
    saveProject,
  } = useProjectState(
    projectId,
    {
      fetchPolicy: 'network-only',
      onError() {
        toast({
          title: 'Error fetching project',
          status: 'error',
        })
      },
    },
    'id',
  )

  const { setLinks, linkError } = useProjectLinksValidation({
    updateProject,
  })

  const {
    isDirty: areTagsDirty,
    saveTags,
    loading: tagsLoading,
    setTags,
    tags,
  } = useProjectTagsState({ project, updateProject })

  return {
    project,
    projectLoading,
    tagsLoading,
    updateProject,
    saveProject,
    saveTags,
    setTags,
    tags,
    isDirty: Boolean(areTagsDirty || isDirty),
    setLinks,
    linkError,
  }
}
