import { Avatar, AvatarBadge, Button, forwardRef, HStack, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { PiCastleTurret, PiList } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import { getPath } from '@/shared/constants'
import { GradientBorder } from '@/shared/molecules/GradientBorder'
import { GuardiansButtonBackgroundGradient, GuardiansButtonBackgroundGradientBright } from '@/shared/styles/custom'

import { useIsGuardiansPage } from '../../platformNavBarAtom'

export const ProfileNavButton = forwardRef<StackProps, 'button'>((props, ref) => {
  const { user } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  const isGuardiansPage = useIsGuardiansPage()

  return (
    <HStack position="relative" spacing={0}>
      {!isGuardiansPage && (
        <GradientBorder
          enable={true}
          gradientColor={GuardiansButtonBackgroundGradientBright}
          marginRight={{ base: '-16px', lg: '-20px' }}
        >
          <Button
            as={Link}
            to={getPath('guardians')}
            size={{ base: 'md', lg: 'lg' }}
            height={{ base: '30px', lg: '38px' }}
            variant="ghost"
            leftIcon={<PiCastleTurret fontSize={'24px'} />}
            background={GuardiansButtonBackgroundGradient}
            _hover={{}}
          />
        </GradientBorder>
      )}
      <HStack
        ref={ref}
        height={{ base: '40px', lg: '48px' }}
        width={{ base: '40px', lg: '48px' }}
        minWidth={{ base: '40px', lg: '48px' }}
        variant="outline"
        border="1px solid"
        borderColor="neutral1.6"
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
        {user.id ? (
          <Avatar src={user.imageUrl || ''} height={{ base: '40px', lg: '48px' }} width={{ base: '40px', lg: '48px' }}>
            {(myProjectActivityDot || followedActivityDot) && (
              <AvatarBadge
                placement="bottom-start"
                borderWidth="3px"
                borderColor="utils.pbg"
                bg="error.9"
                boxSize="16px"
              />
            )}
          </Avatar>
        ) : (
          <PiList fontSize={'24px'} />
        )}
      </HStack>
    </HStack>
  )
})
