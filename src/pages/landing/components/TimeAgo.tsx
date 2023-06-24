import { useTranslation } from 'react-i18next'

import { BodyProps, Caption } from '../../../components/typography'
import { GetDaysAgo } from '../../../utils'

interface TimeAgoProps extends BodyProps {
  date: string
}

export const TimeAgo = ({ date, ...rest }: TimeAgoProps) => {
  const { t } = useTranslation()
  const timeAgo = GetDaysAgo(date)
  return (
    <Caption color="neutral.700" {...rest}>
      {timeAgo ? `${timeAgo} ${t('ago')}` : t('Some time ago')}
    </Caption>
  )
}
