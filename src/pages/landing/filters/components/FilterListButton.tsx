import { CloseIcon } from '@chakra-ui/icons'
import { Badge, HStack } from '@chakra-ui/react'

import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'

interface FilterListItemProps {
  label: string
  value: any
  count?: number | string
  handleClick: (_: any) => void
  isActive?: boolean
}

export const FilterListItem = ({
  label,
  value,
  count,
  handleClick,
  isActive,
}: FilterListItemProps) => {
  return (
    <ButtonComponent
      size="sm"
      w="full"
      noBorder
      key={label}
      backgroundColor={isActive ? 'neutral.100' : 'white'}
      position="relative"
      onClick={() => handleClick(value)}
    >
      <HStack width="100%" justifyContent="start">
        <Body1 color="neutral.900" semiBold>
          {label}
        </Body1>
        <Badge rounded="full" color="neutral.900" backgroundColor="neutral.200">
          {count}
        </Badge>
      </HStack>
      {isActive && <CloseIcon fontSize={'10px'} />}
    </ButtonComponent>
  )
}
