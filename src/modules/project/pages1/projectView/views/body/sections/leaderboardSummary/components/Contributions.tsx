import { Button, HStack, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { contributionsAtom } from '@/modules/project/state/contributionsAtom'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { OrderByOptions, useProjectPageFundingTxQuery } from '@/types'

import {
  ContributionItem,
  ContributionItemSkeleton,
} from '../../../../leaderboard/views/contributions/components/ContributionItem'
import { NoContribution } from './NoContribution'

export const Contributions = () => {
  const { t } = useTranslation()

  const { isLoggedIn } = useAuthContext()
  const { project, loading: projectLoading } = useProjectAtom()

  const [contributions, setContributions] = useAtom(contributionsAtom)

  const { loading } = useProjectPageFundingTxQuery({
    variables: {
      input: {
        where: {
          projectId: project.id,
        },
        orderBy: {
          createdAt: OrderByOptions.Desc,
        },
        pagination: {
          take: isLoggedIn ? 5 : 6,
        },
      },
    },
    onCompleted(data) {
      if (data && data.fundingTxsGet?.fundingTxs) {
        setContributions(data.fundingTxsGet?.fundingTxs)
      }
    },
  })

  if (loading || projectLoading) {
    return <ContributionsSkeleton />
  }

  if (contributions.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack spacing={0} w="full" flex={1} overflowY={'auto'} justifyContent={'space-between'}>
      <VStack spacing={0} w="full">
        {contributions.map((contribution) => {
          return <ContributionItem contribution={contribution} key={contribution.id} />
        })}
      </VStack>

      <HStack w="full" justifyContent={'center'} spacing={1} paddingX={6} paddingY={2}>
        <Button
          as={Link}
          to={getPath('projectLeaderboard', project.name)}
          variant="soft"
          size="sm"
          minW={20}
          colorScheme="neutral1"
        >
          {t('See all')}
        </Button>
      </HStack>
    </VStack>
  )
}

const ContributionsSkeleton = () => {
  return (
    <VStack spacing={0} w="full" flex={1} justifyContent={'space-between'}>
      <VStack spacing={0} w="full">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return <ContributionItemSkeleton key={item} />
        })}
      </VStack>

      <HStack w="full" justifyContent={'center'} spacing={1} paddingX={6} paddingY={2}>
        <SkeletonLayout height="24px" width={24} />
      </HStack>
    </VStack>
  )
}
