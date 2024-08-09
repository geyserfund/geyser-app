import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'

import { useAuthContext } from '../../../../../../../context'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { getPath } from '../../../../../../../shared/constants'
import { useModal } from '../../../../../../../shared/hooks'
import { ProjectStatus } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProjectLaunchConfirmModal } from '../../../../../components/ProjectLaunchConfirmModal'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'

export const LaunchProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const { wallet } = useWalletAtom()
  const confirmModal = useModal()

  const navigate = useNavigate()
  const { toast } = useNotification()

  const { queryCurrentUser } = useAuthContext()

  const { publishProject } = useProjectAPI()

  if (!project || !isProjectOwner) return null

  const handleLaunchClick = async () => {
    try {
      await publishProject.execute({
        variables: { input: { projectId: project.id } },
        onCompleted(data, clientOptions) {
          confirmModal.onClose()
          queryCurrentUser()
          navigate(getPath('projectLaunch', project?.name))
        },
      })
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `${error}`,
        status: 'error',
      })
    }
  }

  if (!wallet || project.status !== ProjectStatus.Draft) return null

  return (
    <>
      <CardLayout mobileDense w="full">
        <Text variant="h3">{t('Launch Project')}</Text>

        <Text variant="body1">{t('Your project is in draft mode. Click launch to get it out into the world!')}</Text>

        <Button variant="primary" w="full" isLoading={publishProject.loading} onClick={confirmModal.onOpen}>
          {t('Launch')}
        </Button>
      </CardLayout>
      <ProjectLaunchConfirmModal
        isLoading={publishProject.loading}
        onLaunchClick={handleLaunchClick}
        {...confirmModal}
      />
    </>
  )
}
