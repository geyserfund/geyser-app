import { Divider, VStack } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'

import {
  CardLayout,
  CardLayoutProps,
  SkeletonLayout,
} from '../../../../../../components/layouts'
import { ID } from '../../../../../../constants/components'
import { QUERY_GET_FUNDING_TXS_LANDING } from '../../../../../../graphql'
import { ScrollInvoke } from '../../../../../../helpers'
import { useQueryWithPagination } from '../../../../../../hooks'
import { useFundSubscription } from '../../../../../../hooks/fundingFlow/useFundSubscription'
import { FundingTxFragment, ProjectFragment } from '../../../../../../types'
import {
  aggregateTransactions,
  FundingTxWithCount,
  useMobileMode,
  useNotification,
} from '../../../../../../utils'
import { ContributionActivityItem } from '../../../../../landing/feed/components'

const CONTRIBUTION_ITEM_LIMIT = 50

interface ProjectContributionListProps extends CardLayoutProps {
  project: ProjectFragment
}

export const ProjectContributionList = ({
  project,
  ...props
}: ProjectContributionListProps) => {
  const isMobile = useMobileMode()
  const { toast } = useNotification()

  const { startListening, stopListening, fundingActivity } =
    useFundSubscription({ projectId: project.id })

  const [aggregatedFundingTxs, setAggregatedFundingTxs] = useState<
    FundingTxWithCount[]
  >([])

  const id = ID.project.activity.contribution

  const fundingTxs = useQueryWithPagination<
    FundingTxFragment,
    FundingTxWithCount
  >({
    queryName: 'getFundingTxs',
    itemLimit: CONTRIBUTION_ITEM_LIMIT,
    query: QUERY_GET_FUNDING_TXS_LANDING,
    resultMap: aggregateTransactions,
    where: { projectId: Number(project.id) },
    options: {
      skip: !project.id,
      onError() {
        toast({
          status: 'error',
          title: 'Failed to fetch contributions',
        })
      },
    },
  })

  useEffect(() => {
    setAggregatedFundingTxs(fundingTxs.data)
  }, [fundingTxs.data])

  useEffect(() => {
    startListening()

    return () => {
      stopListening()
    }
  }, [startListening, stopListening])

  useEffect(() => {
    if (
      fundingActivity &&
      !aggregatedFundingTxs.some((txs) => txs.id === fundingActivity.id)
    ) {
      setAggregatedFundingTxs((current) => [fundingActivity, ...current])
    }
  }, [fundingActivity, aggregatedFundingTxs])

  return (
    <CardLayout
      id={id}
      noborder
      width="100%"
      overflow="auto"
      height={'100%'}
      py="0px"
      px={{ base: '10px', lg: '20px' }}
      {...props}
    >
      <VStack
        spacing={'15px'}
        marginTop="20px"
        paddingRight="10px"
        paddingBottom={{ base: '80px', lg: '20px' }}
      >
        {fundingTxs.isLoading ? (
          <ContributionListSkeleton />
        ) : (
          fundingTxs.data.map((fundingTx, index) => {
            return (
              <Fragment key={fundingTx.id}>
                <ContributionActivityItem
                  fundingTx={fundingTx}
                  count={fundingTx.count}
                />
                {index < fundingTxs.data.length - 1 && (
                  <Divider
                    borderBottomWidth="2px"
                    maxWidth="500px"
                    borderColor="neutral.200"
                  />
                )}
              </Fragment>
            )
          })
        )}

        <ScrollInvoke
          elementId={!isMobile ? id : undefined}
          onScrollEnd={fundingTxs.fetchNext}
          isLoading={fundingTxs.isLoadingMore}
          noMoreItems={fundingTxs.noMoreItems}
        />
      </VStack>
    </CardLayout>
  )
}

export const ContributionListSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((value, index) => {
        return (
          <Fragment key={value}>
            <SkeletonLayout width="100%" height="80px" />
            {index < 4 && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                borderColor="neutral.200"
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
