import { useQuery } from '@apollo/client'
import { SearchIcon } from '@chakra-ui/icons'
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
import { HiOutlineTag } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'

import { Body2 } from '../../../components/typography'
import Loader from '../../../components/ui/Loader'
import { useFilterContext } from '../../../context'
import { QUERY_COUNTRIES, QUERY_TAGS } from '../../../graphql/queries'
import {
  OrderByOptions,
  ProjectCountriesGetResult,
  TagsGetResult,
} from '../../../types'
import { getStatusTypeButtonContent } from '../filters/FilterByStatus'
import { TagComponent } from './components'

export const FilterTopBar = () => {
  const { filters, updateFilter } = useFilterContext()

  const { tagIds = [], region, countryCode, search, type, status } = filters

  const { loading: tagsLoading, data } = useQuery<{ tagsGet: TagsGetResult[] }>(
    QUERY_TAGS,
  )

  const { loading: countriesLoading, data: countriesData } = useQuery<{
    projectCountriesGet: ProjectCountriesGetResult[]
  }>(QUERY_COUNTRIES)

  if (tagsLoading || countriesLoading) {
    return <Loader />
  }

  const handleClearTag = (tagId: number) => {
    updateFilter({ tagIds: tagIds.filter((id) => id !== tagId) })
  }

  const renderFilterTags = () => {
    if (tagIds.length === 0) {
      return null
    }

    const tags = data?.tagsGet.filter((tag) => tagIds.includes(tag.id)) || []
    return (
      <>
        {tags.map((tag) => {
          return (
            <TagComponent
              key={tag.id}
              icon={<HiOutlineTag />}
              label={tag.label}
              onClick={() => handleClearTag(tag.id)}
            />
          )
        })}
      </>
    )
  }

  const renderFilterRegion = () => {
    if (countryCode) {
      const country = countriesData?.projectCountriesGet.find(
        (result) => result.country.code === countryCode,
      )
      if (country) {
        return (
          <TagComponent
            label={country.country.name}
            icon={<SlLocationPin />}
            onClick={() => updateFilter({ countryCode: undefined })}
          />
        )
      }
    }

    if (region) {
      return (
        <TagComponent
          label={region}
          icon={<SlLocationPin />}
          onClick={() => updateFilter({ region: undefined })}
        />
      )
    }

    return null
  }

  const renderFilterSearch = () => {
    if (search) {
      return (
        <TagComponent
          label={search}
          icon={<SearchIcon />}
          onClick={() => updateFilter({ search: undefined })}
        />
      )
    }
  }

  const renderFilterStatusType = () => {
    if (!type && !status) {
      return null
    }

    const { icon, text } = getStatusTypeButtonContent({ type, status })
    return (
      <TagComponent
        label={text}
        icon={icon}
        onClick={() => updateFilter({ type: undefined, status: undefined })}
      />
    )
  }

  return (
    <HStack width="100%" justifyContent="space-between">
      <HStack>
        {renderFilterSearch()}
        {renderFilterStatusType()}
        {renderFilterTags()}
        {renderFilterRegion()}
      </HStack>
      <SortMenu />
    </HStack>
  )
}

enum SortOptions {
  mostFundedThisWeek = 'Most funded this week',
  mostFundedAllTime = 'Most funded all time',
  mostRecentProjects = 'Most recent projects',
  oldestProjects = 'Oldest projects',
}

export const SortMenu = () => {
  const { sort, updateSort, updateFilter } = useFilterContext()

  const getCurrentSelection = () => {
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
    <Menu>
      <MenuButton
        as={Button}
        size="xs"
        rightIcon={<BsSliders fontSize="16px" />}
        backgroundColor="brand.neutral100"
      >
        <Body2 semiBold>{getCurrentSelection()}</Body2>
      </MenuButton>
      <MenuList>
        <HStack width="100%" padding="5px 10px" justifyContent="space-between">
          <Body2>Sort By:</Body2>
          <CloseButton />
        </HStack>
        {renderButtons.map((value) => {
          return (
            <MenuItem
              key={value}
              backgroundColor={
                getCurrentSelection() === value ? 'brand.neutral100' : undefined
              }
              onClick={() => onSortSelect(value)}
            >
              {value}
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
