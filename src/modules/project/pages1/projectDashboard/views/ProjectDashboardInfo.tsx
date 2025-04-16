import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { ProjectForm } from '@/modules/project/forms/ProjectForm'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getPath } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { useNotification } from '@/utils'

import { useProjectForm } from '../../projectCreation/hooks/useProjectForm'
import { ProjectCreationVariables } from '../../projectCreation/types'
import { DashboardLayout } from '../common'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../common/ProjectUnsavedModal'
import { ProjectNameChangeConfirmModal } from '../components/ProjectNameChangeConfirmModal'

export const ProjectDashboardInfo = () => {
  const { t } = useTranslation()
  const toast = useNotification()
  const navigate = useNavigate()

  const nameChangeModal = useModal()

  const { project } = useProjectAtom()

  const { updateProject } = useProjectAPI()

  const form = useProjectForm({ isEdit: true, project })

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: form.formState.isDirty,
  })

  const handleUpdateProject = ({ email, ...values }: ProjectCreationVariables) => {
    updateProject.execute({
      variables: {
        input: {
          projectId: Number(project.id),
          ...values,
        },
      },
      onCompleted(data) {
        toast.success({
          title: 'Project updated successfully!',
          description: form.formState.dirtyFields.name
            ? 'Please wait while we redirect you to the new Project URL.'
            : '',
        })

        if (form.formState.dirtyFields.name) {
          setTimeout(() => {
            navigate(getPath('dashboardInfo', data.updateProject.name))
            navigate(0)
          }, 500)
          form.resetField('name', {
            defaultValue: data.updateProject.name,
            keepError: false,
            keepDirty: false,
          })
        }
      },
      onError(error) {
        toast.error({
          title: 'Project update failed!',
          description: `${error}`,
        })
      },
    })
  }

  const onSubmit = (values: ProjectCreationVariables) => {
    if (values.name !== project?.name) {
      nameChangeModal.onOpen()
      return
    }

    handleUpdateProject(values)
  }

  const SaveButton = (props: ButtonProps) => {
    return (
      <Button
        size="lg"
        variant="solid"
        colorScheme="primary1"
        type="submit"
        isLoading={updateProject.loading}
        {...props}
      >
        {t('Save')}
      </Button>
    )
  }

  return (
    <DashboardLayout
      as={'form'}
      onSubmit={form.handleSubmit(onSubmit)}
      mobileTopNavRightComponent={<SaveButton />}
      deskTopBottomComponent={<SaveButton w="full" />}
      desktopTitle={t('Project info')}
      width="full"
      overflow="hidden"
    >
      <VStack width="100%" alignItems="flex-start" spacing="24px" px={{ base: 0, lg: 6 }}>
        <ProjectForm form={form} isEdit />
      </VStack>
      <ProjectUnsavedModal {...unsavedModal} />
      <ProjectNameChangeConfirmModal {...nameChangeModal} onSave={() => handleUpdateProject(form.getValues())} />
    </DashboardLayout>
  )
}
