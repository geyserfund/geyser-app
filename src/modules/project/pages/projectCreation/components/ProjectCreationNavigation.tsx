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
import { Link, useLocation } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { ProjectCreationStep } from '@/types/index.ts'

export const ProjectCreationNavigationMobile = () => {
  return (
    <HStack w="full" paddingX={standardPadding}>
      <ProjectCreationNavigation w="full" spacing={8} paddingX={standardPadding} />
    </HStack>
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
      { title: 'Funding Strategy', path: getPath('launchFundingStrategy', project?.id), isDisabled: !project.id },
      { title: 'Products & Perks', path: getPath('launchProjectRewards', project?.id), isDisabled: !project.id },
      { title: 'Story', path: getPath('launchStory', project?.id), isDisabled: !project.id },
      { title: 'About You', path: getPath('launchAboutYou', project?.id), isDisabled: !project.id },
      { title: 'Wallet', path: getPath('launchPayment', project?.id), isDisabled: !project.id },
      { title: 'Launch', path: getPath('launchFinalize', project?.id), isDisabled: !project.id },
    ],
    [project?.id],
  )

  const activeButtonIndex = useMemo(() => {
    let activeIndex: number | undefined
    steps.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = steps.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, steps])

  const activeStepIndex = useMemo(() => {
    return projectCreationStepIndex[project?.lastCreationStep as ProjectCreationStep] || 0
  }, [project?.lastCreationStep])

  return (
    <HStack w="150px" height="350px" alignItems={'stretch'} paddingTop={1} {...props}>
      <VStack flex={1} height="100%" justifyContent="space-between" alignItems="flex-end" paddingTop="1px">
        {steps.map((step, index) => {
          const isActive = index === activeButtonIndex
          const isDisabled = activeStepIndex < index || step.isDisabled

          return (
            <Button
              as={Link}
              to={step.path}
              w={{ base: '100%', md: 'auto' }}
              variant={isActive ? 'soft' : 'ghost'}
              colorScheme={isActive ? 'primary1' : 'neutral1'}
              key={index}
              pointerEvents={isDisabled ? 'none' : 'auto'}
              color={isDisabled ? 'neutral1.8' : 'neutral1.11'}
              justifyContent={{ base: 'flex-start', md: 'center' }}
            >
              {step.title}
            </Button>
          )
        })}
      </VStack>

      <Stepper index={activeStepIndex} orientation="vertical" gap="0" paddingY={2} size="xs">
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

export const getProjectCreationRoute = (lastCreationStep: ProjectCreationStep, projectId: string) => {
  switch (lastCreationStep) {
    case ProjectCreationStep.ProjectDetails:
      return getPath('launchProjectDetails', projectId)
    case ProjectCreationStep.FundingGoal:
      return getPath('launchFundingGoal', projectId)
    case ProjectCreationStep.FundingType:
      return getPath('launchFundingStrategy', projectId)
    case ProjectCreationStep.PerksAndProducts:
      return getPath('launchProjectRewards', projectId)
    case ProjectCreationStep.Story:
      return getPath('launchStory', projectId)
    case ProjectCreationStep.AboutYou:
      return getPath('launchAboutYou', projectId)
    case ProjectCreationStep.Wallet:
      return getPath('launchPayment', projectId)
    case ProjectCreationStep.TaxId:
      return getPath('launchPaymentTaxId', projectId)
    case ProjectCreationStep.IdentityVerification:
      return getPath('launchPaymentAccountPassword', projectId)
    case ProjectCreationStep.Launch:
      return getPath('launchFinalize', projectId)

    default:
      return getPath('launchProjectDetails', projectId)
  }
}

const projectCreationStepIndex = {
  [ProjectCreationStep.ProjectDetails]: 0,
  [ProjectCreationStep.FundingGoal]: 1,
  [ProjectCreationStep.FundingType]: 1,
  [ProjectCreationStep.PerksAndProducts]: 2,
  [ProjectCreationStep.Story]: 3,
  [ProjectCreationStep.AboutYou]: 4,
  [ProjectCreationStep.Wallet]: 5,
  [ProjectCreationStep.TaxId]: 5,
  [ProjectCreationStep.IdentityVerification]: 5,
  [ProjectCreationStep.Launch]: 6,
}
