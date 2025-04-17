import { HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useGuardiansSoldCountSetAtom, useGuardianUsersSetAtom } from '@/modules/guardians/state/guardianUsers.ts'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import { H2 } from '@/shared/components/typography'
import { HeaderProps } from '@/shared/components/typography/Heading'
import { getPath } from '@/shared/constants'
import { GuardianType, useGuardianUsersGetQuery } from '@/types'

import { CharacterAssets } from '../../character/characterAssets'

export const GuardianUsers = ({
  guardian,
  size,
  titleProps,
}: {
  guardian: GuardianType
  size: 'lg' | 'md' | 'sm'
  titleProps?: HeaderProps
}) => {
  const setGuardianUsers = useGuardianUsersSetAtom(guardian)
  const setGuardiansSoldCount = useGuardiansSoldCountSetAtom(guardian)

  const guardianAsset = CharacterAssets[guardian]

  const { data, loading } = useGuardianUsersGetQuery({
    skip: !guardian,
    variables: {
      input: {
        where: {
          guardianType: guardian,
        },
      },
    },
    onCompleted(data) {
      setGuardianUsers(data?.guardianUsersGet?.guardianUsers[0]?.users || [])
      setGuardiansSoldCount(data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0)
    },
  })

  const users = data?.guardianUsersGet?.guardianUsers[0]?.users

  const soldCount = data?.guardianUsersGet?.guardianUsers[0]?.soldCount || 0
  const anonymousCount = soldCount > 0 ? soldCount - (users?.length || 0) : 0

  const heightWidthDesktop = size === 'lg' ? '96px' : size === 'md' ? '64 px' : '40px'
  const heightWidthMobile = size === 'lg' ? '80px' : size === 'md' ? '48px' : '32px'

  if (soldCount === 0 || loading) return null

  return (
    <HStack w="full" spacing={6} alignItems="flex-start">
      <Image
        src={guardianAsset.image}
        alt={guardianAsset.title}
        width={'260px'}
        height={'auto'}
        display={{ base: 'none', lg: 'block' }}
      />
      <VStack w="full" spacing={3} alignItems="flex-start">
        <H2 fontSize={{ base: '28', lg: '48px' }} fontWeight={600} color={`guardians.${guardian}.text`} {...titleProps}>
          {guardianAsset.title}s
        </H2>
        <HStack w="full" spacing="10px" overflowX="hidden" flexWrap="wrap">
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <ProfileAvatar
                as={Link}
                to={getPath('heroProfile', user.heroId)}
                width={{ base: heightWidthMobile, lg: heightWidthDesktop }}
                height={{ base: heightWidthMobile, lg: heightWidthDesktop }}
                guardian={guardian}
                size={size}
                key={user.userId}
                wrapperProps={{
                  padding: size === 'lg' ? '6px' : size === 'md' ? '4px' : '2px',
                }}
                src={user.imageUrl || ''}
              />
            ))}
          {anonymousCount > 0 &&
            Array.from({ length: anonymousCount }).map((_, i) => (
              <ProfileAvatar
                width={{ base: heightWidthMobile, lg: heightWidthDesktop }}
                height={{ base: heightWidthMobile, lg: heightWidthDesktop }}
                guardian={guardian}
                size={size}
                key={`anonymous-${i}`}
                src={guardianAsset.image}
              />
            ))}
        </HStack>
      </VStack>
    </HStack>
  )
}
