import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  PROJECT_LAUNCH_PAYMENT_PROJECT_NAME,
  ProjectCreateStrategyCard,
} from '@/modules/project/pages1/projectCreation/views/ProjectCreationStrategy.tsx'
import { useProjectReset } from '@/modules/project/state/projectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { GuardiansButtonBackgroundGradient } from '@/shared/styles/custom.ts'
import { ProjectStatus } from '@/types/index.ts'

import { getPath, LaunchNowIllustrationUrl } from '../../../../../../../shared/constants'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'
import { FOLLOWERS_NEEDED } from '../components/PrelaunchFollowButton.tsx'

export const PreLaunchProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const resetProject = useProjectReset()
  const { loading } = useWalletAtom()
  const navigate = useNavigate()

  const launchRightAwayModal = useModal()

  const handlePayToLaunch = () => {
    resetProject()
    navigate(getPath('fundingLaunchPayment', PROJECT_LAUNCH_PAYMENT_PROJECT_NAME), {
      state: {
        launchProjectId: project?.id,
      },
    })
  }

  if (!project || !isProjectOwner) return null

  if (project.status !== ProjectStatus.PreLaunch) {
    return null
  }

  if (loading) return null

  if ((project.followersCount || 0) < FOLLOWERS_NEEDED) {
    return (
      <>
        <CardLayout
          flexDirection={'row'}
          justifyContent={'space-between'}
          w="full"
          background={GuardiansButtonBackgroundGradient}
        >
          <Body size="lg" bold dark>
            {t('Pay $21 to launch right away')}
          </Body>
          <Button variant="solid" colorScheme="primary1" onClick={launchRightAwayModal.onOpen}>
            {t('Launch project')}
          </Button>
        </CardLayout>
        <Modal size="lg" {...launchRightAwayModal}>
          <ProjectCreateStrategyCard
            image={LaunchNowIllustrationUrl}
            title={t('Launch Now')}
            subtitle={t('Pay $21 to go live and start receiving contributions right away')}
            why={t(
              "This small fee is a sign of commitment. It shows that you're serious about your project and ready to share it with the world. That means you can begin receiving support from contributors immediately.",
            )}
            howItWorks={t(
              'Pay $21 in Bitcoin or Fiat to launch your project. It helps us keep Geyser sustainable. Additionally, project gets mentioned in our newsletter with over 6k subscribers to help you get started.',
            )}
            noborder
            background="transparent"
          />
          <Button size="lg" width="100%" variant="solid" colorScheme="primary1" onClick={handlePayToLaunch}>
            {t('Launch project')}
          </Button>
        </Modal>
      </>
    )
  }

  return null
}
