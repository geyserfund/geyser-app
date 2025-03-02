import { useQuery } from '@apollo/client'
import { HStack, IconButton, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiX } from 'react-icons/pi'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Body } from '@/shared/components/typography'

import { AppTheme } from '../../../context'
import { QUERY_COUNTRIES } from '../../../graphqlBase/queries'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { SkeletonLayout } from '../../../shared/components/layouts'
import { Country, Location, Maybe, Project, ProjectCountriesGetResult } from '../../../types'
import { ProjectState } from '../state/projectAtom'
import { projectFormErrorAtom } from '../state/projectFormAtom'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
  },

  tagContainer: {
    width: '100%',
    backgroundColor: colors.utils.pbg,
    border: '1px solid',
    borderColor: colors.neutral1[6],
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
}))

interface ProjectRegionProps extends StackProps {
  location?: Maybe<Location>
  updateProject: (project: Partial<ProjectState>) => void
}

export const ProjectRegion = ({ location, updateProject, ...rest }: ProjectRegionProps) => {
  const { t } = useTranslation()
  const classes = useStyles()

  const [projectFormError, setProjectFormError] = useAtom(projectFormErrorAtom)

  const [inputValue, setInputValue] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [options, setOptions] = useState<Country[]>([])

  const { loading: countriesLoading, data: countries } = useQuery<{
    projectCountriesGet: ProjectCountriesGetResult[]
  }>(QUERY_COUNTRIES)

  useEffect(() => {
    if (!countries) {
      return
    }

    const countryOptions = countries.projectCountriesGet.map((val) => val.country)

    setOptions([...countryOptions])
  }, [countries])

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

  const clearLocationError = () => {
    setProjectFormError((prev) => ({ ...prev, location: undefined }))
  }

  const removeRegion = () => {
    clearLocationError()
    updateProject({
      location: { region: '', country: { code: '', name: '' } },
    })
  }

  const isLoading = countriesLoading

  const displayLocation = location?.country?.name
    ? location?.region
      ? `${location?.country?.name} ( ${location?.region} )`
      : location?.country?.name
    : location?.region || ''

  return (
    <FieldContainer
      title={`${t('Country')}*`}
      subtitle={<span>{t('Get found more easily by putting your project on the map. Select a country')}</span>}
      {...rest}
    >
      <VStack className={classes.tagContainer} spacing="10px">
        {isLoading ? (
          <SkeletonLayout h="40px" />
        ) : (
          <CustomSelect<Country, false>
            menuIsOpen={isOpen}
            className={classes.select}
            onChange={handleChange}
            name="tags"
            placeholder={t('Select country')}
            value={[]}
            isLoading={isLoading}
            options={options}
            getOptionLabel={(option: Country) => option.name}
            getOptionValue={(option: Country) => option.code}
            onInputChange={handleInputChange}
            inputValue={inputValue}
            onMenuOpen={onOpen}
            onMenuClose={onClose}
            isInvalid={Boolean(projectFormError.location)}
            onFocus={clearLocationError}
          />
        )}

        <HStack width="100%" spacing="10px" flexWrap={'wrap'}>
          {displayLocation && (
            <HStack borderRadius="4px" paddingLeft="8px" backgroundColor="neutral1.2">
              <Body medium>{displayLocation}</Body>
              <IconButton
                variant="ghost"
                _hover={{}}
                _pressed={{}}
                _active={{}}
                size="xs"
                borderRadius="8px"
                aria-label="remove-region-close-icon"
                onClick={removeRegion}
                icon={<PiX />}
              />
            </HStack>
          )}
        </HStack>
      </VStack>
      {projectFormError.location && (
        <Body size="xs" color="error.9" w="full" textAlign={'start'}>
          {projectFormError.location}
        </Body>
      )}
    </FieldContainer>
  )
}
