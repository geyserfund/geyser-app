import { BodyProps, Caption } from '../../../components/typography'
import { GetDaysAgo } from '../../../utils'

interface TimeAgoProps extends BodyProps {
  date: string
}

export const TimeAgo = ({ date, ...rest }: TimeAgoProps) => {
  const timeAgo = GetDaysAgo(date)
  return (
    <Caption color="neutral.700" {...rest}>
      {timeAgo ? `${timeAgo} ago` : 'Some time ago'}
    </Caption>
  )
}
