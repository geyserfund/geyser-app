import { Button, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../../../../../../../components/typography'
import { GeyserOnChainGuideUrl } from '../../../../../../../../../../../shared/constants'
import { useMobileMode } from '../../../../../../../../../../../utils'
import { FeedbackCard } from '../components/FeedbackCard'
import { useDownloadRefund } from '../hooks/useDownloadRefund'
import { useGoToNextOnChainStatus } from '../states/onChainStatus'

export const OnChainPrompt = () => {
  const { t } = useTranslation()

  const goToNextStatus = useGoToNextOnChainStatus()
  const isMobile = useMobileMode()

  const { downloadRefundJson, downloadRefundQr } = useDownloadRefund()

  const handleClick = () => {
    if (isMobile) {
      downloadRefundQr()
    } else {
      downloadRefundJson()
    }

    goToNextStatus()
  }

  return (
    <FeedbackCard variant="warning" title={t('Download refund file before proceeding')}>
      <Body1 paddingBottom={'20px'}>
        {t(
          'To keep Geyser KYC-free, on-chain transactions are swapped to Lightning in a non-custodial way. So, we require you to download a Refund File as backup in the rare case a payment fails.',
        )}{' '}
        <Link isExternal href={GeyserOnChainGuideUrl}>
          {t('More info')}.
        </Link>
      </Body1>

      <Body2>{t('By continuing, you acknowledge that you are responsible for claiming refunds.')}</Body2>
      <Button size="md" variant="primary" onClick={handleClick}>
        {t('Download & Continue')}
      </Button>
    </FeedbackCard>
  )
}
