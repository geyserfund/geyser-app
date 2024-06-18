import { useTranslation } from 'react-i18next'

import { Body2 } from '../../../../../components/typography'
import { CardLayout, CardLayoutProps } from '../../../../../shared/components/layouts'

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
