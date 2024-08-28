import { FilterType } from '@/context/filter'

import { checkKeyValueExists } from '../validations'

export const checkIfRenderFilter = (filters: FilterType) => {
  if (
    checkKeyValueExists(filters, ['countryCode', 'region', 'search', 'status', 'type'], 'any') ||
    (filters.tagIds && filters.tagIds.length > 0)
  ) {
    return true
  }

  return false
}
