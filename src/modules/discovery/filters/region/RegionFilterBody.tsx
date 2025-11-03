import { Box, Divider, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'

import { useFilterContext } from '@/context/filter'
import { Body } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'

import { ProjectCountriesGetResult, ProjectRegionsGetResult } from '../../../../types'

interface RegionFilterBodyProps {
  regions: ProjectRegionsGetResult[]
  countries: ProjectCountriesGetResult[]
  onClose?: () => void
  searchCode?: string
}

export const RegionFilterBody = ({ regions, countries, searchCode, onClose }: RegionFilterBodyProps) => {
  const { filters, updateFilter } = useFilterContext()
  const { countryCode, region } = filters

  const handleRegionClick = (selectedRegion: string) => {
    if (selectedRegion === region) {
      updateFilter({ region: undefined })
    } else {
      updateFilter({ countryCode: undefined, region: selectedRegion })
    }

    if (onClose) {
      onClose()
    }
  }

  const handleCountryClick = (selectedCountryCode: string) => {
    if (selectedCountryCode === countryCode) {
      updateFilter({ countryCode: undefined })
    } else {
      updateFilter({ countryCode: selectedCountryCode, region: undefined })
    }

    if (onClose) {
      onClose()
    }
  }

  const value = countryCode ? countryCode : region

  const handleClick = (value: string) => {
    if (value.length === 2) {
      handleCountryClick(value)
    } else {
      handleRegionClick(value)
    }
  }

  const countriesToRender = useMemo(() => {
    const usedCountries = countries.filter((country) => country.count > 0)
    if (searchCode) {
      return usedCountries.filter(
        (country) =>
          country.country.name.toLowerCase().includes(searchCode.toLowerCase()) || countryCode === country.country.code,
      )
    }

    return usedCountries
  }, [countries, countryCode, searchCode])

  const regionsToRender = useMemo(() => {
    const usedRegions = regions.filter((reg) => reg.count > 0)
    if (searchCode) {
      return usedRegions.filter(
        (reg) => reg.region.toLowerCase().includes(searchCode.toLowerCase()) || region === reg.region,
      )
    }

    return usedRegions
  }, [regions, region, searchCode])

  return (
    <Box width="100%" overflowY="auto" paddingX={standardPadding}>
      <RadioGroup onChange={handleClick} value={value}>
        <VStack w="full" alignItems="start">
          <Radio value={''} height="30px" _hover={{ backgroundColor: 'neutral1.6' }}>
            <Body>{t('Worldwide')}</Body>
          </Radio>
          {regionsToRender.map((reg) => {
            return (
              <Radio key={reg.region} value={reg.region}>
                <Body>
                  {`${reg.region} `}
                  <Body as="span" size="sm" light>
                    {`(x${reg.count})`}
                  </Body>
                </Body>
              </Radio>
            )
          })}

          {countriesToRender.length > 0 && regionsToRender.length > 0 && <Divider />}

          {countriesToRender.map((country) => {
            const {
              count,
              country: { code, name },
            } = country
            return (
              <Radio key={code} value={code}>
                <Body>
                  {`${name} `}
                  <Body as="span" size="sm" light>
                    {`(x${count})`}
                  </Body>
                </Body>
              </Radio>
            )
          })}
        </VStack>
      </RadioGroup>
    </Box>
  )
}
