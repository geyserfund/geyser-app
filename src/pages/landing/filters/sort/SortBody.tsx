import { MenuItem } from '@chakra-ui/react'

import { SortType, useFilterContext } from '../../../../context'
import { disableSortByTrending, getCurrentSelection } from './sortSelection'

export enum SortOptions {
  mostFundedThisWeek = 'Most funded this week',
  mostFundedAllTime = 'Most funded all time',
  mostRecentProjects = 'Most recent projects',
}

export const SortBody = ({ isMobile }: { isMobile?: boolean }) => {
  const { filters, updateFilter } = useFilterContext()

  const onSortSelect = (value: SortOptions) => {
    switch (value) {
      case SortOptions.mostRecentProjects:
        updateFilter({ recent: isMobile, sort: SortType.createdAt })
        break

      case SortOptions.mostFundedAllTime:
        updateFilter({ recent: isMobile, sort: SortType.balance })
        break

      default:
        updateFilter({
          status: undefined,
          type: undefined,
          region: undefined,
          countryCode: undefined,
          recent: isMobile,
          sort: SortType.recent,
        })
        break
    }
  }

  const sortList = [
    SortOptions.mostFundedThisWeek,
    SortOptions.mostFundedAllTime,
    SortOptions.mostRecentProjects,
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
              getCurrentSelection(filters.sort) === value
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
