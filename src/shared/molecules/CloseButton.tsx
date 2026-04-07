import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiXCircle } from 'react-icons/pi'

export const CloseButton = (props: IconButtonProps) => {
  const { 'aria-label': ariaLabel, ...restProps } = props

  return (
    <IconButton
      {...restProps}
      aria-label={ariaLabel ?? t('Close')}
      icon={<PiXCircle fontSize="20px" />}
      variant="ghost"
      colorScheme="neutral1"
      size="md"
    />
  )
}
