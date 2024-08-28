import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'

import { useAuthContext } from '../../../../../../../context'
import { getPath } from '../../../../../../../shared/constants'
import { useModal } from '../../../../../../../shared/hooks'
import { ProjectStatus } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { ProjectLaunchConfirmModal } from '../../../../../components/ProjectLaunchConfirmModal'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'

export const LaunchProjectButton = () => {
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
      <Button variant="solid" colorScheme="primary1" isLoading={publishProject.loading} onClick={confirmModal.onOpen}>
        {t('Publish')}
      </Button>

      <ProjectLaunchConfirmModal
        isLoading={publishProject.loading}
        onLaunchClick={handleLaunchClick}
        {...confirmModal}
      />
    </>
  )
}
