import { AvatarBadge, Button, forwardRef, HStack, Icon, Image, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { PiList, PiUser } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { ProfileAvatar } from '@/shared/components/display/ProfileAvatar'
import {
  getPath,
  GuardiansJewelUrl,
  KingJewelUrl,
  KnightJewelUrl,
  LegendJewelUrl,
  WarriorJewelUrl,
} from '@/shared/constants'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { GuardianType } from '@/types'

import { useIsGuardiansPage } from '../../platformNavBarAtom'

export const ProfileNavButton = forwardRef<StackProps, 'button'>((props, ref) => {
  const { user } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  const isGuardiansPage = useIsGuardiansPage()

  const guardianData = guardianValues(user?.guardianType)

  return (
    <HStack position="relative" spacing={0}>
      {!isGuardiansPage && (
        <GradientBorder
          enable={true}
          gradientColor={guardianData.borderColor}
          marginRight={{ base: '-16px', lg: '-20px' }}
        >
          <Button
            as={Link}
            to={guardianData.path}
            size={{ base: 'md', lg: 'lg' }}
            height={{ base: '30px', lg: '38px' }}
            paddingInlineStart={{ base: '6px !important', lg: '8px !important' }}
            variant="ghost"
            leftIcon={
              <Image
                src={guardianData.jewel}
                width={{ base: '20px', lg: '30px' }}
                height={{ base: '20px', lg: '30px' }}
              />
            }
            background={guardianData.background}
            _hover={{}}
          />
        </GradientBorder>
      )}
      <HStack
        ref={ref}
        height={{ base: '40px', lg: '46px' }}
        width={{ base: '40px', lg: '48px' }}
        minWidth={{ base: '40px', lg: '48px' }}
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
        <ProfileAvatar
          src={user.imageUrl || ''}
          height={{ base: '38px', lg: '46px' }}
          width={{ base: '38px', lg: '46px' }}
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
          {(myProjectActivityDot || followedActivityDot) && (
            <AvatarBadge
              placement="bottom-start"
              borderWidth="3px"
              borderColor="utils.pbg"
              bg="error.9"
              boxSize="16px"
            />
          )}
        </ProfileAvatar>
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
        background: 'neutralAlpha.2',
        borderColor: 'neutral1.8',
        path: getPath('guardians'),
      }
  }
}
