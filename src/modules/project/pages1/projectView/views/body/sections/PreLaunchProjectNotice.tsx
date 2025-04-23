import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography'
import { GuardiansButtonBackgroundGradient } from '@/shared/styles/custom.ts'
import { ProjectStatus } from '@/types/index.ts'

import { getPath } from '../../../../../../../shared/constants'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'
import { FOLLOWERS_NEEDED } from '../components/PrelaunchFollowButton.tsx'

export const PreLaunchProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const { loading } = useWalletAtom()
  const navigate = useNavigate()

  if (!project || !isProjectOwner) return null

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWallet', project.id)
    navigate(nodeConfigurationPath)
  }

  if (project.status !== ProjectStatus.PreLaunch) {
    return null
  }

  if (loading) return null

  if (project.followersCount && project.followersCount < FOLLOWERS_NEEDED) {
    return (
      <CardLayout
        flexDirection={'row'}
        justifyContent={'space-between'}
        mobileDense
        w="full"
        background={GuardiansButtonBackgroundGradient}
      >
        <Body size="lg" bold dark>
          {t('Pay $21 to launch right away')}
        </Body>
        <Button variant="solid" colorScheme="primary1" onClick={handleConnectNodeClick}>
          {t('Launch project')}
        </Button>
      </CardLayout>
    )
  }

  return (
    <CardLayout mobileDense w="full" background={GuardiansButtonBackgroundGradient}>
      <HStack justifyContent={'space-between'}>
        <Body size="lg" bold dark>
          {t('Pay $21 to launch right away')}
        </Body>
        <Button variant="solid" colorScheme="primary1" onClick={handleConnectNodeClick}>
          {t('Finalize & Launch')}
        </Button>
      </HStack>
      <Body>
        {t('You have 21 people that care about your project. They’ll receive an email as soon as you go live.')}
      </Body>

      <Body>
        {t(
          'Next, you’ll need to your wallet information to start receiving funds, and verify your ID to start receiving funds in fiat. Good luck!',
        )}
      </Body>
    </CardLayout>
  )
}
