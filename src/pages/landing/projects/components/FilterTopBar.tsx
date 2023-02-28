import { useQuery } from '@apollo/client'
import { SearchIcon } from '@chakra-ui/icons'
import { HStack, StackProps, Wrap } from '@chakra-ui/react'
import { HiOutlineTag } from 'react-icons/hi'
import { SlLocationPin } from 'react-icons/sl'

import Loader from '../../../../components/ui/Loader'
import { useFilterContext } from '../../../../context'
import { QUERY_COUNTRIES, QUERY_TAGS } from '../../../../graphql/queries'
import { ProjectCountriesGetResult, TagsGetResult } from '../../../../types'
import { useMobileMode } from '../../../../utils'
import { SortMenu } from '../../filters/sort/SortMenu'
import { getStatusTypeButtonContent } from '../../filters/status'
import { TagComponent } from '../elements'

export const FilterTopBar = (props: StackProps) => {
  const { filters, updateFilter } = useFilterContext()
  const isMobile = useMobileMode()

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
    if (!search) {
      return null
    }

    return (
      <TagComponent
        label={search}
        icon={<SearchIcon />}
        onClick={() => updateFilter({ search: undefined })}
      />
    )
  }

  const renderFilterStatusType = () => {
    if (!type && !status) {
      return null
    }

    const {
      icon: Icon,
      text,
      color,
    } = getStatusTypeButtonContent({ type, status })
    return (
      <TagComponent
        label={text}
        icon={<Icon height="20px" color={color} />}
        onClick={() => updateFilter({ type: undefined, status: undefined })}
      />
    )
  }

  const viewFilterSearch = renderFilterSearch()
  const viewFilterStatusType = renderFilterStatusType()
  const viewFilterTags = renderFilterTags()
  const viewFilterRegion = renderFilterRegion()

  if (
    viewFilterSearch ||
    viewFilterStatusType ||
    viewFilterTags ||
    viewFilterRegion
  ) {
    return (
      <HStack
        width="100%"
        justifyContent="space-between"
        alignItems="start"
        {...props}
      >
        <Wrap>
          {viewFilterSearch}
          {viewFilterStatusType}
          {viewFilterTags}
          {viewFilterRegion}
        </Wrap>
        {!isMobile && <SortMenu />}
      </HStack>
    )
  }

  return null
}
