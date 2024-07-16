import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { getPath } from '../../../../../../../shared/constants'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { useProjectAtom, useWalletAtom } from '../../../../../hooks/useProjectAtom'

export const FinalizeProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectAtom()
  const { wallet, loading } = useWalletAtom()
  const navigate = useNavigate()

  if (!project || !isProjectOwner) return null

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWithNode', project.id)
    navigate(nodeConfigurationPath)
  }

  if (wallet?.id || loading) return null

  return (
    <CardLayout mobileDense w="full">
      <Text variant="h3">{t('Finalize project')}</Text>

      <Text variant="body1">
        {t(
          'Your project is not live yet. Head back to the creation flow to finalize your project information and launch it!',
        )}
      </Text>

      <Button variant="primary" w="full" onClick={handleConnectNodeClick}>
        {t('Finalize project')}
      </Button>
    </CardLayout>
  )
}
