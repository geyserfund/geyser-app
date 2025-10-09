import { StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'

import { Country, Location, Maybe } from '../../../types'
import { ProjectCreationVariables } from '../pages/projectCreation/hooks/useProjectForm.tsx'
import { ProjectState } from '../state/projectAtom'

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
