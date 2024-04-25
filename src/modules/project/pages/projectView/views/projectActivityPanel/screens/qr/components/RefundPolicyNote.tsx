import { Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { Body2 } from '../../../../../../../../../components/typography'
import { GeyserFAQUrl } from '../../../../../../../../../constants'

export const RefundPolicyNote = () => {
  return (
    <Body2 pt="10px">
      <Trans i18nKey={'For more info on Refund Policies and Fees <1>click here.</1>'}>
        {'For more info on Refund Policies and Fees '}
        <Link href={GeyserFAQUrl} isExternal>
          click here.
        </Link>
      </Trans>
    </Body2>
  )
}