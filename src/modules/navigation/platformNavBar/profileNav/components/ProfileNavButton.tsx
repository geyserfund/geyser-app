import { Avatar, AvatarBadge, forwardRef, HStack, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { PiList } from 'react-icons/pi'

import { useAuthContext } from '@/context'
import { followedActivityDotAtom, myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'

export const ProfileNavButton = forwardRef<StackProps, 'button'>((props, ref) => {
  const { user } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const followedActivityDot = useAtomValue(followedActivityDotAtom)

  return (
    <HStack
      ref={ref}
      height={{ base: '40px', lg: '48px' }}
      width={{ base: '40px', lg: '48px' }}
      variant="outline"
      border="1px solid"
      borderColor="neutral1.6"
      _hover={{
        backgroundColor: 'neutral1.3',
        cursor: 'pointer',
        opacity: user.id ? 0.7 : 1,
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
  )
})
