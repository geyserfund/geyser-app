import { Duration } from 'luxon'
import { useEffect, useState } from 'react'

import { getCountDownDuration } from '../utils'

export const useCountdown = (endDate?: number) => {
  const [duration, setDuration] = useState(Duration.fromObject({ hours: 0 }))

  const handleCountdown = () => {
    setDuration(getCountDownDuration(endDate))
  }

  useEffect(() => {
    handleCountdown()
    const interval = setInterval(handleCountdown, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return duration.shiftTo('days', 'hours', 'minutes', 'seconds').toObject()
}
