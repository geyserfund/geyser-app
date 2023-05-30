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
      variant="primary"
      size="xs"
      leftIcon={icon}
      rightIcon={<CloseIcon fontSize="10px" color="neutral.500" />}
      fontWeight="600"
      borderRadius="8px"
      color="primary.700"
      backgroundColor="neutral.100"
      textTransform="lowercase"
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
