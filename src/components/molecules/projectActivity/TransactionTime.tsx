import { useTranslation } from 'react-i18next'

import { GetDaysAgo } from '../../../utils'
import { BodyProps, Caption } from '../../typography'

export const TransactionTime = ({
  onChain,
  dateTime,
  ...rest
}: { onChain?: boolean; dateTime: number | string } & BodyProps) => {
  const timeAgo = GetDaysAgo(`${dateTime}`)
  const { t } = useTranslation()
  return (
    <Caption whiteSpace="nowrap" {...rest}>
      {`${onChain ? '⛓' : '⚡️'}`} {timeAgo ? `${timeAgo} ${t('ago')}` : t('Some time ago')}
    </Caption>
  )
}
