import type { FilterType } from '../../../../context'
import { SortType } from '../../../../context'
import { checkKeyValueExists } from '../../../../utils'
import { SortOptions } from './SortBody'

export const getCurrentSelection = (sort?: SortType) => {
  switch (sort) {
    case SortType.recent:
      return SortOptions.mostFundedThisWeek
    default:
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
