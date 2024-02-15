import { Link, Text } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { GeyserFeedbackFromUrl } from '../../constants'

export const CommonFeedbackMessage = () => {
  return (
    <Text fontSize="20px">
      <Trans i18nKey={'If the problem persists let us know via. <1>telegram</1> or this <3>feedback form.</3>'}>
        {'If the problem persists let us know via. '}
        <Link key="telegram" href="https://t.me/+EZ5otIPhVcxhMmFk" isExternal>
          telegram
        </Link>
        {' or this '}
        <Link key="feedback" href={GeyserFeedbackFromUrl} isExternal>
          feedback form.
        </Link>
      </Trans>
    </Text>
  )
}
