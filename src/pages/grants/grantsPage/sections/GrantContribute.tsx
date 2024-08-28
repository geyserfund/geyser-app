import { Trans, useTranslation } from 'react-i18next'

import { Body, H3 } from '@/shared/components/typography'

import { CardLayout } from '../../../../shared/components/layouts'

export const GrantContribute = ({
  grantProjectName,
  grantTitle,
  grantHasVoting,
}: {
  grantProjectName?: string
  grantTitle: string
  grantHasVoting?: boolean
}) => {
  const { t } = useTranslation()
  return (
    <CardLayout noMobileBorder w="full" p={{ base: '10px', lg: '20px' }} alignItems="center">
      <H3 size="lg" alignSelf="start">
        {t('Contribute')}
      </H3>
      <Body>
        <Trans
          i18nKey={'Contribute directly to {{title}} Grant via QR code (lightning and onchain)'}
          values={{ title: grantTitle }}
        >
          {'Contribute directly to {{title}} Grant via QR code (lightning and onchain)'}
        </Trans>
        {'. '}
        {grantHasVoting
          ? t('Grant funds will be distributed based on community votes.')
          : t('Grant funds will be distributed by principled bitcoin board members.')}
      </Body>
    </CardLayout>
  )
}
