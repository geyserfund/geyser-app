import { HStack, Switch, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { AlertDialogue } from '@/components/molecules/AlertDialogue'
import { ProjectStatusLabels, ProjectStatusTooltip, ProjectStatusTooltipRoles } from '@/components/ui'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { ProjectStatus } from '@/types'
import { isActive, useNotification } from '@/utils'

export type ProjectStatusVariables = {
  deactivate: boolean
}

export const ProjectStatusUpdate = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { project } = useProjectAtom()

  const { updateProject } = useProjectAPI()

  const isProjectInReview = project?.status === ProjectStatus.InReview
  const isProjectInReviewTooltip =
    ProjectStatusTooltip[ProjectStatusLabels.IN_REVIEW][ProjectStatusTooltipRoles.CREATOR]

  const statusConfirmModal = useModal()

  const handleDeactivate = () => {
    statusConfirmModal.onOpen()
  }

  const onSubmit = () => {
    if (project) {
      updateProject.execute({
        variables: {
          input: {
            projectId: Number(project.id),
            status: isActive(project.status) ? ProjectStatus.Inactive : ProjectStatus.Active,
          },
        },
        onCompleted() {
          statusConfirmModal.onClose()
          toast.success({
            title: 'Project updated successfully!',
          })
        },
        onError(error) {
          statusConfirmModal.onClose()
          toast.error({
            title: 'failed to update project',
            description: `${error}`,
          })
        },
      })
    }
  }

  if (!project) {
    return null
  }

  return (
    <>
      {project.status !== ProjectStatus.Deleted && (
        <CardLayout
          w="full"
          direction={{ base: 'column-reverse', lg: 'row' }}
          alignItems={{ base: 'start', lg: 'center' }}
          padding={4}
        >
          <VStack flex={1} alignItems={'start'}>
            <Body medium dark>
              {t('Project status')}
            </Body>
            <Body light>
              {t(
                'Deactivating your project would not allow others to fund your project, but your project will still be visible to everyone else. You will be able to re-activate your project at any time.',
              )}
            </Body>
          </VStack>
          <HStack justifyContent="stretch">
            <Tooltip label={isProjectInReview ? t(isProjectInReviewTooltip) : ''}>
              <Switch
                isChecked={isActive(project.status)}
                onChange={handleDeactivate}
                colorScheme="primary"
                isDisabled={isProjectInReview}
              />
            </Tooltip>
            <Text variant="body2" flexGrow={1}>
              {t('Active')}
            </Text>
          </HStack>
        </CardLayout>
      )}
      <AlertDialogue
        {...statusConfirmModal}
        title={t('Update project status')}
        description={
          project.status === ProjectStatus.Active
            ? t('Are you sure you want to deactivate the project ?')
            : t('Are you sure you want to activate the project?')
        }
        hasCancel
        positiveButtonProps={{
          children: 'Confirm',
          onClick: onSubmit,
        }}
      />
    </>
  )
}