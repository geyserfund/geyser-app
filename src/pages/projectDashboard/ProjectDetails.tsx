import { GridItem, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import { ButtonComponent } from '../../components/ui'
import { useProjectContext } from '../../context'
import { useProjectTagsState } from '../../hooks/graphqlState/useProjectTagsState'
import { useProjectLinksValidation } from '../../hooks/validations'
import { useNotification } from '../../utils'
import { ProjectRegion } from '../creation/projectCreate/components'
import { ProjectLinks } from '../creation/projectCreate/components/ProjectLinks'
import { ProjectTagsCreateEdit } from '../creation/projectCreate/components/ProjectTagsCreateEdit'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectDetails = () => {
  const { toast } = useNotification()

  const [saving, setSaving] = useState(false)
  const { project, updateProject, saveProject } = useProjectContext()

  const { setLinks, linkError } = useProjectLinksValidation({
    updateProject,
  })
  const { tags, setTags, saveTags } = useProjectTagsState({
    project,
    updateProject,
  })

  const handleNext = async () => {
    setSaving(true)
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

    setSaving(false)
  }

  return (
    <DashboardGridLayout>
      <GridItem colSpan={6} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="600px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack width="100%" alignItems="flex-start" spacing="24px">
            <ProjectRegion
              location={project.location}
              updateProject={updateProject}
            />

            <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

            <ProjectLinks
              {...{ links: project.links as string[], setLinks, linkError }}
            />

            <ButtonComponent
              isLoading={saving}
              primary
              w="full"
              onClick={handleNext}
            >
              Save
            </ButtonComponent>
          </VStack>
        </VStack>
      </GridItem>
    </DashboardGridLayout>
  )
}
