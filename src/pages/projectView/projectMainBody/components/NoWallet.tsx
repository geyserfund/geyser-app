import { Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { ButtonComponent } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { Project } from '../../../../types'

export const NoWallet = ({ project }: { project: Project }) => {
  const hasWallet = project.wallets.length > 0
  const navigate = useNavigate()

  const handleConnectNodeClick = () => {
    const nodeConfigurationPath = getPath('launchProjectWithNode', project.id)
    navigate(nodeConfigurationPath)
  }

  if (hasWallet) return null

  return (
    <VStack
      paddingLeft="25%"
      paddingRight="25%"
      paddingBottom="5%"
      paddingTop="5%"
      backgroundColor="brand.primary50"
    >
      <Text color={'brand.gray500'} paddingBottom="5%">
        Your project is not live yet as you have not added a wallet where you
        can receive funds. Head back to the project creation flow to add a
        wallet.
      </Text>

      <ButtonComponent primary={true} w="full" onClick={handleConnectNodeClick}>
        Connect Wallet
      </ButtonComponent>
    </VStack>
  )
}
