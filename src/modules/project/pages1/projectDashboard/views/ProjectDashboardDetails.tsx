import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useProjectDetailsAPI } from '@/modules/project/API/useProjectDetailsAPI'
import { ProjectLinks } from '@/modules/project/forms/ProjectLinks'
import { ProjectRegion } from '@/modules/project/forms/ProjectRegion'
import { ProjectTagsCreateEdit } from '@/modules/project/forms/ProjectTagsCreateEdit'
import { projectFormErrorAtom } from '@/modules/project/state/projectFormAtom'
import { useNotification } from '@/utils'

import { ProjectCountryCodesThatAreRestricted } from '../../projectCreation/constants'
import { useProjectDetailsForm } from '../../projectCreation/hooks/useProjectDetailsForm'
import { DashboardLayout } from '../common'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../common/ProjectUnsavedModal'

export const ProjectDashboardDetails = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  useProjectDetailsAPI(true)

  const { project, isDirty, linkError, saveProject, saving, saveTags, setLinks, setTags, tags, updateProject } =
    useProjectDetailsForm()
  const setProjectFormError = useSetAtom(projectFormErrorAtom)

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: isDirty,
  })

  const onSubmit = async () => {
    if (!project.location || !project.location.country || !project.location.country.code) {
      toast.error({
        title: 'Please select a region',
        description: 'Project region is required to proceed',
      })
      setProjectFormError((prev) => ({ ...prev, location: 'Project region is required' }))
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
      await saveProject()
      await saveTags()
      toast.success({
        title: 'Project updated successfully!',
      })
    } catch (error) {
      toast.error({
        title: 'failed to update project',
      })
    }
  }

  const SaveButton = (props: ButtonProps) => {
    return (
      <Button size="lg" variant="solid" colorScheme="primary1" type="submit" isLoading={saving} {...props}>
        {t('Save')}
      </Button>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      style={{ flexGrow: 1, display: 'flex' }}
    >
      <DashboardLayout
        mobileTopNavRightComponent={<SaveButton />}
        deskTopBottomComponent={<SaveButton w="full" />}
        desktopTitle={t('Links & tags')}
        width="full"
      >
        <VStack w="100%" spacing={6} flexGrow={1} px={{ base: 0, lg: 6 }}>
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />

          <ProjectRegion location={project?.location} updateProject={updateProject} />

          <ProjectLinks links={(project?.links as string[]) || []} setLinks={setLinks} linkError={linkError} />
        </VStack>
        <ProjectUnsavedModal {...unsavedModal} />
      </DashboardLayout>
    </form>
  )
}
