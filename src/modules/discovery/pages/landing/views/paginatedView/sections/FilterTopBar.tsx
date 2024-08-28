import { HStack, StackProps, Wrap } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiMagnifyingGlass, PiMapPin, PiTag } from 'react-icons/pi'

import { useFilterContext } from '@/context/filter'
import { getStatusTypeButtonContent } from '@/modules/discovery/filters/status'
import { SkeletonLayout } from '@/shared/components/layouts'
import { useProjectCountriesGetQuery, useTagsGetQuery } from '@/types'
import { useCustomTheme } from '@/utils'

import { TagComponent } from '../components/TagComponent'

interface FilterTopBarProps extends StackProps {
  isLoading?: boolean
}

export const FilterTopBar = ({ isLoading, ...rest }: FilterTopBarProps) => {
  const { t } = useTranslation()

  const { colors } = useCustomTheme()

  const { filters, updateFilter } = useFilterContext()

  const { tagIds = [], region, countryCode, search, type, status } = filters

  const { loading: tagsLoading, data } = useTagsGetQuery()

  const { loading: countriesLoading, data: countriesData } = useProjectCountriesGetQuery()

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
              icon={<PiTag color={colors.neutral1[11]} />}
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
      const country = countriesData?.projectCountriesGet.find((result) => result.country.code === countryCode)
      if (country) {
        return (
          <TagComponent
            label={country.country.name}
            icon={<PiMapPin color={colors.neutral1[11]} />}
            onClick={() => updateFilter({ countryCode: undefined })}
          />
        )
      }
    }

    if (region) {
      return (
        <TagComponent
          label={region}
          icon={<PiMapPin color={colors.neutral1[11]} />}
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
        icon={<PiMagnifyingGlass color={colors.neutral1[11]} />}
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
        label={t(text)}
        icon={<Icon height="18px" color={colors.neutral1[11]} />}
        onClick={() => updateFilter({ type: undefined, status: undefined })}
      />
    )
  }

  if (isLoading) {
    return (
      <HStack width="100%" justifyContent="start" alignItems="center" {...rest}>
        {[1, 2].map((item) => {
          return <SkeletonLayout key={item} height="32px" width="80px" />
        })}
      </HStack>
    )
  }

  const viewFilterSearch = renderFilterSearch()
  const viewFilterStatusType = renderFilterStatusType()
  const viewFilterTags = renderFilterTags()
  const viewFilterRegion = renderFilterRegion()

  if (viewFilterSearch || viewFilterStatusType || viewFilterTags || viewFilterRegion) {
    return (
      <HStack width="100%" justifyContent="start" alignItems="start" overflowY={'auto'} {...rest}>
        <Wrap>
          {viewFilterSearch}
          {viewFilterStatusType}
          {viewFilterTags}
          {viewFilterRegion}
        </Wrap>
      </HStack>
    )
  }

  return null
}
