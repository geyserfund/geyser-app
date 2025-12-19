import { Button, ButtonProps, HStack, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { contributionsAtom } from '@/modules/project/state/contributionsAtom'
import { isWidgetAtom } from '@/modules/project/state/widgetAtom.ts'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants'
import { getFullDomainUrl } from '@/shared/utils/project/getFullDomainUrl.ts'
import { OrderByOptions, useProjectPageContributionsGetQuery } from '@/types'

import {
  ContributionItem,
  ContributionItemSkeleton,
} from '../../../../leaderboard/views/contributions/components/ContributionItem'
import { NoContribution } from '../components/NoContribution.tsx'

export const Contributions = () => {
  const { t } = useTranslation()

  const { project, loading: projectLoading } = useProjectAtom()

  const isWidget = useAtomValue(isWidgetAtom)

  const [contributions, setContributions] = useAtom(contributionsAtom)

  const { loading, data } = useProjectPageContributionsGetQuery({
    skip: !project.id,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          projectId: project.id,
        },
        orderBy: {
          createdAt: OrderByOptions.Desc,
        },
        pagination: {
          take: 10,
        },
      },
    },
  })

  useEffect(() => {
    if (data?.contributionsGet?.contributions) {
      setContributions(data?.contributionsGet?.contributions)
    }
  }, [data, setContributions])

  if (loading || projectLoading) {
    return <ContributionsSkeleton />
  }

  if (contributions.length === 0) {
    return <NoContribution />
  }

  return (
    <VStack spacing={0} w="full" flex={1} overflowY={'hidden'} justifyContent={'space-between'}>
      <VStack spacing={0} w="full" flex={1} overflowY={'auto'}>
        {contributions.map((contribution) => {
          return <ContributionItem contribution={contribution} key={contribution.id} />
        })}
      </VStack>

      <HStack w="full" justifyContent={'center'} spacing={1} paddingX={6} paddingTop={2}>
        <Button
          {...(isWidget
            ? ({
                as: ChakraLink,
                href: getFullDomainUrl(getPath('projectLeaderboard', project.name)),
                isExternal: true,
              } as ButtonProps)
            : {
                as: Link,
                to: getPath('projectLeaderboard', project.name),
              })}
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
