import { HStack, VStack } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'

import { SatoshiIcon } from '../../../../components/icons'
import { Caption, MonoBody1 } from '../../../../components/typography'
import { useAuthContext } from '../../../../context'
import { colors } from '../../../../styles'
import { ProjectFragment } from '../../../../types'
import { getShortAmountLabel } from '../../../../utils'
import { getProjectBalance } from '../../../../utils/helpers'

export const ProjectFundingSummary = ({
  project,
}: {
  project: Pick<
    ProjectFragment,
    'balance' | 'fundersCount' | 'funders' | 'name' | 'balance' | 'wallets'
  >
}) => {
  const { user } = useAuthContext()
  const currentFund = project.funders.find(
    (funder) => funder?.user?.id === user.id,
  )

  const projectBalance = getProjectBalance(project)
  return (
    <HStack
      height="72px"
      w="100%"
      borderRadius="4px"
      backgroundColor="brand.neutral100"
      spacing={{
        base: '10px',
      }}
      justifyContent="center"
    >
      <VStack spacing="0px">
        <HStack spacing="5px">
          <BsHeartFill color={colors.neutral500} />
          <MonoBody1>
            {getShortAmountLabel(project.fundersCount || 0)}
          </MonoBody1>
        </HStack>
        <Caption>CONTRIBUTORS</Caption>
      </VStack>
      <VStack spacing="0px">
        <HStack spacing="5px">
          <SatoshiIcon scale={0.7} />
          <MonoBody1>{getShortAmountLabel(projectBalance)}</MonoBody1>
        </HStack>
        <Caption>TOTAL CONTRIBUTED</Caption>
      </VStack>
      {currentFund && (
        <VStack spacing="0px">
          <HStack spacing="5px">
            <SatoshiIcon scale={0.7} />
            <MonoBody1>
              {getShortAmountLabel(currentFund.amountFunded || 0)}
            </MonoBody1>
          </HStack>

          <Caption>YOU CONTRIBUTED</Caption>
        </VStack>
      )}
    </HStack>
  )
}
