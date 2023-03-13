import { useQuery } from '@apollo/client'
import { SearchIcon } from '@chakra-ui/icons'
import { HStack, StackProps, Wrap } from '@chakra-ui/react'
import { HiOutlineTag } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'

import { H3 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { QUERY_COUNTRIES, QUERY_TAGS } from '../../../../graphql/queries'
import { colors } from '../../../../styles'
import { ProjectCountriesGetResult, TagsGetResult } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { getActivityButtonContent } from '../../filters/activity'
import { SortMenu } from '../../filters/sort/SortMenu'
import { getStatusTypeButtonContent } from '../../filters/status'
import { TagComponent } from '../elements'

interface FilterTopBarProps extends StackProps {
  noSort?: boolean
}

export const FilterTopBar = ({ noSort, ...rest }: FilterTopBarProps) => {
  const { filters, updateFilter, sort } = useFilterContext()
  const isMobile = useMobileMode()

  const {
    tagIds = [],
    region,
    countryCode,
    search,
    type,
    status,
    activity,
    recent,
  } = filters

  const { loading: tagsLoading, data } = useQuery<{ tagsGet: TagsGetResult[] }>(
    QUERY_TAGS,
  )

  const { loading: countriesLoading, data: countriesData } = useQuery<{
    projectCountriesGet: ProjectCountriesGetResult[]
  }>(QUERY_COUNTRIES)

  if (tagsLoading || countriesLoading) {
    return null
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
              icon={<HiOutlineTag color={colors.neutral500} />}
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
            icon={<SlLocationPin color={colors.neutral500} />}
            onClick={() => updateFilter({ countryCode: undefined })}
          />
        )
      }
    }

    if (region) {
      return (
        <TagComponent
          label={region}
          icon={<SlLocationPin color={colors.neutral500} />}
          onClick={() => updateFilter({ region: undefined })}
        />
      )
    }

    return null
  }

  const renderFilterSearch = () => {
    if (!search) {
      return null
    }

    return (
      <TagComponent
        label={search}
        icon={<SearchIcon color={colors.neutral500} />}
        onClick={() => updateFilter({ search: undefined })}
      />
    )
  }

  const renderFilterStatusType = () => {
    if (!type && !status) {
      return null
    }

    const { icon: Icon, text } = getStatusTypeButtonContent({ type, status })
    return (
      <TagComponent
        label={text}
        icon={<Icon height="18px" color={colors.neutral500} />}
        onClick={() => updateFilter({ type: undefined, status: undefined })}
      />
    )
  }

  const renderFilterActivity = () => {
    if (!activity) {
      return null
    }

    const { icon: Icon, text, color } = getActivityButtonContent(activity)
    return (
      <TagComponent
        label={text}
        icon={<Icon height="20px" color={color} />}
        onClick={() => updateFilter({ activity: undefined })}
      />
    )
  }

  const renderRecentProjects = () => {
    if (!recent) {
      return null
    }

    let value = ''
    if (sort.balance) {
      value = 'Most funded all time'
    } else if (sort.createdAt) {
      value = 'Most recent projects'
    } else if (sort.recent) {
      value = 'Most funded this week'
    }

    return <H3 color="brand.primary600">{value}</H3>
  }

  const viewFilterSearch = renderFilterSearch()
  const viewFilterStatusType = renderFilterStatusType()
  const viewFilterTags = renderFilterTags()
  const viewFilterRegion = renderFilterRegion()
  const viewFilterActivity = renderFilterActivity()
  const viewRecentProjects = renderRecentProjects()

  if (
    (!isMobile && viewFilterSearch) ||
    viewFilterStatusType ||
    viewFilterTags ||
    viewFilterRegion ||
    viewFilterActivity ||
    (!isMobile && filters.recent)
  ) {
    return (
      <HStack
        width="100%"
        justifyContent="space-between"
        alignItems="start"
        {...rest}
      >
        <Wrap>
          {viewRecentProjects}
          {viewFilterActivity}
          {viewFilterSearch}
          {viewFilterStatusType}
          {viewFilterTags}
          {viewFilterRegion}
        </Wrap>
        {!isMobile && !noSort && <SortMenu />}
      </HStack>
    )
  }

  return null
}
