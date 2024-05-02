import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '../../../../../components/layouts'
import { Body2 } from '../../../../../components/typography'

export const SafeToDeleteNotice = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout {...props}>
      <Body2 xBold>
        {t('The Refund file is safe to delete, as your transaction has been successfully processed.')}
      </Body2>
    </CardLayout>
  )
}
