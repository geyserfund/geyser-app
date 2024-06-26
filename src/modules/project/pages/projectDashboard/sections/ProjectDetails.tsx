import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useNotification } from '../../../../../utils'
import { useProjectContext } from '../../../context'
import { ProjectLinks } from '../../../forms/ProjectLinks'
import { ProjectRegion } from '../../../forms/ProjectRegion'
import { ProjectTagsCreateEdit } from '../../../forms/ProjectTagsCreateEdit'
import { useProjectDetailsForm } from '../../projectCreate/hooks/useProjectDetailsForm'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../components/ProjectUnsavedModal'

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
