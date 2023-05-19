import { CloseIcon } from '@chakra-ui/icons'

import { ButtonComponent } from '../../../../components/ui'

interface TagComponentProps {
  icon: React.ReactElement
  label: string
  onClick: () => void
}

export const TagComponent = ({ icon, label, onClick }: TagComponentProps) => {
  return (
    <ButtonComponent
      noBorder
      size="xs"
      leftIcon={icon}
      rightIcon={<CloseIcon fontSize="10px" color="neutral.500" />}
      fontWeight="600"
      borderRadius="8px"
      color="primary.600"
      backgroundColor="neutral.100"
      textTransform="lowercase"
      onClick={onClick}
    >
      {label}
    </ButtonComponent>
  )
}
