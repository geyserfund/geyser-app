import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/index.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useProjectFollowersQuery } from '@/types/generated/graphql.ts'

import { FollowboardItem } from './FollowboardItem.tsx'

export const FollowBoard = () => {
  const { project } = useProjectAtom()

  const { data, loading } = useProjectFollowersQuery({
    skip: !project.name,
    fetchPolicy: 'network-only',
    variables: {
      where: {
        name: project.name,
      },
    },
  })

  const followers = data?.projectGet?.followers || []

  if (loading) {
    return <SkeletonLayout height="44px" />
  }

  return (
    <CardLayout w="full" flex={1} dense py={6} minHeight="320px">
      <HStack w="full" px={6} height="44px">
        <Body size="2xl" bold dark>
          {t('Latest followers')}
        </Body>
      </HStack>
      <VStack spacing={0} w="full" flex={1} justifyContent={'space-between'} overflow={'hidden'}>
        <VStack spacing={0} w="full" flex={1} overflowY={'auto'}>
          {followers.map((follower, index) => {
            return <FollowboardItem follower={follower} key={follower.id} />
          })}
        </VStack>
      </VStack>
    </CardLayout>
  )
}
