import { HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { ScrollInvoke } from '@/helpers'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { contributionListAtom } from '@/modules/project/state/contributionsAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { usePaginationAtomHook } from '@/shared/hooks/utils/usePaginationAtomHook'
import { standardPadding } from '@/shared/styles'
import { OrderByOptions, ProjectContributionFragment, useProjectPageContributionsGetQuery } from '@/types'
import { useMobileMode } from '@/utils'

import { ContributeButton } from '../../../body/components'
import { NoContribution } from '../../../body/sections/leaderboardSummary/components/NoContribution'
import { ContributionItem, ContributionItemSkeleton } from './components/ContributionItem'

const MAXIMUM_CONTRIBUTIONS_ITEMS = 30

export const Contributions = () => {
  const isMobile = useMobileMode()

  const { project } = useProjectAtom()

  const [contributions, setContributions] = useAtom(contributionListAtom)

  const [isLoading, setIsLoading] = useState(true)

  const where = {
    projectId: project.id,
  }

  const orderBy = {
    createdAt: OrderByOptions.Desc,
  }

  const { fetchMore } = useProjectPageContributionsGetQuery({
    skip: !project.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: MAXIMUM_CONTRIBUTIONS_ITEMS,
        },
      },
    },
    onCompleted(data) {
      handleDataUpdate(data.contributionsGet?.contributions || [])
      setIsLoading(false)
    },
    onError(error) {
      setIsLoading(false)
    },
  })

  const { handleDataUpdate, isLoadingMore, noMoreItems, fetchNext } =
    usePaginationAtomHook<ProjectContributionFragment>({
      fetchMore,
      queryName: ['contributionsGet', 'contributions'],
      itemLimit: MAXIMUM_CONTRIBUTIONS_ITEMS,
      where,
      orderBy,
      setData: setContributions,
    })

  const id = 'contributions-scroll-container'

  if (isLoading) {
    return <ContributionsSkeleton />
  }

  return (
    <CardLayout w="full" h="full" dense noMobileBorder>
      {!isMobile && (
        <HStack w="full" paddingX={standardPadding} paddingTop={standardPadding} paddingBottom={0}>
          <ContributeButton w="full" />
        </HStack>
      )}
      <VStack h="full" id={id} overflowY={{ base: undefined, lg: 'auto' }}>
        {contributions.length === 0 ? (
          <NoContribution />
        ) : (
          contributions.map((contribution, index) => {
            return <ContributionItem key={contribution.id} contribution={contribution} paddingX={{ base: 0, lg: 6 }} />
          })
        )}
        <ScrollInvoke
          elementId={!isMobile ? id : undefined}
          onScrollEnd={fetchNext}
          isLoading={isLoadingMore}
          noMoreItems={noMoreItems}
        />
      </VStack>
    </CardLayout>
  )
}

const ContributionsSkeleton = () => {
  return (
    <CardLayout w="full" h="full" dense noMobileBorder>
      <VStack h="full" overflowY={{ base: undefined, lg: 'auto' }} paddingTop={standardPadding}>
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return <ContributionItemSkeleton key={item} />
        })}
      </VStack>
    </CardLayout>
  )
}
