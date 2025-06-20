import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  PROJECT_LAUNCH_PAYMENT_PROJECT_NAME,
  ProjectCreateStrategyCard,
} from '@/modules/project/pages1/projectCreation/views/old/ProjectCreationStrategy'
import { useProjectReset } from '@/modules/project/state/projectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { GuardiansButtonBackgroundGradient } from '@/shared/styles/custom.ts'
import { isClosed, isPrelaunch } from '@/utils/index.ts'

import { getPath, LaunchNowIllustrationUrl } from '../../../../../../../shared/constants'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'

export const PreLaunchProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner, loading: projectLoading } = useProjectAtom()
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

  if (!project || !isProjectOwner || loading || projectLoading || project.paidLaunch) return null

  if (isPrelaunch(project.status) || (isClosed(project.status) && !project.rejectionReason)) {
    return (
      <>
        <CardLayout
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          w="full"
          padding={'12px 24px'}
          background={GuardiansButtonBackgroundGradient}
        >
          <Body size="lg" bold dark>
            {t('Pay $21 to launch right away')}
          </Body>
          <Button size="lg" variant="surface" colorScheme="neutral1" onClick={launchRightAwayModal.onOpen}>
            {t('Launch project')}
          </Button>
        </CardLayout>
        <Modal size="lg" {...launchRightAwayModal}>
          <ProjectCreateStrategyCard
            image={LaunchNowIllustrationUrl}
            title={t('Go Live Now')}
            subtitle={t('Skip the challenge. Launch instantly for $21.')}
            body={t(
              "This small fee is a sign of commitment. It shows that you're serious about your project and ready to share it with the world. That means you can begin receiving support from contributors immediately.",
            )}
            points={[
              t('Seen in ‘Recently launched’ in Discovery page'),
              t('No pressure to raise a lot right away, go by your plan.'),
            ]}
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
