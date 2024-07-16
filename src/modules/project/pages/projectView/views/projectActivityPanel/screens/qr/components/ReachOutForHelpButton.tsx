import { Button, ButtonProps, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaTelegramPlane } from 'react-icons/fa'

import { GeyserTelegramUrl } from '../../../../../../../../../shared/constants'

export const ReachOutForHelpButton = (props: ButtonProps) => {
  const { t } = useTranslation()
  return (
    <Button
      as={Link}
      href={GeyserTelegramUrl}
      target="_blank"
      variant="outline"
      width="100%"
      leftIcon={<FaTelegramPlane aria-label="telegram" fontSize="20px" />}
      textDecoration="none"
      {...props}
    >
      {t('Reach out for help')}
    </Button>
  )
}
