import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../context'
import { useNotification } from '../../../utils'
import { ProjectRegion } from '../../projectCreate/components'
import { ProjectLinks } from '../../projectCreate/components/ProjectLinks'
import { ProjectTagsCreateEdit } from '../../projectCreate/components/ProjectTagsCreateEdit'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../../projectCreate/components/ProjectUnsavedModal'
import { useProjectDetailsForm } from '../../projectCreate/hooks/useProjectDetailsForm'

export const ProjectDetails = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project: contextProject } = useProjectContext()

  const {
    project,
    isDirty,
    linkError,
    projectLoading,
    saveProject,
    saveTags,
    setLinks,
    setTags,
    tags,
    tagsLoading,
    updateProject,
  } = useProjectDetailsForm({ projectId: contextProject?.id })

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: isDirty,
  })

  const onSubmit = async () => {
    if (linkError.includes(true)) {
      toast({
        status: 'warning',
        title: 'failed to update project',
        description: 'please enter a valid url for project links',
      })
      return
    }

    try {
      await saveProject()
      await saveTags()
      toast({
        status: 'success',
        title: 'Project updated successfully!',
      })
    } catch (error) {
      toast({
        status: 'error',
        title: 'failed to update project',
      })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      style={{ flexGrow: 1, display: 'flex' }}
    >
      <VStack w="100%" spacing={6} flexGrow={1}>
        <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

        <ProjectRegion location={project?.location} updateProject={updateProject} />

        <ProjectLinks links={(project?.links as string[]) || []} setLinks={setLinks} linkError={linkError} />

        <VStack w="100%" flexGrow={1} justifyContent="end">
          <Button isLoading={tagsLoading || projectLoading} variant="primary" w="full" type="submit">
            {t('Save')}
          </Button>
        </VStack>
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
