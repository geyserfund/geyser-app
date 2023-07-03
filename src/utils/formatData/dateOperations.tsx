import { DateTime, Duration, Interval } from 'luxon'
import { useTranslation } from 'react-i18next'

export const GetDaysAgo = (date: string) => {
  const { t } = useTranslation()
  const dateTime = DateTime.fromMillis(parseInt(date, 10))
  const currentDateTime = DateTime.now()

  const i = Interval.fromDateTimes(dateTime, currentDateTime)
  const days = Math.floor(i.length('days'))

  if (days === 1) {
    return t('a day')
  }

  if (days > 1) {
    return `${days} days`
  }

  if (days < 1) {
    const hours = Math.floor(i.length('hours'))
    if (hours === 1) {
      return t('an hour')
    }

    if (hours < 1) {
      const minutes = Math.floor(i.length('minutes'))
      if (hours === 1) {
        return t('a minute')
      }

      if (minutes < 1) {
        return t('a few seconds')
      }

      return `${minutes} ${t('minutes')}`
    }

    return `${hours} ${t('hours')}`
  }
}

export const getDaysLeft = (date: string) => {
  const dateTime = DateTime.fromMillis(parseInt(date, 10))
  const currentDateTime = DateTime.now()

  const i = Interval.fromDateTimes(currentDateTime, dateTime)

  const days = Math.floor(i.length('days'))
  if (days === 1) {
    return 'a day'
  }

  if (days < 1) {
    const hours = Math.floor(i.length('hours'))
    if (hours === 1) {
      return 'an hour'
    }

    if (hours < 1) {
      const minutes = Math.floor(i.length('minutes'))
      if (minutes === 1) {
        return 'a minute'
      }

      if (minutes < 1) {
        return 'just now'
      }

      return `${minutes} minutes`
    }

    return `${hours} hours`
  }

  return `${days} days`
}

export const formatDaysLeft = (date: string) => {
  const dateTime = DateTime.fromMillis(parseInt(date, 10))
  const currentDateTime = DateTime.now()
  const format = (amount: number, label: string) => ({ amount, label })

  if (currentDateTime > dateTime) {
    return format(0, 'days')
  }

  const i = Interval.fromDateTimes(currentDateTime, dateTime)

  const days = Math.floor(i.length('days'))

  if (days === 1) {
    return format(1, 'day')
  }

  if (days < 1) {
    const hours = Math.floor(i.length('hours'))
    if (hours === 1) {
      return format(1, 'hour')
    }

    if (hours < 1) {
      const minutes = Math.floor(i.length('minutes'))
      if (minutes === 1) {
        return format(1, 'minute')
      }

      if (minutes < 1) {
        return format(1, 'minute')
      }

      return format(minutes, 'minutes')
    }

    return format(hours, 'hours')
  }

  return format(days, 'days')
}

export const getCountDown = (date: string) => {
  const dateTime = DateTime.fromMillis(parseInt(date, 10))
  const currentDateTime = DateTime.now()

  let duration: Duration

  if (currentDateTime > dateTime) {
    duration = Duration.fromObject({ hours: 0 })
  } else {
    const i = Interval.fromDateTimes(currentDateTime, dateTime)
    duration = i.toDuration()
  }

  return duration.toFormat("d 'days : ' h'h :' m'm : ' s's")
}

export const getCountDownDuration = (date?: number | null) => {
  const noDuration = Duration.fromObject({ hours: 0 })
  if (!date) {
    return noDuration
  }

  const dateTime = DateTime.fromMillis(date)
  const currentDateTime = DateTime.now()

  if (currentDateTime.toMillis() < dateTime.toMillis()) {
    const i = Interval.fromDateTimes(currentDateTime, dateTime)
    return i.toDuration()
  }

  return noDuration
}

export const getFormattedDate = (date: number | string) => {
  const dateTime = DateTime.fromMillis(parseInt(`${date}`, 10))

  const { day, monthShort, year } = dateTime

  return `${day} ${monthShort} ${year}`
}

export const checkExpired = (date: string) => {
  const currentDateTime = DateTime.now().toMillis()
  const numberDate = parseInt(date, 10)
  return numberDate <= currentDateTime
}

export const getFormattedDateWithTime = (date: string) => {
  const dateTime = DateTime.fromMillis(parseInt(date, 10))
  const { day, month, year, hour, minute } = dateTime

  return `${year}/${month}/${day} ${hour}:${minute}`
}
