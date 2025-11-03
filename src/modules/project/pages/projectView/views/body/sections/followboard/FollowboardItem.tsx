import { HStack, SkeletonCircle, StackProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { ProfileText } from '@/shared/components/display/ProfileText'
import { SkeletonLayout } from '@/shared/components/layouts'
import { getPath } from '@/shared/constants/index.ts'
import { UserAvatar } from '@/shared/molecules/UserAvatar.tsx'
import { UserAvatarFragment } from '@/types'

type FollowboardItemProps = {
  follower: UserAvatarFragment
} & StackProps

export const FollowboardItem = ({ follower, ...props }: FollowboardItemProps) => {
  const { t } = useTranslation()

  const { user } = useAuthContext()

  const isViewer = user.id ? user.id === follower?.id : false

  return (
    <HStack
      as={Link}
      to={getPath('heroProfile', follower.heroId)}
      w="full"
      spacing={1}
      paddingX={6}
      paddingY={2}
      _hover={{ backgroundColor: 'neutral1.3', cursor: 'pointer' }}
      backgroundColor={isViewer ? 'indigoAlpha.2' : 'unset'}
      {...props}
    >
      <UserAvatar user={follower} id={follower.id} />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0}>
        <ProfileText guardian={follower?.guardianType} size="sm" bold dark>
          {follower?.username || t('Anonymous')}
        </ProfileText>
      </VStack>
    </HStack>
  )
}

export const FollowboardItemSkeleton = () => {
  return (
    <HStack w="full" spacing={1} paddingX={6} paddingY={2}>
      <SkeletonCircle size="40px" />
      <VStack flex={1} alignItems={'start'} justifyContent={'center'} spacing={0.5}>
        <SkeletonLayout height="16px" width="150px" />
      </VStack>
    </HStack>
  )
}
