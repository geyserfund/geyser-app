import { Button, VStack } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { PiRocketLaunch } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'


import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'

import { useAuthContext } from '../../../../../context'
import { getPath } from '../../../../../shared/constants'
import { useModal } from '../../../../../shared/hooks'
import { CreateWalletInput } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { ProjectLaunchConfirmModal } from '../../../components/ProjectLaunchConfirmModal'
import { ProjectCreateCompleted } from '../components/ProjectCreateCompleted'

import Loader from '@/components/ui/Loader'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout.tsx'
import { ProjectState } from '@/modules/project/state/projectAtom.ts'


interface ProjectCreateCompletionPageProps {
  project?: ProjectState
  createWalletInput: CreateWalletInput | null
  isSubmitEnabled: boolean
  setReadyToLaunch: Dispatch<SetStateAction<boolean>>
}

export const ProjectCreateCompletionPage = ({
  createWalletInput,
  isSubmitEnabled,
  setReadyToLaunch,
}: ProjectCreateCompletionPageProps) => {
  const { t } = useTranslation()
  const { queryCurrentUser } = useAuthContext()

  const navigate = useNavigate()

  const toast = useNotification()

  const confirmModal = useModal()

  const { project, loading } = useProjectAtom()

  const { publishProject } = useProjectAPI()

  const handleBackClick = () => {
    setReadyToLaunch(false)
  }

  const onLaunchClick = async () => {
    if (!project) {
      return
    }

    publishProject.execute({
      variables: {
        input: { projectId: project?.id },
      },
      onCompleted() {
        toast.success({
          title: 'Project launched',
        })
        queryCurrentUser()
        navigate(getPath('projectLaunch', project?.name))
      },
      onError(error) {
        toast.error({
          title: 'Error launching project',
          description: `${error}`,
        })
      },
    })
  }

  const onSaveDraftClick = async () => {
    if (!project) {
      return
    }

    navigate(`${getPath('projectLaunchDraft', project.name)}`)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <ProjectCreateLayout
        onBackClick={handleBackClick}
        title={
          <TitleWithProgressBar
            hideSteps
            title={t('Launch project')}
            subtitle={t('You’re ready to launch!')}
            index={4}
            length={4}
          />
        }
      >
        <ProjectCreateCompleted>
          <VStack w="100%">
            {createWalletInput && (
              <Button
                variant="solid"
                colorScheme="primary1"
                w="full"
                leftIcon={<PiRocketLaunch />}
                onClick={confirmModal.onOpen}
                disabled={!isSubmitEnabled}
                isLoading={publishProject.loading}
              >
                {t('Launch Project')}
              </Button>
            )}
            <Button variant="outline" colorScheme="neutral1" w="full" onClick={onSaveDraftClick}>
              {t('Save As Draft')}
            </Button>
          </VStack>
        </ProjectCreateCompleted>
      </ProjectCreateLayout>
      <ProjectLaunchConfirmModal isLoading={publishProject.loading} onLaunchClick={onLaunchClick} {...confirmModal} />
    </>
  )
}
