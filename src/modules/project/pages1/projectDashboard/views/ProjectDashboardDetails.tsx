import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ProjectLinks } from '@/modules/project/forms/ProjectLinks'
import { ProjectRegion } from '@/modules/project/forms/ProjectRegion'
import { ProjectTagsCreateEdit } from '@/modules/project/forms/ProjectTagsCreateEdit'
import { useNotification } from '@/utils'

import { useProjectDetailsForm } from '../../projectCreation/hooks/useProjectDetailsForm'
import { DashboardLayout } from '../common'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../common/ProjectUnsavedModal'

export const ProjectDashboardDetails = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { project, isDirty, linkError, saveProject, saving, saveTags, setLinks, setTags, tags, updateProject } =
    useProjectDetailsForm()

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: isDirty,
  })

  const onSubmit = async () => {
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
