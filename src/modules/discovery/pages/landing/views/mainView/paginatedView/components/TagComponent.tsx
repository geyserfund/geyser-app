import { Button, Icon } from '@chakra-ui/react'
import { PiX } from 'react-icons/pi'

interface TagComponentProps {
  icon: React.ReactElement
  label: string
  onClick: () => void
}

export const TagComponent = ({ icon, label, onClick }: TagComponentProps) => {
  return (
    <Button
      variant="surface"
      colorScheme="primary1"
      leftIcon={icon}
      rightIcon={<Icon as={PiX} fontSize="10px" color="neutral1.11" />}
      fontWeight="600"
      borderRadius="8px"
      color="primary1.11"
      textTransform="lowercase"
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
