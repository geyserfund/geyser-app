import { VStack } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router'

import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar'
import Loader from '../../components/ui/Loader'
import { getPath } from '../../constants'
import { useNotification } from '../../utils'
import { ProjectRegion } from './components'
import { FormContinueButton } from './components/FormContinueButton'
import { ProjectCreateLayout } from './components/ProjectCreateLayout'
import { ProjectLinks } from './components/ProjectLinks'
import { ProjectTagsCreateEdit } from './components/ProjectTagsCreateEdit'
import {
  ProjectUnsavedModal,
  useProjectUnsavedModal,
} from './components/ProjectUnsavedModal'
import { useProjectDetailsForm } from './hooks/useProjectDetailsForm'

export const ProjectDetails = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast, unexpected } = useNotification()

  const {
    project,
    isDirty,
    linkError,
    projectLoading,
    updateProject,
    saveProject,
    saveTags,
    setLinks,
    setTags,
    tags,
    tagsLoading,
  } = useProjectDetailsForm({ projectId: params.projectId })

  const handleNext = async () => {
    if (!project) {
      return
    }

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

      navigate(getPath('launchProjectStory', project.id))
    } catch (e) {
      unexpected()
    }
  }

  const navigateBack = () => {
    navigate(
      project
        ? `${getPath('privateProjectLaunch')}/${project.id}`
        : getPath('privateProjectLaunch'),
    )
  }

  const unsavedModal = useProjectUnsavedModal({
    onLeave: navigateBack,
    hasUnsaved: isDirty,
  })

  const handleBack = () => {
    if (isDirty) {
      return unsavedModal.onOpen()
    }

    navigateBack()
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
            links={project?.links || []}
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
      <ProjectUnsavedModal {...unsavedModal} />
    </>
  )
}
