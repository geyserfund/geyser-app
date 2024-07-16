import { Avatar, forwardRef, HStack, StackProps } from '@chakra-ui/react'
import { PiList } from 'react-icons/pi'

import { useAuthContext } from '../../../../context'

export const ProfileNavButton = forwardRef<StackProps, 'button'>((props, ref) => {
  const { user } = useAuthContext()
  return (
    <HStack
      ref={ref}
      height={{ base: '40px', lg: '48px' }}
      width={{ base: '40px', lg: '48px' }}
      variant="outline"
      border="1px solid"
      borderColor="neutral1.8"
      colorScheme="neutral1"
      _hover={{ backgroundColor: 'neutral1.3' }}
      paddingX={'0'}
      borderRadius={'50%'}
      justifyContent={'center'}
      alignItems={'center'}
      {...props}
    >
      {user.id ? (
        <Avatar src={user.imageUrl || ''} height={{ base: '40px', lg: '48px' }} width={{ base: '40px', lg: '48px' }} />
      ) : (
        <PiList fontSize={'24px'} />
      )}
    </HStack>
  )
})
