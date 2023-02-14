import { GridItem, VStack } from '@chakra-ui/react'

import { ButtonComponent } from '../../components/ui'
import { useProjectContext } from '../../context'
import { useProjectLinksState } from '../../hooks/graphqlState'
import { useProjectTagsState } from '../../hooks/graphqlState/useProjectTagsState'
import { useNotification } from '../../utils'
import { ProjectRegion } from '../creation/projectCreate/components'
import { ProjectLinks } from '../creation/projectCreate/components/ProjectLinks'
import { ProjectTagsCreateEdit } from '../creation/projectCreate/components/ProjectTagsCreateEdit'
import { DashboardGridLayout } from './components/DashboardGridLayout'

export const ProjectDetails = () => {
  const { toast } = useNotification()

  const { project, updateProject, saveProject } = useProjectContext()

  const { links, setLinks, saveLinks, linkError } = useProjectLinksState({
    project,
    updateProject,
  })
  const { tags, setTags, saveTags } = useProjectTagsState({
    project,
    updateProject,
  })

  const handleNext = async () => {
    try {
      await saveLinks()
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

            <ProjectLinks {...{ links, setLinks, linkError }} />

            <ButtonComponent primary w="full" onClick={handleNext}>
              Save
            </ButtonComponent>
          </VStack>
        </VStack>
      </GridItem>
    </DashboardGridLayout>
  )
}
