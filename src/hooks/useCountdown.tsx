import { Duration } from 'luxon'
import { useCallback, useEffect, useState } from 'react'

import { getCountDownDuration } from '../utils'

export const useCountdown = (endDate?: number) => {
  const [duration, setDuration] = useState(Duration.fromObject({ hours: 0 }))

  const handleCountdown = useCallback(() => {
    setDuration(getCountDownDuration(endDate))
  }, [setDuration, endDate])

  useEffect(() => {
    handleCountdown()
    const interval = setInterval(handleCountdown, 1000)
    return () => clearInterval(interval)
  }, [handleCountdown])

  return duration.shiftTo('days', 'hours', 'minutes', 'seconds').toObject()
}
