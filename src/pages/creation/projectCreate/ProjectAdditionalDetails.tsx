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
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'
import { ProjectTagsCreateEdit } from './components/ProjectTagsCreateEdit'

export const ProjectAdditionalDetails = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast } = useNotification()

  const { loading, project, updateProject } = useProjectState(
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

  const { links, setLinks, handleLinks, linkError } = useProjectLinksState({
    project,
    updateProject,
  })
  const { tags, setTags } = useProjectTagsState({ project, updateProject })

  const handleNext = async () => {
    if (linkError.includes(true)) {
      toast({
        status: 'error',
        title: 'Invalid link provided',
        description: 'Please update the link before proceding',
      })
      return
    }

    await handleLinks()
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

          <ButtonComponent primary w="full" onClick={handleNext}>
            Continue
          </ButtonComponent>
        </VStack>
      </ProjectCreateLayout>
    </>
  )
}
