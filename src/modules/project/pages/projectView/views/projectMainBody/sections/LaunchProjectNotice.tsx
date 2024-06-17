import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../../../../constants'
import { useAuthContext } from '../../../../../../../context'
import { useModal } from '../../../../../../../hooks'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { ProjectStatus, useProjectPublishMutation } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProjectLaunchConfirmModal } from '../../../../../components/ProjectLaunchConfirmModal'
import { useProjectContext } from '../../../../../context'

export const LaunchProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner, refetch } = useProjectContext()
  const confirmModal = useModal()

  const navigate = useNavigate()
  const { toast } = useNotification()

  const { queryCurrentUser } = useAuthContext()

  const [publishProject, { loading: isUpdateStatusLoading }] = useProjectPublishMutation({
    onCompleted() {
      refetch()
      queryCurrentUser()
    },
  })

  if (!project || !isProjectOwner) return null

  const hasWallet = project.wallets.length > 0

  const handleLaunchClick = async () => {
    try {
      await publishProject({ variables: { input: { projectId: project.id } } })
      confirmModal.onClose()
      navigate(getPath('projectLaunch', project?.name))
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  if (!hasWallet || project.status !== ProjectStatus.Draft) return null

  return (
    <>
      <CardLayout mobileDense w="full">
        <Text variant="h3">{t('Launch Project')}</Text>

        <Text variant="body1">{t('Your project is in draft mode. Click launch to get it out into the world!')}</Text>

        <Button variant="primary" w="full" isLoading={isUpdateStatusLoading} onClick={confirmModal.onOpen}>
          {t('Launch')}
        </Button>
      </CardLayout>
      <ProjectLaunchConfirmModal
        isLoading={isUpdateStatusLoading}
        onLaunchClick={handleLaunchClick}
        {...confirmModal}
      />
    </>
  )
}
