import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { HStack, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { Body1, Body2, Caption } from '../../../components/typography'
import { IconButtonComponent, SelectComponent } from '../../../components/ui'
import { QUERY_COUNTRIES, QUERY_REGION } from '../../../graphql/queries/tags'
import { colors } from '../../../styles'
import {
  Country,
  Location,
  Maybe,
  Project,
  ProjectCountriesGetResult,
  ProjectFragment,
  ProjectRegionsGetResult,
} from '../../../types'

const useStyles = createUseStyles({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
  },

  tagContainer: {
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: colors.neutral400,
    borderRadius: '8px',
    padding: '12px',
  },

  select: {
    width: '100%',
    borderRadius: '8px',
  },

  menuGroup: {
    backgroundColor: 'red',
  },
})

interface ProjectRegionProps extends StackProps {
  location?: Maybe<Location>
  updateProject: (project: Partial<ProjectFragment>) => void
}

export const ProjectRegion = ({
  location,
  updateProject,
  ...rest
}: ProjectRegionProps) => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [options, setOptions] = useState<Country[]>([])

  const { loading: countriesLoading, data: countries } = useQuery<{
    projectCountriesGet: ProjectCountriesGetResult[]
  }>(QUERY_COUNTRIES)

  const { loading: regionsLoading, data: regions } = useQuery<{
    projectRegionsGet: ProjectRegionsGetResult[]
  }>(QUERY_REGION)

  useEffect(() => {
    if (!countries || !regions) {
      return
    }

    const countryOptions = countries.projectCountriesGet.map(
      (val) => val.country,
    )

    const regionOptions = regions.projectRegionsGet.map((val) => ({
      name: val.region,
      code: val.region,
    }))

    setOptions([...countryOptions, ...regionOptions])
  }, [countries, regions])

  const handleChange = (value: SingleValue<Country>) => {
    if (value?.code === value?.name) {
      updateProject({
        location: { region: value?.name, country: { code: '', name: '' } },
      } as Project)
    } else {
      updateProject({ location: { country: value, region: '' } } as Project)
    }
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    if (newValue?.length >= 1) {
      onOpen()
    } else {
      onClose()
    }
  }

  const removeRegion = () => {
    updateProject({
      location: { region: '', country: { code: '', name: '' } },
    })
  }

  const isLoading = countriesLoading || regionsLoading

  const displayLocation = location?.country?.name
    ? location?.region
      ? `${location?.country?.name} ( ${location?.region} )`
      : location?.country?.name
    : location?.region || ''

  return (
    <VStack className={classes.container} {...rest}>
      <Body2>Region</Body2>
      <Caption>
        Get found more easily by putting your project on the map. Select a
        country or region
      </Caption>
      <VStack className={classes.tagContainer} spacing="10px">
        <SelectComponent<Country, false>
          menuIsOpen={isOpen}
          className={classes.select}
          onChange={handleChange}
          name="tags"
          placeholder="Select region"
          value={[]}
          isLoading={isLoading}
          options={options}
          getOptionLabel={(option: Country) => option.name}
          getOptionValue={(option: Country) => option.code}
          onInputChange={handleInputChange}
          inputValue={inputValue}
        />
        <HStack width="100%" spacing="10px">
          {displayLocation && (
            <HStack
              borderRadius="4px"
              paddingLeft="8px"
              backgroundColor="neutral.100"
            >
              <Body1 semiBold>{displayLocation}</Body1>
              <IconButtonComponent
                noBorder
                size="xs"
                borderRadius="8px"
                aria-label="remove-tag-close-icon"
                onClick={removeRegion}
                icon={<CloseIcon />}
              />
            </HStack>
          )}
        </HStack>
      </VStack>
    </VStack>
  )
}
