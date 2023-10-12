import { HStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../components/layouts'
import { useProjectContext } from '../../../../context'
import { ContributeButton } from '../components'
import { ShareButton } from '../components/ShareButton'

export const ContributeShare = () => {
  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  return (
    <CardLayout mobileDense>
      <HStack w="full" flexWrap="wrap">
        <ContributeButton flex={1} />
        <ShareButton flex={1} />
      </HStack>
    </CardLayout>
  )
}
