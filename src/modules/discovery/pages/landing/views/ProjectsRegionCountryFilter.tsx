import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { PiCaretDown, PiCheck, PiGlobe, PiMagnifyingGlass, PiX } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import {
  useProjectCountriesGetQuery,
  useProjectRegionsGetQuery,
} from '@/types'

type ProjectsRegionCountryFilterProps = {
  countryCode?: string
  region?: string
  onChange: (value: { countryCode?: string; region?: string }) => void
}

/** Projects toolbar filter for selecting either a project region or country from a searchable dropdown. */
export const ProjectsRegionCountryFilter = ({
  countryCode,
  region,
  onChange,
}: ProjectsRegionCountryFilterProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [searchValue, setSearchValue] = useState('')

  const { data: countriesData, loading: countriesLoading } = useProjectCountriesGetQuery()
  const { data: regionsData, loading: regionsLoading } = useProjectRegionsGetQuery()

  const countries = useMemo(
    () => [...(countriesData?.projectCountriesGet ?? [])].sort((a, b) => b.count - a.count),
    [countriesData?.projectCountriesGet],
  )
  const regions = useMemo(
    () => [...(regionsData?.projectRegionsGet ?? [])].sort((a, b) => b.count - a.count),
    [regionsData?.projectRegionsGet],
  )

  const filteredCountries = useMemo(() => {
    const usedCountries = countries.filter((country) => country.count > 0)
    if (!searchValue) {
      return usedCountries
    }

    return usedCountries.filter(
      (country) =>
        country.country.name.toLowerCase().includes(searchValue.toLowerCase()) || country.country.code === countryCode,
    )
  }, [countries, countryCode, searchValue])

  const filteredRegions = useMemo(() => {
    const usedRegions = regions.filter((entry) => entry.count > 0)
    if (!searchValue) {
      return usedRegions
    }

    return usedRegions.filter(
      (entry) => entry.region.toLowerCase().includes(searchValue.toLowerCase()) || entry.region === region,
    )
  }, [region, regions, searchValue])

  const selectedCountry = countryCode ? countries.find((entry) => entry.country.code === countryCode) : undefined
  const buttonLabel = selectedCountry?.country.name ?? region ?? t('Region/Country')
  const isLoading = countriesLoading || regionsLoading

  const handleClose = () => {
    setSearchValue('')
    onClose()
  }

  const handleWorldwideSelect = () => {
    onChange({ countryCode: undefined, region: undefined })
    handleClose()
  }

  const handleCountrySelect = (selectedCountryCode: string) => {
    onChange({
      countryCode: selectedCountryCode === countryCode ? undefined : selectedCountryCode,
      region: undefined,
    })
    handleClose()
  }

  const handleRegionSelect = (selectedRegion: string) => {
    onChange({
      countryCode: undefined,
      region: selectedRegion === region ? undefined : selectedRegion,
    })
    handleClose()
  }

  if (isLoading) {
    return <Skeleton height="32px" width="164px" borderRadius="8px" />
  }

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={handleClose} placement="bottom-end" closeOnBlur>
      <PopoverTrigger>
        <Button
          variant="ghost"
          colorScheme="neutral1"
          size="sm"
          rightIcon={<Icon as={PiCaretDown} />}
          fontSize="sm"
          fontWeight={400}
          paddingX={0}
          minWidth="unset"
          color="neutral1.11"
        >
          {buttonLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent width="360px" maxWidth="calc(100vw - 32px)">
        <PopoverBody padding={3}>
          <VStack align="stretch" spacing={3}>
            <InputGroup size="sm">
              <InputRightElement>
                {searchValue ? (
                  <IconButton
                    aria-label={t('Clear region or country search')}
                    variant="ghost"
                    size="sm"
                    icon={<PiX />}
                    onClick={() => setSearchValue('')}
                  />
                ) : (
                  <Icon as={PiMagnifyingGlass} color="neutral1.8" />
                )}
              </InputRightElement>
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={t('Search region or country')}
              />
            </InputGroup>

            <VStack
              align="stretch"
              spacing={1}
              maxHeight="360px"
              overflowY="auto"
              paddingRight={1}
            >
              <RegionCountryOption
                label={t('Worldwide')}
                countLabel=""
                isSelected={!countryCode && !region}
                icon={PiGlobe}
                onClick={handleWorldwideSelect}
              />

              {filteredRegions.map((entry) => (
                <RegionCountryOption
                  key={entry.region}
                  label={entry.region}
                  countLabel={`(${entry.count})`}
                  isSelected={entry.region === region}
                  onClick={() => handleRegionSelect(entry.region)}
                />
              ))}

              {filteredRegions.length > 0 && filteredCountries.length > 0 ? <Divider borderColor="blackAlpha.200" /> : null}

              {filteredCountries.map((entry) => (
                <RegionCountryOption
                  key={entry.country.code}
                  label={entry.country.name}
                  countLabel={`(${entry.count})`}
                  isSelected={entry.country.code === countryCode}
                  onClick={() => handleCountrySelect(entry.country.code)}
                />
              ))}
            </VStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

type RegionCountryOptionProps = {
  countLabel: string
  icon?: typeof PiGlobe
  isSelected: boolean
  label: string
  onClick: () => void
}

const RegionCountryOption = ({ countLabel, icon, isSelected, label, onClick }: RegionCountryOptionProps) => {
  return (
    <Button
      variant="ghost"
      justifyContent="space-between"
      width="full"
      onClick={onClick}
      fontWeight={isSelected ? 600 : 400}
      paddingX={3}
    >
      <HStack spacing={2} minWidth={0}>
        {icon ? <Icon as={icon} color="neutral1.9" /> : null}
        <Body>{label}</Body>
        {countLabel ? (
          <Body as="span" size="sm" light>
            {countLabel}
          </Body>
        ) : null}
      </HStack>

      <Box minWidth="16px">{isSelected ? <Icon as={PiCheck} /> : null}</Box>
    </Button>
  )
}
