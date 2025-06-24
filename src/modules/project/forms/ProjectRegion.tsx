import { StackProps, useDisclosure } from '@chakra-ui/react'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { SingleValue } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { Body } from '@/shared/components/typography'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'

import { AppTheme } from '../../../context'
import { FieldContainer } from '../../../shared/components/form/FieldContainer'
import { SkeletonLayout } from '../../../shared/components/layouts'
import { Country, Location, Maybe, Project, useProjectCountriesGetQuery } from '../../../types'
import { ProjectCreationVariables } from '../pages1/projectCreation/types.ts'
import { ProjectState } from '../state/projectAtom'
import { projectFormErrorAtom } from '../state/projectFormAtom'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
  },

  menuGroup: {
    backgroundColor: 'red',
  },
}))

interface ProjectRegionProps extends StackProps {
  form: UseFormReturn<ProjectCreationVariables>
  location?: Maybe<Location>
  updateProject: (project: Partial<ProjectState>) => void
}

export const ProjectRegion = ({ form, location, updateProject, ...rest }: ProjectRegionProps) => {
  const { t } = useTranslation()

  const countriesData = useAtomValue(countriesAtom)

  return (
    <ControlledCustomSelect<ProjectCreationVariables, Country, false>
      width="100%"
      name="location"
      placeholder={t('Select country')}
      label={t('Country')}
      description={t('Get found more easily by putting your project on the map. Select a country')}
      required
      control={form.control}
      options={countriesData}
      getOptionLabel={(option: Country) => option.name}
      getOptionValue={(option: Country) => option.code}
      onFocus={() => form.clearErrors('location')}
    />
  )
}
