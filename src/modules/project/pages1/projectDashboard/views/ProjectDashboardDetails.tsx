import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { useProjectDetailsAPI } from '@/modules/project/API/useProjectDetailsAPI'
import { SelectProjectCategory } from '@/modules/project/forms/ProjectCategory.tsx'
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
    if (!project.subCategory || !project.category) {
      toast.error({
        title: 'Please select a category',
        description: 'Project category is required to proceed',
      })
      setProjectFormError((prev) => ({
        ...prev,
        subCategory: 'Project category is required',
        category: 'Project category is required',
      }))
      return
    }

    if (project.location) {
      if (!project.location.country || !project.location.country.code) {
        toast.error({
          title: 'Please select a country',
          description: 'Project country is required to proceed',
        })
        setProjectFormError((prev) => ({ ...prev, location: 'Project country is required' }))
        return
      }

      if (
        project.location.country?.code &&
        ProjectCountryCodesThatAreRestricted.includes(project.location.country.code)
      ) {
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
          <SelectProjectCategory
            category={project?.category}
            subCategory={project?.subCategory}
            updateProject={updateProject}
          />
          <ProjectRegion location={project?.location} updateProject={updateProject} />
          <ProjectLinks links={(project?.links as string[]) || []} setLinks={setLinks} linkError={linkError} />
          <ProjectTagsCreateEdit tags={tags} updateTags={setTags} />
        </VStack>
        <ProjectUnsavedModal {...unsavedModal} />
      </DashboardLayout>
    </form>
  )
}
