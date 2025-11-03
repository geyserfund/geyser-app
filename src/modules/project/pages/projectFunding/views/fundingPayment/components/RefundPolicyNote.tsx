import { Link } from '@chakra-ui/react'
import { Trans } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { GeyserOnChainFeesGuideUrl } from '../../../../../../../shared/constants'

export const RefundPolicyNote = () => {
  return (
    <Body size="xs">
      <Trans i18nKey={'For more info on Refund Policies and Fees <1>click here.</1>'}>
        {'For more info on Refund Policies and Fees '}
        <Link href={GeyserOnChainFeesGuideUrl} isExternal color="primary1.11">
          click here.
        </Link>
      </Trans>
    </Body>
  )
}
