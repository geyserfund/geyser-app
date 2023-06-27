import { MenuItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { SortType, useFilterContext } from '../../../../context'
import { disableSortByTrending, getCurrentSelection } from './sortSelection'

export enum SortOptions {
  mostFundedThisWeek = 'Most funded this week',
  mostFundedAllTime = 'Most funded all time',
  mostRecentProjects = 'Most recent projects',
}

export const SortBody = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation()
  const { filters, updateFilter } = useFilterContext()

  const onSortSelect = (value: SortOptions) => {
    switch (value) {
      case SortOptions.mostRecentProjects:
        if (isMobile) {
          updateFilter({ recent: true, sort: SortType.createdAt })
        } else {
          updateFilter({ sort: SortType.createdAt })
        }

        break

      case SortOptions.mostFundedAllTime:
        if (isMobile) {
          updateFilter({ recent: true, sort: SortType.balance })
        } else {
          updateFilter({ sort: SortType.balance })
        }

        break

      default:
        if (isMobile) {
          updateFilter({
            status: undefined,
            type: undefined,
            region: undefined,
            countryCode: undefined,
            recent: true,
            sort: SortType.recent,
          })
        } else {
          updateFilter({
            status: undefined,
            type: undefined,
            region: undefined,
            countryCode: undefined,
            sort: SortType.recent,
          })
        }

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
                ? 'neutral.100'
                : undefined
            }
            onClick={() => onSortSelect(value)}
          >
            {t(value)}
          </MenuItem>
        )
      })}
    </>
  )
}
