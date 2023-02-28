import { useQuery } from '@apollo/client'
import { Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { useFilterContext } from '../../../../context'
import { QUERY_COUNTRIES, QUERY_REGION } from '../../../../graphql/queries'
import {
  Country,
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
} from '../../../../types'
import { DesktopRegionFilter } from './DesktopRegionFilter'
import { MobileRegionFilter } from './MobileRegionFilter'

interface FilterByRegionProps {
  mobile?: boolean
}

export const FilterByRegion = ({ mobile }: FilterByRegionProps) => {
  const { filters } = useFilterContext()
  const { countryCode, region } = filters

  const [options, setOptions] = useState<Country[]>([])
  const [countries, setCountries] = useState<ProjectCountriesGetResult[]>([])
  const [regions, setRegions] = useState<ProjectRegionsGetResult[]>([])

  const { loading: countriesLoading } = useQuery<{
    projectCountriesGet: ProjectCountriesGetResult[]
  }>(QUERY_COUNTRIES, {
    onCompleted(data) {
      if (data.projectCountriesGet) {
        const sortedCountries = [...data.projectCountriesGet].sort(
          (a, b) => b.count - a.count,
        )
        setCountries(sortedCountries)
      }
    },
  })

  const { loading: regionsLoading } = useQuery<{
    projectRegionsGet: ProjectRegionsGetResult[]
  }>(QUERY_REGION, {
    onCompleted(data) {
      if (data.projectRegionsGet) {
        const sortedRegions = [...data.projectRegionsGet].sort(
          (a, b) => b.count - a.count,
        )
        setRegions(sortedRegions)
      }
    },
  })

  useEffect(() => {
    if (!countries || !regions) {
      return
    }

    const countryOptions = countries.map((val) => val.country)

    const regionOptions = regions.map((val) => ({
      name: val.region,
      code: val.region,
    }))

    setOptions([...countryOptions, ...regionOptions])
  }, [countries, regions])

  const getCurrentButtonName = () => {
    if (region) {
      return region
    }

    if (countryCode) {
      return (
        countries.find((country) => country.country.code === countryCode)
          ?.country.name || ''
      )
    }

    return 'Everywhere'
  }

  if (countriesLoading || regionsLoading) {
    return <Skeleton borderRadius="8px" w="full" height="40px" />
  }

  if (mobile) {
    return (
      <MobileRegionFilter
        {...{ options, countries, regions, label: getCurrentButtonName() }}
      />
    )
  }

  return (
    <DesktopRegionFilter
      {...{ options, countries, regions, label: getCurrentButtonName() }}
    />
  )
}
