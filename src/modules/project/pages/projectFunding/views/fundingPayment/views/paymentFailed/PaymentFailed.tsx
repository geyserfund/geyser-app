import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingFlowErrorAtom } from '@/modules/project/funding/state/errorAtom.ts'
import { ApolloErrors, getPath } from '@/shared/constants'
import { commaFormatted } from '@/utils'

import { FundingErrorOccured } from './components/FundingErrorOccured.tsx'
import { FundingInactiveProject } from './components/FundingInactiveProject.tsx'
import { FundingMaxLimit } from './components/FundingMaxLimit.tsx'
import { FundingMinLimit } from './components/FundingMinLimit.tsx'
import { FundingRewardsOutOfStock } from './components/FundingRewardsOutOfStock.tsx'
import { FundingWalletUnreachable } from './components/FundingWalletUnreachable.tsx'

export const PaymentFailed = () => {
  const { project } = useFundingFormAtom()
  const error = useAtomValue(fundingFlowErrorAtom)

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
