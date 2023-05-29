import { Button, GridItem, VStack } from '@chakra-ui/react'

import { useProjectContext } from '../../context'
import { useNotification } from '../../utils'
import { ProjectRegion } from '../projectCreate/components'
import { ProjectLinks } from '../projectCreate/components/ProjectLinks'
import { ProjectTagsCreateEdit } from '../projectCreate/components/ProjectTagsCreateEdit'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from '../projectCreate/components/ProjectUnsavedModal'
import { useProjectDetailsForm } from '../projectCreate/hooks/useProjectDetailsForm'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectDetails = () => {
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
        title: 'succesfully updated project',
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
    >
      <DashboardGridLayout>
        <GridItem colSpan={6} display="flex" justifyContent="center">
          <VStack
            spacing="30px"
            width="100%"
            maxWidth="600px"
            marginBottom="40px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <VStack width="100%" alignItems="flex-start" spacing="24px">
              <ProjectRegion
                location={project?.location}
                updateProject={updateProject}
              />

              <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

              <ProjectLinks
                links={(project?.links as string[]) || []}
                setLinks={setLinks}
                linkError={linkError}
              />

              <Button
                isLoading={tagsLoading || projectLoading}
                variant="primary"
                w="full"
                type="submit"
              >
                Save
              </Button>
            </VStack>
          </VStack>
        </GridItem>
        <ProjectUnsavedModal {...unsavedModal} />
      </DashboardGridLayout>
    </form>
  )
}
