import { CloseIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/react'

import { Body1 } from '../../../../components/typography'
import { IconButtonComponent } from '../../../../components/ui'

interface TagComponentProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export const TagComponent = ({ icon, label, onClick }: TagComponentProps) => {
  return (
    <HStack
      backgroundColor="brand.neutral100"
      borderRadius="8px"
      paddingLeft="5px"
    >
      {icon}
      <Body1 semiBold color="brand.primary600" textTransform="lowercase">
        {label}
      </Body1>
      <IconButtonComponent
        aria-label="clear-tag-icon"
        size="xs"
        noBorder
        borderRadius="8px"
        icon={<CloseIcon />}
        onClick={onClick}
      />
    </HStack>
  )
}
