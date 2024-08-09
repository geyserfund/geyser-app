import { useTranslation } from 'react-i18next'

import { BodyProps } from '@/components/typography'
import { Body } from '@/shared/components/typography'

import { GetDaysAgo } from '../../utils'

interface TimeAgoProps extends BodyProps {
  date: string
}

export const TimeAgo = ({ date, ...rest }: TimeAgoProps) => {
  const { t } = useTranslation()
  const timeAgo = GetDaysAgo(date)
  return (
    <Body size="xs" muted {...rest}>
      {timeAgo ? `${timeAgo} ${t('ago')}` : t('Some time ago')}
    </Body>
  )
}
