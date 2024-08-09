import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { useFundingFlowAtom } from '@/modules/project/funding/hooks/useFundingFlowAtom'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { ApolloErrors, getPath } from '@/shared/constants'
import { commaFormatted } from '@/utils'

import { FundingMaxLimit } from './components'
import { FundingErrorOccured } from './components/FundingErrorOccured'
import { FundingInactiveProject } from './components/FundingInactiveProject'
import { FundingMinLimit } from './components/FundingMinLimit'
import { FundingRewardsOutOfStock } from './components/FundingRewardsOutOfStock'
import { FundingWalletUnreachable } from './components/FundingWalletUnreachable'

export const PaymentFailed = () => {
  const { project } = useFundingFormAtom()
  const { error } = useFundingFlowAtom()

  if (!error || !project) return null

  const creatorId = project.owners?.[0]?.user.id

  const renderErrorPage = () => {
    switch (error.code) {
      case ApolloErrors.INVALID_FUNDING_AMOUNT: {
        if (error.maxAmount) {
          return <FundingMaxLimit amount={commaFormatted(error.maxAmount)} creatorId={creatorId} />
        }

        return <FundingMinLimit amount={commaFormatted(error.minAmount)} creatorId={creatorId} />
      }

      case ApolloErrors.WALLET_UNREACHABLE:
        return <FundingWalletUnreachable creatorId={creatorId} />
      case ApolloErrors.REWARD_OUT_OF_STOCK:
        return <FundingRewardsOutOfStock rewards={[]} creatorId={creatorId} projectName={project?.name || ''} />
      case ApolloErrors.NON_ACTIVE_PROJECT:
        return <FundingInactiveProject creatorId={creatorId} projectName={project?.name || ''} />
      default:
        return <FundingErrorOccured />
    }
  }

  return (
    <VStack w="full" spacing={6}>
      {renderErrorPage()}
      <Button
        as={Link}
        to={getPath('project', project.name)}
        size="lg"
        variant="surface"
        colorScheme="primary1"
        width="310px"
      >
        {t('Back to project')}
      </Button>
    </VStack>
  )
}
