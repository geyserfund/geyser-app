import { StackProps, useDisclosure } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Body } from '@/shared/components/typography'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { SkeletonLayout } from '../../../shared/components/layouts'
import { Country, Location, Maybe, Project, useProjectCountriesGetQuery } from '../../../types'
import { ProjectState } from '../state/projectAtom'
import { projectFormErrorAtom } from '../state/projectFormAtom'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
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

  const { loading: countriesLoading, data: countries } = useProjectCountriesGetQuery()

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

  const isLoading = countriesLoading

  return (
    <FieldContainer
      title={`${t('Country')}*`}
      subtitle={<span>{t('Get found more easily by putting your project on the map. Select a country')}</span>}
      {...rest}
    >
      {isLoading ? (
        <SkeletonLayout h="40px" />
      ) : (
        <CustomSelect<Country, false>
          menuIsOpen={isOpen}
          className={classes.select}
          onChange={handleChange}
          name="tags"
          placeholder={t('Select country')}
          value={location?.country}
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

      {projectFormError.location && (
        <Body size="xs" color="error.9" w="full" textAlign={'start'}>
          {projectFormError.location}
        </Body>
      )}
    </FieldContainer>
  )
}
