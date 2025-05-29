import { Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { FeedbackUrl } from '../../../shared/constants'

export const CommonFeedbackMessage = ({ prefix }: { prefix?: string }) => {
  return (
    <Body textAlign="center">
      {prefix}
      <Trans
        i18nKey={'If the issue persists let us know through our <1>feedback form</1> or reach out on <3>Telegram</3>'}
      >
        {' If the issue persists let us know through our '}
        <Link key="feedback" href={FeedbackUrl} isExternal textDecoration="none" variant="body1" fontWeight="700">
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
          Telegram.
        </Link>
      </Trans>
    </Body>
  )
}
