import { Link, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { GeyserFeedbackFromUrl } from '../../constants'

export const CommonFeedbackMessage = () => {
  return (
    <Text variant="body1">
      <Trans
        i18nKey={'If the issue persists let us know through our <1>feedback form</3> or reach out on <3>Telegram</1>'}
      >
        {'If the issue persists let us know through our '}
        <Link
          key="feedback"
          href={GeyserFeedbackFromUrl}
          isExternal
          textDecoration="none"
          variant="body1"
          fontWeight="700"
        >
          feedback form
        </Link>
        {' or reach out on '}
        <Link
          key="telegram"
          href="https://t.me/+EZ5otIPhVcxhMmFk"
          isExternal
          textDecoration="none"
          variant="body1"
          fontWeight="700"
        >
          <Text variant="body1" fontWeight="700">
            Telegram.
          </Text>
        </Link>
      </Trans>
    </Text>
  )
}
