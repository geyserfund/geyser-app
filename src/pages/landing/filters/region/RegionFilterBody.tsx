import { Box, Divider, useDisclosure, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { SingleValue } from 'react-select'

import { SelectComponent } from '../../../../components/ui'
import { useFilterContext } from '../../../../context'
import {
  Country,
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
} from '../../../../types'
import { RenderCountries, RenderRegions } from '../components'

interface RegionFilterBodyProps {
  regions: ProjectRegionsGetResult[]
  countries: ProjectCountriesGetResult[]
  options: Country[]
  onClose: () => void
}

export const RegionFilterBody = ({
  regions,
  countries,
  options,
  onClose,
}: RegionFilterBodyProps) => {
  const { t } = useTranslation()
  const { filters, updateFilter } = useFilterContext()
  const { countryCode, region } = filters

  const {
    isOpen: selectMenuOpen,
    onOpen: onSelectMenuOpen,
    onClose: onSelectMenuClose,
  } = useDisclosure()

  const handleRegionSelect = (option: SingleValue<Country>) => {
    if (!option) {
      return
    }

    if (option.code === option.name) {
      updateFilter({ countryCode: undefined, region: option.code })
    } else {
      updateFilter({ countryCode: option.code, region: undefined })
    }

    onClose()
  }

  const handleInputChange = (newValue: string) => {
    if (newValue?.length >= 1) {
      onSelectMenuOpen()
    } else {
      onSelectMenuClose()
    }
  }

  const handleRegionClick = (selectedRegion: string) => {
    if (selectedRegion === region) {
      updateFilter({ region: undefined })
    } else {
      updateFilter({ countryCode: undefined, region: selectedRegion })
    }

    onClose()
  }

  const handleCountryClick = (selectedCountryCode: string) => {
    if (selectedCountryCode === countryCode) {
      updateFilter({ countryCode: undefined })
    } else {
      updateFilter({ countryCode: selectedCountryCode, region: undefined })
    }

    onClose()
  }

  const currentCountry = countries.find(
    (country) => country.country.code === countryCode,
  )

  const value = currentCountry
    ? currentCountry.country
    : region
    ? ({ name: region, code: region } as Country)
    : undefined

  return (
    <>
      <Box width="100%" paddingX="24px">
        <SelectComponent<Country, false>
          menuIsOpen={selectMenuOpen}
          onBlur={onSelectMenuClose}
          options={options}
          value={value}
          getOptionLabel={(option) => option.name}
          onChange={handleRegionSelect}
          onInputChange={handleInputChange}
          placeholder={t('Find country or region')}
        />
      </Box>

      <Box width="100%" overflowY="auto">
        <VStack width="100%" alignItems="start" spacing="5px" paddingX="24px">
          <RenderRegions
            region={region}
            regions={regions}
            handleClick={handleRegionClick}
          />
          <Divider />
          <RenderCountries
            countries={countries}
            countryCode={countryCode}
            handleClick={handleCountryClick}
          />
        </VStack>
      </Box>
    </>
  )
}
