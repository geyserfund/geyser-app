import { BodyProps, Caption } from '../../../components/typography'
import { getDaysAgo } from '../../../utils'

interface TimeAgoProps extends BodyProps {
  date: string
}

export const TimeAgo = ({ date, ...rest }: TimeAgoProps) => {
  const timeAgo = getDaysAgo(date)
  return (
    <Caption color="neutral.700" {...rest}>
      {timeAgo ? `${timeAgo} ago` : 'Some time ago'}
    </Caption>
  )
}
