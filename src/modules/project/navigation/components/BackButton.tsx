import { Button, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link, To } from 'react-router-dom'

interface BackButtonProps {
  to: To
  ariaLabel?: string
  height?: string | number
}

export const BackButton = ({ to, ariaLabel = t('Back'), height }: BackButtonProps) => {
  return (
    <Button
      as={Link}
      to={to}
      variant="outline"
      colorScheme="neutral1"
      leftIcon={<Icon as={PiArrowLeft} fontSize="20px" />} // Adjusted icon size
      aria-label={ariaLabel}
      size="sm" // Match size with other elements if needed
      height={height}
    >
      {t('Back')}
    </Button>
  )
}
