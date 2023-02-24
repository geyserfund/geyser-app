import { useQuery } from '@apollo/client'
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SlLocationPin } from 'react-icons/sl'
import { SingleValue } from 'react-select'

import { CloseIconButton } from '../../../components/buttons'
import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body1 } from '../../../components/typography'
import { ButtonComponent, SelectComponent } from '../../../components/ui'
import Loader from '../../../components/ui/Loader'
import { useFilterContext } from '../../../context'
import { QUERY_COUNTRIES, QUERY_REGION } from '../../../graphql/queries'
import { colors } from '../../../styles'
import {
  Country,
  ProjectCountriesGetResult,
  ProjectRegionsGetResult,
} from '../../../types'
import { RenderCountries, RenderRegions } from './components'

type FilterByRegionProps = CardLayoutProps

export const FilterByRegion = ({ ...rest }: FilterByRegionProps) => {
  const { filters, updateFilter } = useFilterContext()
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
      updateFilter({ countryCode: undefined, region: option.code })
    } else {
      updateFilter({ countryCode: option.code, region: undefined })
    }
  }

  const handleInputChange = (newValue: string) => {
    if (newValue?.length >= 1) {
      onSelectMenuOpen()
    } else {
      onSelectMenuClose()
    }

    onClose()
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

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    updateFilter({ countryCode: undefined, region: undefined })
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

  const currentCountry = countries.find(
    (country) => country.country.code === countryCode,
  )

  const value = currentCountry
    ? currentCountry.country
    : region
    ? ({ name: region, code: region } as Country)
    : undefined

  if (countriesLoading || regionsLoading) {
    return <Loader />
  }

  return (
    <>
      <CardLayout
        hover
        width="100%"
        direction="column"
        padding={'0px'}
        position="relative"
        justifyContent="center"
        spacing="0px"
        {...rest}
      >
        <ButtonComponent
          noBorder
          onClick={onOpen}
          w="full"
          _hover={{}}
          paddingX="10px"
        >
          <HStack width="100%">
            <SlLocationPin color={colors.neutral600} fontSize="20px" />
            <Body1 color={colors.neutral900}>{getCurrentButtonName()}</Body1>
          </HStack>
        </ButtonComponent>
        {isSelected ? (
          <CloseIconButton
            position="absolute"
            right="10px"
            onClick={handleClear}
          />
        ) : (
          <ChevronRightIcon position="absolute" right="10px" fontSize="20px" />
        )}
      </CardLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent maxHeight="700px" overflow="hidden" borderRadius="8px">
          <ModalHeader>
            <HStack width="100%" position="relative" alignItems="center">
              <SlLocationPin
                stroke={colors.neutral600}
                color={colors.neutral600}
                fontSize="20px"
              />
              <Body1 color={colors.neutral600}>Filter by location</Body1>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={VStack} overflow="hidden" paddingX="0px">
            <Box width="100%" paddingX="24px">
              <SelectComponent<Country, false>
                menuIsOpen={selectMenuOpen}
                onBlur={onSelectMenuClose}
                options={options}
                value={value}
                getOptionLabel={(option) => option.name}
                onChange={handleRegionSelect}
                onInputChange={handleInputChange}
                placeholder="Find country or region"
              />
            </Box>

            <Box width="100%" overflowY="auto">
              <VStack
                width="100%"
                alignItems="start"
                spacing="5px"
                paddingX="24px"
              >
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
