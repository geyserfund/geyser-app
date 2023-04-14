import { CloseIcon } from '@chakra-ui/icons'

import { IconButtonComponent, IconButtonComponentProps } from '../ui'

export const CloseIconButton = (
  props: Omit<IconButtonComponentProps, 'aria-label'>,
) => {
  return (
    <IconButtonComponent
      noBorder
      aria-label="close-icon"
      size="xs"
      _hover={{ backgroundColor: 'brand.bgLightRed' }}
      icon={<CloseIcon />}
      {...props}
    />
  )
}
