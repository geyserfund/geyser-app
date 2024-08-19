import { Box, Button, HStack, Image, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { PiCalendarDots } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { RocketLaunchIcon } from '@/components/icons/svg/RocketLaunch'
import { CustomSelect } from '@/components/ui/CustomSelect'
import PlatformLayout from '@/components/ui/PlatformLayout'
import { useAuthContext } from '@/context'
import { Body } from '@/shared/components/typography'
import { DiamondUrl, getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import ProjectCard from './components/ProjectCard'
import { useMyProjects } from './hooks/useMyProjects'
import { periodAtom, TimePeriod } from './state/periodAtom'

export const MyProjects = () => {
  const { t } = useTranslation()

  const [timePeriod, setTimePeriod] = useAtom(periodAtom)

  const { user } = useAuthContext()
  const { projects, isLoading } = useMyProjects(user?.id)

  const hasNoProjects = projects.length === 0

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
          <Body fontSize="24px" bold width={{ base: '100%', lg: 'auto' }}>
            {t('My Projects')}
          </Body>
          {!hasNoProjects && (
            <CustomSelect
              value={timePeriodOptions.find((option) => option.value === timePeriod)}
              options={timePeriodOptions}
              isSearchable={false}
              onChange={handleTimePeriodChange}
              dropdownIndicator={<PiCalendarDots />}
              size="md"
            />
          )}
        </Box>
        {hasNoProjects && !isLoading && <LaunchNewProjectBanner />}
        {projects && projects.map((project) => (project ? <ProjectCard key={project.id} project={project} /> : null))}
      </VStack>
    </PlatformLayout>
  )
}

const LaunchNewProjectBanner = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(getPath('launchStart'))
  }

  const isMobile = useMobileMode()

  const Direction = isMobile ? VStack : HStack

  return (
    <Direction
      width="100%"
      justifyContent="space-between"
      bg="neutralAlpha.2"
      border="1px solid"
      borderColor="neutralAlpha.6"
      borderRadius="8px"
      spacing={8}
      p={8}
    >
      <HStack justifyContent="flex-start" spacing={8}>
        <Image height="86px" src={DiamondUrl} alt="Launch new project" />
        <VStack alignItems="flex-start">
          <Body fontSize="20px" medium>
            {t('Launch your new project')}
          </Body>
          <Body fontSize="14px" regular>
            {t('Transform your idea into real world projects backed by your community.')}
          </Body>
        </VStack>
      </HStack>
      <Button
        bg="primary1.9"
        color="accent"
        size="md"
        variant="solid"
        rightIcon={<RocketLaunchIcon />}
        onClick={handleClick}
        width={{ base: '100%', lg: 'auto' }}
      >
        {t('Create project')}
      </Button>
    </Direction>
  )
}
