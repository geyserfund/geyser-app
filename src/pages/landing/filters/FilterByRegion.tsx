import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { Divider, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { SingleValue } from 'react-select'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import {
  ButtonComponent,
  IconButtonComponent,
  SelectComponent,
} from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { QUERY_COUNTRIES, QUERY_REGION } from '../../../graphql/queries'
import { FilterState } from '../../../hooks/state'
import { colors } from '../../../styles'
import {
  Country,
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
} from '../../../types'
import { RenderCountries, RenderRegions } from './components'
interface FilterByRegionProps extends CardLayoutProps, FilterState {}

export const FilterByRegion = ({
  filters,
  updateFilter,
  ...rest
}: FilterByRegionProps) => {
  const { countryCode, region } = filters

  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: selectMenuOpen,
    onOpen: onSelectMenuOpen,
    onClose: onSelectMenuClose,
  } = useDisclosure()

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

  const handleRegionSelect = (option: SingleValue<Country>) => {
    if (!option) {
      return
    }

    if (option.code === option.name) {
      updateFilter({ countryCode: '', region: option.code })
    } else {
      updateFilter({ countryCode: option.code, region: '' })
    }
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
      updateFilter({ region: '' })
    } else {
      updateFilter({ countryCode: '', region: selectedRegion })
    }
  }

  const handleCountryClick = (selectedCountryCode: string) => {
    if (selectedCountryCode === countryCode) {
      updateFilter({ countryCode: '' })
    } else {
      updateFilter({ countryCode: selectedCountryCode, region: '' })
    }
  }

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    updateFilter({ countryCode: '', region: '' })
  }

  const getCurrentButtonName = () => {
    if (region) {
      return region
    }

    if (countryCode) {
      return countries.find((country) => country.country.code === countryCode)
        ?.country.name
    }

    return 'Everywhere'
  }

  const isSelected = region || countryCode

  if (countriesLoading || regionsLoading) {
    return <Loader />
  }

  return (
    <CardLayout
      hover
      width="100%"
      direction="column"
      padding={isOpen ? '15px' : '0px'}
      spacing="10px"
      {...rest}
    >
      {isOpen ? (
        <>
          <HStack width="100%" position="relative" alignItems="center">
            <CiLocationOn color={colors.neutral600} />
            <Body1 color={colors.neutral600}>Filter by location</Body1>
            <IconButtonComponent
              noBorder
              size="xs"
              aria-label="filter-close-icon"
              position="absolute"
              right="-5px"
              icon={<CloseIcon />}
              onClick={onClose}
            />
          </HStack>

          <SelectComponent<Country, false>
            menuIsOpen={selectMenuOpen}
            onBlur={onSelectMenuClose}
            options={options}
            value={[]}
            getOptionLabel={(option) => option.name}
            onChange={handleRegionSelect}
            onInputChange={handleInputChange}
            placeholder="Find country or region"
          />
          <VStack width="100%" alignItems="start" spacing="5px">
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
        </>
      ) : (
        <ButtonComponent
          noBorder
          onClick={onOpen}
          w="full"
          _hover={{}}
          paddingX="10px"
        >
          <HStack width="100%" position="relative">
            <CiLocationOn color={colors.neutral600} fontSize="20px" />
            <Body1 color={colors.neutral900}>{getCurrentButtonName()}</Body1>
            {isSelected && (
              <IconButtonComponent
                noBorder
                size="xs"
                aria-label="filter-close-icon"
                position="absolute"
                right="-5px"
                icon={<CloseIcon />}
                onClick={handleClear}
              />
            )}
          </HStack>
        </ButtonComponent>
      )}
    </CardLayout>
  )
}
