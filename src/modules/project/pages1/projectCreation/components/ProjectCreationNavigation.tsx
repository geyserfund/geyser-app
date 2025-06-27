import {
  Box,
  Button,
  Collapse,
  HStack,
  StackProps,
  Step,
  StepIcon,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'

export const ProjectCreationNavigationMobile = () => {
  return (
    <Box>
      <ProjectCreationNavigation />
    </Box>
  )
}

export const ProjectCreationNavigationDesktop = () => {
  const isShown = useBreakpointValue({ base: false, md: true })
  return (
    <>
      <Collapse in={isShown}>
        <Box minWidth="150px" />
        <ProjectCreationNavigation position="fixed" top={dimensions.topNavBar.desktop.height} />
      </Collapse>
    </>
  )
}

const ProjectCreationNavigation = (props: StackProps) => {
  const { project } = useProjectAtom()
  const location = useLocation()

  const steps = useMemo(
    () => [
      { title: 'Project Details', path: getPath('launchProjectDetails', project?.id) },
      { title: 'Funding Goal', path: getPath('launchProjectFunding', project?.id), isDisabled: !project.id },
      { title: 'Products & Perks', path: getPath('launchProjectRewards', project?.id), isDisabled: !project.id },
      { title: 'Story', path: getPath('launchStory', project?.id), isDisabled: !project.id },
      { title: 'About You', path: getPath('launchAboutYou', project?.id), isDisabled: !project.id },
      { title: 'Payment', path: getPath('launchPayment', project?.id), isDisabled: !project.id },
      { title: 'Launch', path: getPath('launchSummary', project?.id), isDisabled: !project.id },
    ],
    [project?.id],
  )

  const activeButtonIndex = useMemo(() => {
    let activeIndex = 0
    steps.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = steps.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, steps])

  return (
    <HStack w="150px" height="350px" alignItems={'stretch'} paddingTop={1} {...props}>
      <VStack flex={1} height="100%" justifyContent="space-between" alignItems="flex-end" paddingTop="1px">
        {steps.map((step, index) => {
          const isActive = index === activeButtonIndex
          return (
            <Button
              as={Link}
              to={step.path}
              variant={isActive ? 'soft' : 'ghost'}
              colorScheme={isActive ? 'primary1' : 'neutral1'}
              key={index}
              pointerEvents={step.isDisabled ? 'none' : 'auto'}
            >
              {step.title}
            </Button>
          )
        })}
      </VStack>

      <Stepper index={0} orientation="vertical" gap="0" paddingY={2} size="xs">
        {steps.map((_, index) => {
          return (
            <Step key={index} display="flex" alignItems="flex-start">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>

              <StepSeparator />
            </Step>
          )
        })}
      </Stepper>
    </HStack>
  )
}
