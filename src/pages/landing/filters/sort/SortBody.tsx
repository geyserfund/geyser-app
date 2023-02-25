import { MenuItem } from '@chakra-ui/react'

import { useFilterContext } from '../../../../context'
import { OrderByOptions } from '../../../../types'
import { getCurrentSelection, SortOptions } from './SortMenu'

export const SortBody = () => {
  const { sort, updateFilter, updateSort } = useFilterContext()

  const onSortSelect = (value: SortOptions) => {
    switch (value) {
      case SortOptions.oldestProjects:
        updateSort({ createdAt: OrderByOptions.Asc })
        break

      case SortOptions.mostRecentProjects:
        updateSort({ createdAt: OrderByOptions.Desc })
        break

      case SortOptions.mostFundedAllTime:
        updateSort({ balance: OrderByOptions.Desc })
        break

      default:
        updateFilter({
          status: undefined,
          type: undefined,
          region: undefined,
          countryCode: undefined,
        })
        updateSort({ recent: true })
        break
    }
  }

  const renderButtons = [
    SortOptions.mostFundedThisWeek,
    SortOptions.mostFundedAllTime,
    SortOptions.mostRecentProjects,
    SortOptions.oldestProjects,
  ]
  return (
    <>
      {renderButtons.map((value) => {
        return (
          <MenuItem
            key={value}
            backgroundColor={
              getCurrentSelection(sort) === value
                ? 'brand.neutral100'
                : undefined
            }
            onClick={() => onSortSelect(value)}
          >
            {value}
          </MenuItem>
        )
      })}
    </>
  )
}
