import { useTranslation } from 'react-i18next'

import { Body1 } from '../../../components/typography'
import { useModal } from '../../../hooks/useModal'
import { FailedToConnectAccount } from './FailedToConnectAccount'

export const NostrHelpModal = (props: ReturnType<typeof useModal>) => {
  const { t } = useTranslation()
  return (
    <FailedToConnectAccount title="No extension detected" {...props}>
      <Body1 semiBold color="neutral.1000">
        {t('We could not detect a Nostr extension like Alby or Flamingo.')}
      </Body1>
    </FailedToConnectAccount>
  )
}
