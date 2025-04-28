import { Button, ButtonProps, Icon, IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useMobileMode } from '@/utils/index.ts'

type BackButtonProps = {
  iconOnly?: boolean
  iconOnlyOnMobile?: boolean
} & ButtonProps

export const BackButton = ({ iconOnly, iconOnlyOnMobile, ...props }: BackButtonProps) => {
  const navigate = useNavigate()

  const isMobile = useMobileMode()

  if (iconOnly || (isMobile && iconOnlyOnMobile)) {
    return (
      <IconButton
        aria-label="Back"
        variant="ghost"
        size="lg"
        icon={<Icon as={PiArrowLeft} />}
        onClick={() => navigate(-1)}
        {...props}
      />
    )
  }

  return (
    <Button
      onClick={() => navigate(-1)}
      size="lg"
      variant="ghost"
      colorScheme="neutral1"
      leftIcon={<Icon as={PiArrowLeft} />}
      {...props}
    >
      {t('Back')}
    </Button>
  )
}
