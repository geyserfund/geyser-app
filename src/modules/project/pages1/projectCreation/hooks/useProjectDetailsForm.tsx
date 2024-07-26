import { useProjectLinksValidation } from '../../../../../shared/hooks/validations'
import { useProjectState } from '../../../hooks/useProjectState'
import { useProjectTagsState } from './useProjectTagsState'

export const useProjectDetailsForm = () => {
  const { project, isDirty, updateProject, saveProject } = useProjectState()

  const { setLinks, linkError } = useProjectLinksValidation({
    updateProject,
  })

  const { isDirty: areTagsDirty, saveTags, loading: tagsLoading, setTags, tags } = useProjectTagsState()

  return {
    project,
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
