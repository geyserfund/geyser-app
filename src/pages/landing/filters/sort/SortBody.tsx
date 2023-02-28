import { MenuItem } from '@chakra-ui/react'

import { useFilterContext } from '../../../../context'
import { OrderByOptions } from '../../../../types'
import { disableSortByTrending, getCurrentSelection } from './sortSelection'

export enum SortOptions {
  mostFundedThisWeek = 'Most funded this week',
  mostFundedAllTime = 'Most funded all time',
  mostRecentProjects = 'Most recent projects',
  oldestProjects = 'Oldest projects',
}

export const SortBody = () => {
  const { sort, filters, updateFilter, updateSort } = useFilterContext()

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

  const sortList = [
    SortOptions.mostFundedThisWeek,
    SortOptions.mostFundedAllTime,
    SortOptions.mostRecentProjects,
    SortOptions.oldestProjects,
  ]

  const renderButtons = disableSortByTrending(filters)
    ? sortList.slice(1)
    : sortList

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
