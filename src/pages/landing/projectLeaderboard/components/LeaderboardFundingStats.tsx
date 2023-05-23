import { HStack, Image, StackProps } from '@chakra-ui/react'

import { Caption, MonoBody1 } from '../../../../components/typography'
import { SatoshiUrl } from '../../../../constants'
import { Project } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'

interface LeaderboardFundingStatsProps extends StackProps {
  funders: Project['fundersCount']
  funded: Project['balance']
}

export const LeaderboardFundingStats = ({
  funders,
  funded,
  ...rest
}: LeaderboardFundingStatsProps) => {
  return (
    <HStack w="full" spacing="20px" {...rest}>
      <HStack spacing="4px">
        <MonoBody1 semiBold>{getShortAmountLabel(funders || 0)}</MonoBody1>
        <Caption>FUNDERS</Caption>
      </HStack>
      <HStack spacing="4px">
        <Image src={SatoshiUrl} height="18px" />
        <MonoBody1 semiBold>{getShortAmountLabel(funded)}</MonoBody1>
        <Caption>FUNDED</Caption>
      </HStack>
    </HStack>
  )
}
