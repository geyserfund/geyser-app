import { Avatar, Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import { PiList } from 'react-icons/pi'

import { useAuthContext } from '../../../../context'

export const ProfileNavButton = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const { user } = useAuthContext()
  return (
    <Button
      ref={ref}
      size="lg"
      height="48px"
      variant="outline"
      colorScheme="neutral1"
      padding={0}
      borderRadius={'50%'}
      {...props}
    >
      {user.id ? <Avatar src={user.imageUrl || ''} /> : <PiList fontSize={'24px'} />}
    </Button>
  )
})
