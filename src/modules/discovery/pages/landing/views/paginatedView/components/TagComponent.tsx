import { CloseIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

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
      rightIcon={<CloseIcon fontSize="10px" color="neutral1.11" />}
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
