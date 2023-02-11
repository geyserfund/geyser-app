import { VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router'

import { ButtonComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { getPath } from '../../../constants'
import {
  useProjectLinksState,
  useProjectState,
} from '../../../hooks/graphqlState'
import { useProjectTagsState } from '../../../hooks/graphqlState/useProjectTagsState'
import { toInt, useNotification } from '../../../utils'
import { ProjectRegion } from './components'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'
import { ProjectTagsCreateEdit } from './components/ProjectTagsCreateEdit'

export const ProjectAdditionalDetails = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast } = useNotification()

  const { loading, project, updateProject, saveProject } = useProjectState(
    toInt(params.projectId),
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

  const { links, setLinks, saveLinks, linkError } = useProjectLinksState({
    project,
    updateProject,
  })
  const { tags, setTags, saveTags } = useProjectTagsState({
    project,
    updateProject,
  })

  const handleNext = async () => {
    await saveLinks()
    await saveTags()
    await saveProject()
    navigate(getPath('launchProjectWithNode', params.projectId || ''))
  }

  const handleBack = () => {
    navigate(`/launch/${params.projectId}`)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <ProjectCreateLayout
        handleBack={handleBack}
        title="Project details"
        subtitle="Step 2 of 3"
        percentage={67}
      >
        <VStack width="100%" alignItems="flex-start" spacing="40px">
          <ProjectLinks
            links={links}
            setLinks={setLinks}
            linkError={linkError}
          />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion
            location={project.location}
            updateProject={updateProject}
          />

          <ButtonComponent primary w="full" onClick={handleNext}>
            Continue
          </ButtonComponent>
        </VStack>
      </ProjectCreateLayout>
    </>
  )
}
