import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../../../../constants'
import { useNotification } from '../../../../../utils'
import { ProjectLinks } from '../../../forms/ProjectLinks'
import { ProjectRegion } from '../../../forms/ProjectRegion'
import { ProjectTagsCreateEdit } from '../../../forms/ProjectTagsCreateEdit'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { useProjectDetailsForm } from '../hooks/useProjectDetailsForm'

export const ProjectDetails = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { toast, unexpected } = useNotification()

  const {
    updateProject,
    saveProject,
    saveTags,
    setLinks,
    setTags,
    project,
    tags,
    linkError,
    tagsLoading,
    projectLoading,
  } = useProjectDetailsForm({ projectId: params.projectId })

  const onSubmit = async () => {
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

  const onLeave = () => {
    navigate(project ? `${getPath('privateProjectLaunch')}/${project.id}` : getPath('privateProjectLaunch'))
  }

  const onBackClick = () => {
    onLeave()
  }

  const nextProps = {
    onClick: onSubmit,
    isLoading: tagsLoading || projectLoading,
    isDisabled: tagsLoading,
  }

  return (
    <>
      <ProjectCreateLayout
        continueButton={<FormContinueButton flexGrow={1} {...nextProps} />}
        onBackClick={onBackClick}
        title={<TitleWithProgressBar title={t('Links & tags')} subtitle={t('Create a project')} index={2} length={4} />}
      >
        <VStack spacing={6}>
          <ProjectLinks links={project?.links || []} setLinks={setLinks} linkError={linkError} />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion location={project?.location} updateProject={updateProject} />
        </VStack>
      </ProjectCreateLayout>
    </>
  )
}
