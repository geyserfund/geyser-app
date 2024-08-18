import { Box, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCalendarDots } from 'react-icons/pi'

import { CustomSelect } from '@/components/ui/CustomSelect'
import PlatformLayout from '@/components/ui/PlatformLayout'
import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'

import ProjectCard from '../components/ProjectCard'
import { useMyProjects } from '../hooks/useMyProjects'
import { periodAtom, TimePeriod } from '../state/periodAtom'

export const MyProjects = () => {
  const { t } = useTranslation()

  const [timePeriod, setTimePeriod] = useAtom(periodAtom)

  const { user } = useAuthContext()
  const { projects, isLoading } = useMyProjects(user?.id)

  const timePeriodOptions: { value: TimePeriod; label: string }[] = [
    { value: TimePeriod.Month, label: t('Past month') },
    { value: TimePeriod.Week, label: t('Past week') },
  ]

  const handleTimePeriodChange = (selectedOption: { value: TimePeriod; label: string } | null) => {
    if (selectedOption) {
      setTimePeriod(selectedOption.value as TimePeriod)
    }
  }

  return (
    <PlatformLayout>
      <VStack spacing={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Body fontSize="24px" bold>
            {t('My Projects')}
          </Body>
          <CustomSelect
            value={timePeriodOptions.find((option) => option.value === timePeriod)}
            options={timePeriodOptions}
            isSearchable={false}
            onChange={handleTimePeriodChange}
            dropdownIndicator={<PiCalendarDots />}
          />
        </Box>
        {isLoading && <Box>Loading...</Box>}
        {projects && projects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
      </VStack>
    </PlatformLayout>
  )
}
