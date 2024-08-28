import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { PiXCircle } from 'react-icons/pi'

export const CloseButton = (props: IconButtonProps) => {
  return <IconButton icon={<PiXCircle fontSize="20px" />} variant="ghost" colorScheme="neutral1" size="md" {...props} />
}
