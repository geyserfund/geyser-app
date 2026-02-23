import { useQuery } from '@apollo/client'
import { GridItem, HStack, Select, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import { ScrollInvoke } from '@/helpers/ScrollInvoke.tsx'
import { QUERY_PROJECT_REWARDS_CATALOG } from '@/modules/discovery/graphql/queries/rewardsQuery.ts'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ID } from '@/shared/constants/components/id.ts'
import { useListenerState } from '@/shared/hooks/useListenerState.tsx'
import {
  ProjectRewardsMostSoldRange,
  RewardForProductsPageFragment,
  useProjectRewardsMostSoldGetQuery,
} from '@/types/index.ts'
import { useMobileMode, useNotification } from '@/utils/index.ts'

import {
  TrendingRewardCard,
  TrendingRewardCardSkeleton,
} from '../../../mainView/defaultView/components/TrendingRewardCard.tsx'

type ProductsGridProps = {
  category?: string
}

type SortOption = 'most_sold' | 'most_recent'
type SortByApi = 'MOST_SOLD' | 'MOST_RECENT'

type ProjectRewardsCatalogRow = {
  id: bigint
  count: number
  projectReward: RewardForProductsPageFragment
}

type ProjectRewardsCatalogGetResponse = {
  projectRewardsCatalogGet: {
    rewards: ProjectRewardsCatalogRow[]
  }
}

type ProjectRewardsCatalogGetVariables = {
  input: {
    category?: string
    sortBy: SortByApi
    pagination: {
      take: number
      cursor?: {
        id: bigint
      }
    }
  }
}

const PAGE_SIZE = 24
const SORT_SEARCH_PARAM = 'sort'
const getSortByApi = (sort: SortOption): SortByApi => (sort === 'most_recent' ? 'MOST_RECENT' : 'MOST_SOLD')

export const ProductsGrid = ({ category }: ProductsGridProps) => {
  const isMobile = useMobileMode()
  const toast = useNotification()
  const isTrendingMode = !category
  const [searchParams, setSearchParams] = useSearchParams()
  const [rewards, setRewards] = useState<ProjectRewardsCatalogRow[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const [isLoadingMore, setIsLoadingMore] = useListenerState(false)
  const [noMoreItems, setNoMoreItems] = useListenerState(false)

  const sortFromUrl = searchParams.get(SORT_SEARCH_PARAM)
  const sort: SortOption = sortFromUrl === 'most_recent' ? 'most_recent' : 'most_sold'
  const sortBy = getSortByApi(sort)

  const { data: trendingData, loading: isTrendingLoading } = useProjectRewardsMostSoldGetQuery({
    fetchPolicy: 'network-only',
    skip: !isTrendingMode,
    variables: {
      input: {
        range: ProjectRewardsMostSoldRange.Quarter,
        take: PAGE_SIZE,
      },
    },
    onError() {
      toast.error({ title: t('Failed to fetch products') })
    },
  })
  const trendingRewards = trendingData?.projectRewardsMostSoldGet || []

  const { fetchMore } = useQuery<ProjectRewardsCatalogGetResponse, ProjectRewardsCatalogGetVariables>(
    QUERY_PROJECT_REWARDS_CATALOG,
    {
      skip: isTrendingMode,
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          category,
          sortBy,
          pagination: {
            take: PAGE_SIZE,
          },
        },
      },
      onCompleted(completedData) {
        if (isTrendingMode) {
          return
        }

        const firstPage = completedData.projectRewardsCatalogGet?.rewards || []
        setRewards(firstPage)
        setNoMoreItems(firstPage.length < PAGE_SIZE)
        setIsInitialLoading(false)
      },
      onError() {
        setIsInitialLoading(false)
        toast.error({ title: t('Failed to fetch products') })
      },
    },
  )

  useEffect(() => {
    if (isTrendingMode) {
      return
    }

    setIsInitialLoading(true)
    setNoMoreItems(false)
    setRewards([])
  }, [category, isTrendingMode, sort, setNoMoreItems])

  const handleSortChange = (nextSort: SortOption) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextSort === 'most_sold') {
      nextSearchParams.delete(SORT_SEARCH_PARAM)
    } else {
      nextSearchParams.set(SORT_SEARCH_PARAM, nextSort)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  const fetchNext = async () => {
    if (isTrendingMode) {
      return
    }

    if (isLoadingMore.current || noMoreItems.current) {
      return
    }

    const lastReward = rewards[rewards.length - 1]
    if (!lastReward) {
      setNoMoreItems(true)
      return
    }

    setIsLoadingMore(true)

    try {
      const { data: fetchMoreData } = await fetchMore({
        variables: {
          input: {
            category,
            sortBy,
            pagination: {
              take: PAGE_SIZE,
              cursor: {
                id: lastReward.id,
              },
            },
          },
        },
        updateQuery(previousResult) {
          return previousResult
        },
      })

      const nextPage = fetchMoreData?.projectRewardsCatalogGet?.rewards || []
      if (nextPage.length < PAGE_SIZE) {
        setNoMoreItems(true)
      }

      if (nextPage.length === 0) {
        return
      }

      setRewards((currentRewards) => [...currentRewards, ...nextPage])
    } catch {
      toast.error({ title: t('Failed to fetch products') })
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (isTrendingMode) {
    if (isTrendingLoading) {
      return <ProductsGridSkeleton />
    }

    if (!trendingRewards.length) {
      return <Body>{t('No products found')}</Body>
    }

    return (
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={{ base: 4, lg: 8 }}>
        {trendingRewards.map((reward) => {
          return (
            <GridItem key={reward.projectReward.id}>
              <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
            </GridItem>
          )
        })}
      </SimpleGrid>
    )
  }

  if (isInitialLoading) {
    return (
      <>
        <ProductSortSelect selectedSort={sort} onChange={handleSortChange} />
        <ProductsGridSkeleton />
      </>
    )
  }

  if (!rewards.length) {
    return (
      <>
        <ProductSortSelect selectedSort={sort} onChange={handleSortChange} />
        <Body>{t('No products found')}</Body>
      </>
    )
  }

  return (
    <>
      <ProductSortSelect selectedSort={sort} onChange={handleSortChange} />
      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacing={{ base: 4, lg: 8 }}>
        {rewards.map((reward) => {
          return (
            <GridItem key={reward.id}>
              <TrendingRewardCard reward={reward.projectReward} sold={reward.count} />
            </GridItem>
          )
        })}

        {isLoadingMore.current &&
          [1, 2, 3, 4].map((id) => (
            <GridItem key={`loading-${id}`}>
              <TrendingRewardCardSkeleton />
            </GridItem>
          ))}
      </SimpleGrid>

      <ScrollInvoke
        elementId={!isMobile ? ID.root : undefined}
        onScrollEnd={fetchNext}
        isLoading={isLoadingMore}
        noMoreItems={noMoreItems}
      />
    </>
  )
}

const ProductSortSelect = ({
  selectedSort,
  onChange,
}: {
  selectedSort: SortOption
  onChange: (nextSort: SortOption) => void
}) => {
  return (
    <HStack w="full" justifyContent="end" spacing={2}>
      <Body size="sm" light>
        {t('Sort by')}
      </Body>
      <Select
        size="sm"
        maxW="200px"
        borderColor="neutral1.6"
        value={selectedSort}
        onChange={(event) => onChange(event.target.value as SortOption)}
      >
        <option value="most_sold">{t('Most sold')}</option>
        <option value="most_recent">{t('Most recent')}</option>
      </Select>
    </HStack>
  )
}

const ProductsGridSkeleton = () => {
  return (
    <VStack w="full" spacing={4} alignItems="start">
      <SkeletonLayout w="200px" height="28px" />
      <Stack width="100%" direction={{ base: 'column', lg: 'row' }} spacing="20px">
        {[1, 2, 3, 4].map((id) => {
          return <TrendingRewardCardSkeleton key={id} />
        })}
      </Stack>
    </VStack>
  )
}
