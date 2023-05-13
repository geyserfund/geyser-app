import { VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useProjectState } from '../../hooks/graphqlState'
import { useProjectTagsState } from '../../hooks/graphqlState/useProjectTagsState'
import { useProjectLinksValidation } from '../../hooks/validations'
import { toInt, useNotification } from '../../utils'
import { truthyFilter } from '../../utils/array'
import { ProjectRegion } from './components'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'
import { ProjectTagsCreateEdit } from './components/ProjectTagsCreateEdit'

export const ProjectAdditionalDetails = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast, unexpected } = useNotification()

  const {
    loading: projectLoading,
    project,
    updateProject,
    saveProject,
  } = useProjectState(
    toInt(params.projectId),
    {
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
    tags,
    setTags,
    saveTags,
    loading: tagsLoading,
  } = useProjectTagsState({
    project,
    updateProject,
  })

  const handleNext = async () => {
    if (linkError.includes(true)) {
      toast({
        status: 'warning',
        title: 'failed to update project',
        description: 'please enter a valid url for project links',
      })
      return
    }

    try {
      await saveTags()
      await saveProject()
      navigate(getPath('launchProjectStory', project?.id))
    } catch (e) {
      unexpected()
    }
  }

  const handleBack = () => {
    navigate(
      params.projectId
        ? `${getPath('privateProjectLaunch')}/${params.projectId}`
        : getPath('privateProjectLaunch'),
    )
  }

  if (projectLoading) {
    return <Loader />
  }

  const nextProps = {
    onClick: handleNext,
    isLoading: tagsLoading,
    isDisabled: tagsLoading,
  }

  return (
    <>
      <ProjectCreateLayout
        continueButton={<FormContinueButton flexGrow={1} {...nextProps} />}
        onBackClick={handleBack}
        title={
          <TitleWithProgressBar
            title="Links & tags"
            subtitle="Create a project"
            index={2}
            length={4}
          />
        }
      >
        <VStack spacing={6}>
          <ProjectLinks
            links={project?.links.filter(truthyFilter) || []}
            setLinks={setLinks}
            linkError={linkError}
          />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion
            location={project?.location}
            updateProject={updateProject}
          />

          <FormContinueButton width="100%" {...nextProps} />
        </VStack>
      </ProjectCreateLayout>
    </>
  )
}
