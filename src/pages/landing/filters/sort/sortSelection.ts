import type { FilterType } from '../../../../context'
import { SortType } from '../../../../context'
import { OrderByOptions } from '../../../../types'
import { checkKeyValueExists } from '../../../../utils'
import { SortOptions } from './SortBody'

export const getCurrentSelection = (sort: SortType) => {
  if (sort.recent) {
    return SortOptions.mostFundedThisWeek
  }

  if (sort.createdAt) {
    return SortOptions.mostRecentProjects
  }

  if (sort.balance === OrderByOptions.Desc) {
    return SortOptions.mostFundedAllTime
  }
}

export const disableSortByTrending = (filters: FilterType) => {
  if (
    checkKeyValueExists(
      filters,
      ['region', 'countryCode', 'search', 'status', 'type'],
      'any',
    ) ||
    (filters.tagIds && filters.tagIds.length >= 2)
  ) {
    return true
  }

  return false
}
