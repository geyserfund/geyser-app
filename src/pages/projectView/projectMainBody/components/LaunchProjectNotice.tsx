import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { getPath } from '../../../../constants'
import { ProjectFragment } from '../../../../types'

export const LaunchProjectNotice = ({
  project,
}: {
  project: ProjectFragment
}) => {
  const hasWallet = project.wallets.length > 0
  const navigate = useNavigate()

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWithNode', project.id)
    navigate(nodeConfigurationPath)
  }

  if (hasWallet) return null

  return (
    <CardLayout bgColor="primary.50" border="none" px="24%" py={6}>
      <Text textAlign="center" color="brand.gray500" mb={4}>
        Your project is not live yet as you have not finalized your creation
        flow. Head back to the creation flow to launch your project.
      </Text>

      <Button variant="primary" w="full" onClick={handleConnectNodeClick}>
        Connect Wallet
      </Button>
    </CardLayout>
  )
}
