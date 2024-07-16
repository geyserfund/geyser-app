import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { ApolloErrors } from '../../../../../../../../../../shared/constants'
import { useFundingContext } from '../../../../../../../../context'
import { ReachOutForHelpButton } from '../../components'
import { FundingMaxLimit } from './components'
import { FundingErrorOccured } from './components/FundingErrorOccured'
import { FundingInactiveProject } from './components/FundingInactiveProject'
import { FundingMinLimit } from './components/FundingMinLimit'
import { FundingRewardsOutOfStock } from './components/FundingRewardsOutOfStock'
import { FundingWalletUnreachable } from './components/FundingWalletUnreachable'

export const FundingError = ({ onCloseClick }: { onCloseClick: () => void }) => {
  const { t } = useTranslation()

  const { error, project } = useFundingContext()

  if (!error || !project) return null

  const creatorId = project.owners?.[0]?.user.id

  const renderErrorPage = () => {
    switch (error.code) {
      case ApolloErrors.INVALID_FUNDING_AMOUNT: {
        if (error.maxAmount) {
          return <FundingMaxLimit amount={error.maxAmount} creatorId={creatorId} />
        }

        return <FundingMinLimit amount={error.minAmount} creatorId={creatorId} />
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
    <VStack h="100%" justifyContent="space-between">
      {renderErrorPage()}
      <VStack w="full">
        <ReachOutForHelpButton />

        <Button variant="secondary" size="sm" w="full" onClick={onCloseClick}>
          {t('Back to project')}
        </Button>
      </VStack>
    </VStack>
  )
}
