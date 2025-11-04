import { Box, Divider, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { components, OptionProps } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect.tsx'
import { useFilterContext } from '@/context/filter'
import { Body } from '@/shared/components/typography'
import { standardPadding } from '@/shared/styles'

import { ProjectCountriesGetResult, ProjectRegionsGetResult } from '../../../../types'

interface RegionFilterBodySelectProps {
  regions: ProjectRegionsGetResult[]
  countries: ProjectCountriesGetResult[]
  onClose?: () => void
  searchCode?: string
}

type RegionOption = {
  label: string
  value: string
  type: 'region' | 'country'
  count: number
}

export const RegionFilterBodySelect = ({ regions, countries, searchCode, onClose }: RegionFilterBodySelectProps) => {
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

  const options = useMemo(() => {
    const regions = regionsToRender.map((reg) => ({
      label: reg.region,
      value: reg.region,
      count: reg.count,
      type: 'region',
    })) as RegionOption[]
    const countries = countriesToRender.map((country) => ({
      label: country.country.name,
      value: country.country.code,
      count: country.count,
      type: 'country',
    })) as RegionOption[]
    return [...regions, ...countries]
  }, [regionsToRender, countriesToRender])

  const handleChange = (option: RegionOption | null) => {
    if (option?.type === 'region') {
      updateFilter({ countryCode: undefined, region: option.value })
    } else if (option?.type === 'country') {
      updateFilter({ countryCode: option.value, region: undefined })
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <Box width="100%" overflowY="auto" paddingX={standardPadding}>
      <CustomSelect<RegionOption, false>
        options={options}
        onChange={handleChange}
        value={options.find((option) => option.value === value)}
        components={{
          Option(props: OptionProps<RegionOption>) {
            return (
              <components.Option {...props}>
                <Body>
                  {`${props.data.label} `}
                  <Body as="span" size="sm" light>
                    {`(x${props.data.count})`}
                  </Body>
                </Body>
              </components.Option>
            )
          },
        }}
      />
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
