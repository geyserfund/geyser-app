import { Button, Divider, HStack, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsExclamationSquareFill } from 'react-icons/bs'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { Body1, Body2, H3 } from '../../../../../../../../../../../components/typography'
import { useCustomTheme } from '../../../../../../../../../../../utils'

export default function DownloadRefundFilePrompt() {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()
  return (
    <CardLayout padding="20px" borderColor="secondary.orange" spacing="10px">
      <HStack spacing="10px">
        <BsExclamationSquareFill size="24px" fill={colors.secondary.orange} />
        <H3>{t('Download refund file before proceeding')}</H3>
      </HStack>
      <Divider />
      <Body1 paddingBottom={'20px'}>
        {t(
          'To keep Geyser KYC-free, on-chain transactions are swapped to Lightning in a non-custodial way. So, we require you to download a Refund File as backup in the rare case a payment fails.',
        )}
        <Link isExternal href="">
          <strong>{t('More info')}.</strong>
        </Link>
      </Body1>

      <Body2>{t('By continuing, you acknowledge that you are responsible for claiming refunds.')}</Body2>
      <Button size="md" onClick={() => {}} variant="primary">
        {t('Download & Continue')}
      </Button>
    </CardLayout>
  )
}
