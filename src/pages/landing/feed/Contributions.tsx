import { Divider, VStack } from '@chakra-ui/react'

import { AlertBox } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { ID } from '../../../constants/components'
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../graphql'
import { ScrollInvoke } from '../../../helpers'
import { useQueryWithPagination } from '../../../hooks'
import { FundingMethod, Project } from '../../../types/generated/graphql'
import {
  aggregateTransactions,
  FundingTxWithCount,
  useMobileMode,
} from '../../../utils'
import { ContributionActivityItem } from './components'

const itemLimit = 50

export const Contributions = () => {
  const isMobile = useMobileMode()
  const {
    isLoading,
    isLoadingMore,
    noMoreItems,
    data: contributions,
    error,
    fetchNext,
  } = useQueryWithPagination<FundingTxWithCount>({
    itemLimit,
    queryName: 'getFundingTxs',
    query: QUERY_GET_FUNDING_TXS_LANDING,
    resultMap: aggregateTransactions,
    where: {
      OR: [
        {
          method: null,
        },
        {
          NOT: {
            method: FundingMethod.PodcastKeysend,
          },
        },
      ],
    },
  })

  if (error) {
    return (
      <AlertBox
        height="200px"
        status="error"
        title="An error occurred while attempting to fetch contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  if (isLoading) {
    return <Loader width="100%" />
  }

  if (contributions?.length === 0) {
    return (
      <AlertBox
        height="200px"
        status="info"
        colorScheme={'gray'}
        title="There are currently no project contributions."
        message="Please try refreshing the page. You may also want to contact support if the problem persists."
      />
    )
  }

  return (
    <VStack flexDirection={'column'} spacing={6} width="full">
      <VStack alignItems={'center'} width="full" spacing={'12px'}>
        {contributions.map((contribution: FundingTxWithCount, index) => {
          if (contribution.sourceResource?.__typename === 'Project') {
            return (
              <>
                <ContributionActivityItem
                  key={contribution.id}
                  linkedProject={contribution.sourceResource as Project}
                  fundingTx={contribution}
                  count={contribution.count}
                  width={{
                    base: '100%',
                  }}
                  maxWidth="600px"
                />
                {index < contributions.length - 1 && (
                  <Divider
                    borderBottomWidth="2px"
                    maxWidth="600px"
                    color="brand.200"
                  />
                )}
              </>
            )
          }

          return null
        })}
      </VStack>

      <ScrollInvoke
        elementId={isMobile ? undefined : ID.root}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </VStack>
  )
}
