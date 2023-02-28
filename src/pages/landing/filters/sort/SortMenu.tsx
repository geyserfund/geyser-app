import {
  Button,
  CloseButton,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { BsSliders } from 'react-icons/bs'

import { Body2 } from '../../../../components/typography'
import { SortType, useFilterContext } from '../../../../context'
import { OrderByOptions } from '../../../../types'

export enum SortOptions {
  mostFundedThisWeek = 'Most funded this week',
  mostFundedAllTime = 'Most funded all time',
  mostRecentProjects = 'Most recent projects',
  oldestProjects = 'Oldest projects',
}

export const SortMenu = () => {
  const { sort } = useFilterContext()

  return (
    <Menu>
      <MenuButton as={Button} size="xs" backgroundColor="brand.neutral100">
        <HStack overflow="hidden">
          <Body2 semiBold isTruncated>
            {getCurrentSelection(sort)}
          </Body2>
          <BsSliders fontSize="16px" />
        </HStack>
      </MenuButton>
      <MenuList>
        <HStack width="100%" padding="5px 10px" justifyContent="space-between">
          <Body2>Sort By:</Body2>
          <CloseButton />
        </HStack>
        <SortBody />
      </MenuList>
    </Menu>
  )
}

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

export const getCurrentSelection = (sort: SortType) => {
  if (sort.recent) {
    return SortOptions.mostFundedThisWeek
  }

  if (sort.createdAt) {
    if (sort.createdAt === OrderByOptions.Asc) {
      return SortOptions.oldestProjects
    }

    if (sort.createdAt === OrderByOptions.Desc) {
      return SortOptions.mostRecentProjects
    }
  }

  if (sort.balance === OrderByOptions.Desc) {
    return SortOptions.mostFundedAllTime
  }
}
