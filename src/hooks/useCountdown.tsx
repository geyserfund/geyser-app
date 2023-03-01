import { Duration } from 'luxon'
import { useEffect, useState } from 'react'

import { getCountDownDuration } from '../utils'

export const useCountdown = (endDate?: number, updateEveryMs = 10000) => {
  const [duration, setDuration] = useState<Duration | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getCountDownDuration(endDate))
    }, updateEveryMs)
    return () => clearInterval(interval)
  }, [endDate])

  return duration || Duration.fromObject({ hours: 0 })
}
