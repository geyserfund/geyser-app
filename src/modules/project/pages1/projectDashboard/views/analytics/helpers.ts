import { DateTime } from 'luxon'

import { AnalyticsGroupByInterval } from '@/types'

import { InsightsOptions } from './insightsAtom.tsx'

export const getNameForDate = (date: number, selectionOption: InsightsOptions) => {
  let name

  if (selectionOption === InsightsOptions.lastYear) {
    name = DateTime.fromMillis(date).toFormat('MMM')
  } else if (selectionOption === InsightsOptions.lastMonth) {
    name = DateTime.fromMillis(date).toFormat('MMM dd')
  } else {
    name = DateTime.fromMillis(date).toFormat('EEE (dd/MM)')
  }

  return name
}

export const getDateParams = (selectionOption: InsightsOptions) => {
  const currentDate = DateTime.now()

  let startDateTime
  let groupBy

  switch (selectionOption) {
    case InsightsOptions.lastWeek:
      startDateTime = currentDate.minus({ week: 1 }).toMillis()
      groupBy = AnalyticsGroupByInterval.Day
      break
    case InsightsOptions.lastMonth:
      startDateTime = currentDate.minus({ month: 1 }).toMillis()
      groupBy = AnalyticsGroupByInterval.Day
      break
    case InsightsOptions.lastYear:
      startDateTime = currentDate.minus({ year: 1 }).toMillis()
      groupBy = AnalyticsGroupByInterval.Month
      break
    default:
      startDateTime = currentDate.minus({ week: 1 }).toMillis()
      groupBy = AnalyticsGroupByInterval.Day
  }

  return { startDateTime, endDateTime: currentDate.toMillis(), groupBy }
}
