import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { getPath } from '../../../../../../../constants'
import { useProjectContext } from '../../../../../../../context'

export const FinalizeProjectNotice = () => {
  const { t } = useTranslation()

  const { project, isProjectOwner } = useProjectContext()
  const navigate = useNavigate()

  if (!project || !isProjectOwner) return null

  const hasWallet = project.wallets.length > 0

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWithNode', project.id)
    navigate(nodeConfigurationPath)
  }

  if (hasWallet) return null

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
