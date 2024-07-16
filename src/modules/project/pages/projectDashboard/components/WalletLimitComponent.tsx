import { HStack, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../components/typography'
import { GeyserLightningWalletGuideLink } from '../../../../../shared/constants'
import { commaFormatted } from '../../../../../utils'
import { Limits } from '../../projectCreate/hooks/useWalletForm'
import { FeedbackCard } from '../../projectView/views/projectActivityPanel/screens/qr/views/onchain/components'

export const WalletLimitComponent = ({ limit }: { limit: Limits }) => {
  const { t } = useTranslation()
  return (
    <FeedbackCard title={t('Wallet limits')} alignItems={'start'}>
      <VStack alignItems={'start'}>
        <HStack>
          <Body1 color="neutral.600">{t('Minimum Receivable Limit')}:</Body1>
          <Body1 xBold color="neutral.900">
            {commaFormatted(limit.min || 0)} Sats
          </Body1>
        </HStack>
        <HStack>
          <Body1 color="neutral.600">{t('Maximum Receivable Limit')}:</Body1>
          <Body1 xBold color="neutral.900">
            {commaFormatted(limit.max || 0)} Sats
          </Body1>
        </HStack>
      </VStack>
      <Body2>
        {t(
          'These limits are established at the discretion of your Lightning wallet provider. To increase them consider:',
        )}
      </Body2>
      <UnorderedList>
        <ListItem>
          <Body2>
            {t('Reaching out to your wallet provider, as they might provide an option to increase these limits.')}
          </Body2>
        </ListItem>
        <ListItem>
          <Body2>
            <Trans i18nKey="Alternatively, you can explore other Lightning address providers and their respective limits through this link: <1>List of Lightning Wallets</1>">
              {
                'Alternatively, you can explore other Lightning address providers and their respective limits through this link: '
              }
              <Link href={GeyserLightningWalletGuideLink} isExternal>
                List of Lightning Wallets
              </Link>
            </Trans>
          </Body2>
        </ListItem>
      </UnorderedList>
    </FeedbackCard>
  )
}
