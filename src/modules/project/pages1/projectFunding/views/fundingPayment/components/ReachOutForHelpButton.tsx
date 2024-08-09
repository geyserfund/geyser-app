import { Button, ButtonProps, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiChatCircle } from 'react-icons/pi'

import { GeyserTelegramUrl } from '../../../../../../../shared/constants'

export const ReachOutForHelpButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      href={GeyserTelegramUrl}
      target="_blank"
      variant="ghost"
      colorScheme="neutral1"
      leftIcon={<PiChatCircle aria-label="telegram" fontSize="20px" />}
      textDecoration="none"
      size="lg"
      {...props}
    >
      {t('Reach out for help')}
    </Button>
  )
}
