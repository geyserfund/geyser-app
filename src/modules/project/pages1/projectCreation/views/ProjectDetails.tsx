import { VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectDetailsAPI } from '@/modules/project/API/useProjectDetailsAPI'
import { SelectProjectCategory } from '@/modules/project/forms/ProjectCategory.tsx'
import { projectFormErrorAtom } from '@/modules/project/state/projectFormAtom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { getPath } from '../../../../../shared/constants'
import { useNotification } from '../../../../../utils'
import { ProjectLinks } from '../../../forms/ProjectLinks'
import { ProjectRegion } from '../../../forms/ProjectRegion'
import { ProjectTagsCreateEdit } from '../../../forms/ProjectTagsCreateEdit'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { ProjectCountryCodesThatAreRestricted } from '../constants'
import { useProjectDetailsForm } from '../hooks/useProjectDetailsForm'

export const ProjectDetails = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const toast = useNotification()

  const { queryProjectDetails } = useProjectDetailsAPI(true)

  const { updateProject, saveProject, saveTags, setLinks, setTags, project, tags, linkError, tagsLoading } =
    useProjectDetailsForm()

  const setProjectFormError = useSetAtom(projectFormErrorAtom)

  const onSubmit = async () => {
    if (!project) {
      return
    }

    if (!project.category) {
      toast.error({
        title: 'Please select a category',
        description: 'Project category is required to proceed',
      })
      setProjectFormError((prev) => ({ ...prev, category: 'Project category is required' }))
      return
    }

    if (!project.subCategory) {
      toast.error({
        title: 'Please select a subcategory',
        description: 'Project subcategory is required to proceed',
      })
      setProjectFormError((prev) => ({ ...prev, subCategory: 'Project subcategory is required' }))
      return
    }

    if (!project.location || !project.location.country || !project.location.country.code) {
      toast.error({
        title: 'Please select a country',
        description: 'Project country is required to proceed',
      })
      setProjectFormError((prev) => ({ ...prev, location: 'Project country is required' }))
      return
    }

    if (ProjectCountryCodesThatAreRestricted.includes(project.location.country.code)) {
      toast.error({
        title: 'Country not supported',
        description: 'We are not able to support projects from this country',
      })
      setProjectFormError((prev) => ({ ...prev, location: 'Country not supported' }))
      return
    }

    if (linkError.includes(true)) {
      toast.warning({
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
      toast.unexpected()
    }
  }

  const onLeave = () => {
    navigate(project ? `${getPath('launchProject', project.id)}` : getPath('launch'))
  }

  const onBackClick = () => {
    onLeave()
  }

  const nextProps = {
    onClick: onSubmit,
    isLoading: tagsLoading || queryProjectDetails.loading,
    isDisabled: tagsLoading,
  }

  return (
    <>
      <ProjectCreateLayout
        continueButton={<FormContinueButton flexGrow={1} {...nextProps} />}
        onBackClick={onBackClick}
        title={<TitleWithProgressBar title={t('Links & tags')} subtitle={t('Create a project')} index={2} length={5} />}
      >
        <VStack spacing={6}>
          <SelectProjectCategory
            category={project?.category}
            subCategory={project?.subCategory}
            updateProject={updateProject}
          />
          <ProjectLinks links={project?.links || []} setLinks={setLinks} linkError={linkError} />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion location={project?.location} updateProject={updateProject} />
        </VStack>
      </ProjectCreateLayout>
    </>
  )
}
