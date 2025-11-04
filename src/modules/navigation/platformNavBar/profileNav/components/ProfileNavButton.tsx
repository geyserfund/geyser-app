import { Avatar, AvatarBadge, Button, forwardRef, HStack, Icon, Image, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { PiList, PiUser } from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import {
  getPath,
  GuardiansJewelUrl,
  KingJewelUrl,
  KnightJewelUrl,
  LegendJewelUrl,
  WarriorJewelUrl,
} from '@/shared/constants'
import { GuardianType } from '@/types'

export const ProfileNavButton = forwardRef<StackProps, 'button'>((props, ref) => {
  const { user, isLoggedIn } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)

  const guardianData = guardianValues(user?.guardianType)

  return (
    <HStack position="relative" spacing={2}>
      {isLoggedIn && (
        <Button
          as={Link}
          to={getPath('userProfile', user.id)}
          variant="ghost"
          width="full"
          height="full"
          borderRadius="full"
          padding={0}
        >
          <ProfileAvatar
            src={user.imageUrl || ''}
            height={{ base: '36px', lg: '42px' }}
            width={{ base: '36px', lg: '42px' }}
            guardian={user.guardianType}
            icon={
              user.id ? (
                <Icon as={PiUser} color="neutral1.11" fontSize={'24px'} />
              ) : (
                <Icon as={PiList} color="neutral1.11" fontSize={'24px'} />
              )
            }
            backgroundColor="utils.pbg"
          >
            {user.guardianType && (
              <AvatarBadge placement="bottom-end" border="none">
                <Image
                  src={guardianData.jewel}
                  alt={'guardian jewel image'}
                  width={{ base: '20px', lg: '25px' }}
                  height={{ base: '20px', lg: '25px' }}
                />
              </AvatarBadge>
            )}
          </ProfileAvatar>
        </Button>
      )}
      <HStack
        ref={ref}
        data-testid="platform-dropdown-menu"
        height={{ base: '40px', lg: '46px' }}
        width={{ base: '40px', lg: '46px' }}
        minWidth={{ base: '40px', lg: '46px' }}
        variant="outline"
        backgroundColor="utils.pbg"
        zIndex={1}
        _hover={{
          backgroundColor: 'neutral1.3',
          cursor: 'pointer',
        }}
        paddingX={'0'}
        borderRadius={'50%'}
        justifyContent={'center'}
        alignItems={'center'}
        {...props}
      >
        <Avatar
          borderRadius="50%"
          icon={<Icon as={PiList} color="neutral1.11" fontSize={'24px'} />}
          height={{ base: '38px', lg: '46px' }}
          width={{ base: '38px', lg: '46px' }}
          backgroundColor="neutral1.3"
        >
          {myProjectActivityDot && (
            <AvatarBadge placement="bottom-end" borderWidth="3px" borderColor="utils.pbg" bg="error.9" boxSize="16px" />
          )}
        </Avatar>
      </HStack>
    </HStack>
  )
})

const guardianValues = (guardian?: GuardianType | null) => {
  switch (guardian) {
    case GuardianType.Warrior:
      return {
        jewel: WarriorJewelUrl,
        background: 'rubyAlpha.2',
        borderColor: 'ruby.8',
        path: getPath('guardiansCharacter', GuardianType.Warrior),
      }
    case GuardianType.Knight:
      return {
        jewel: KnightJewelUrl,
        background: 'violetAlpha.2',
        borderColor: 'violet.8',
        path: getPath('guardiansCharacter', GuardianType.Knight),
      }
    case GuardianType.King:
      return {
        jewel: KingJewelUrl,
        background: 'yellowAlpha.2',
        borderColor: 'yellow.8',
        path: getPath('guardiansCharacter', GuardianType.King),
      }
    case GuardianType.Legend:
      return {
        jewel: LegendJewelUrl,
        background: 'tealAlpha.2',
        borderColor: 'teal.8',
        path: getPath('guardiansCharacter', GuardianType.Legend),
      }
    default:
      return {
        jewel: GuardiansJewelUrl,
        background: 'utils.pbg',
        borderColor: 'neutral1.8',
        path: getPath('guardians'),
      }
  }
}
