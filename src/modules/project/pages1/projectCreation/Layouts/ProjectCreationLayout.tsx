import {
  Box,
  Button,
  HStack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
  VStack,
} from '@chakra-ui/react'
import { PropsWithChildren, useMemo } from 'react'
import { Link, useLocation, useMatch, useMatches } from 'react-router-dom'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/index.ts'

interface ProjectCreationLayoutProps extends PropsWithChildren {
  completedSteps?: number[]
  currentStep?: number
}

export const ProjectCreationLayout = ({
  children,
  completedSteps: propCompletedSteps,
  currentStep,
}: ProjectCreationLayoutProps) => {
  const { project } = useProjectAtom()
  const location = useLocation()

  const steps = useMemo(
    () => [
      { title: 'Project Details', path: getPath('launchProjectDetails') },
      { title: 'Funding Goal', path: getPath('launchFundingStrategy', project?.id) },
      { title: 'Products & Perks', path: getPath('launchProjectRewards', project?.id) },
      { title: 'Story', path: getPath('launchStory', project?.id) },
      { title: 'About You', path: getPath('launchAboutYou', project?.id) },
      { title: 'Payment', path: getPath('launchPayment', project?.id) },
      { title: 'Launch', path: getPath('launchSummary', project?.id) },
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
    <VStack width="100%" height="100%" paddingX={standardPadding} alignItems="center">
      <HStack w="100%" height="100%" maxWidth={dimensions.maxWidth} alignItems="start">
        <HStack w="200px" height="600px" alignItems={'stretch'}>
          <VStack flex={1} height="100%" justifyContent="space-between" alignItems="flex-end" paddingLeft={1}>
            {steps.map((step, index) => {
              const isActive = index === activeButtonIndex
              return (
                <Button
                  as={Link}
                  to={step.path}
                  variant={isActive ? 'soft' : 'ghost'}
                  colorScheme={isActive ? 'primary1' : 'neutral1'}
                  key={index}
                >
                  {step.title}
                </Button>
              )
            })}
          </VStack>

          <Stepper index={2} orientation="vertical" gap="0" paddingY={1} size="sm">
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
        <VStack flex={1}>{children}</VStack>
      </HStack>
    </VStack>
  )
}
