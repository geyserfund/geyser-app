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
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Link, useLocation } from 'react-router'

import { isLabifOpenFundingProject } from '@/modules/project/domain/labifOpenFunding.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import { ProjectCreationStep } from '@/types/index.ts'

import { CircularGrantFundingOption, projectCreationFundingOptionAtom } from '../states/fundingStrategyAtom.ts'
import { projectCreationStepIndex } from '../utils/projectCreationSteps.ts'

export { getProjectCreationRoute } from '../utils/getProjectCreationRoute.ts'

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

/** Completed and current steps in forest, upcoming steps in sand. */
const stepIndicatorSx = {
  '[data-status=complete] &': {
    background: 'primary1.9',
    borderColor: 'primary1.9',
    color: 'utils.primaryContrast',
  },
  '[data-status=active] &': {
    background: 'utils.pageBg',
    borderColor: 'primary1.9',
  },
  '[data-status=incomplete] &': {
    background: 'utils.pageBg',
    borderColor: 'neutral1.6',
  },
}

const stepSeparatorSx = {
  '[data-status=complete] &': {
    background: 'primary1.9',
  },
  '[data-status=active] &': {
    background: 'neutral1.6',
  },
  '[data-status=incomplete] &': {
    background: 'neutral1.6',
  },
}

const ProjectCreationNavigation = (props: StackProps) => {
  const { project } = useProjectAtom()
  const selectedFundingOption = useAtomValue(projectCreationFundingOptionAtom)
  const location = useLocation()
  const isLabifOpenFunding = isLabifOpenFundingProject(project)
  const fundingGoalTitle =
    project?.id && project.isCircularGrant
      ? 'Circular Grant'
      : selectedFundingOption === CircularGrantFundingOption
      ? 'Circular Grant'
      : 'Funding Goal'
  /** Step titles are translation keys; they are translated at render time. */
  const steps = useMemo(
    () => [
      { title: 'Project Details', path: getPath('launchProjectDetails', project?.id || 'new') },
      { title: fundingGoalTitle, path: getPath('launchFundingGoal', project?.id), isDisabled: !project.id },
      { title: 'Story', path: getPath('launchStory', project?.id), isDisabled: !project.id },
      { title: 'About You', path: getPath('launchAboutYou', project?.id), isDisabled: !project.id },
      {
        title: 'Payment Settings',
        path: getPath('launchPayment', project?.id),
        isDisabled: !project.id || !isLabifOpenFunding,
      },
      { title: 'Launch', path: getPath('launchFinalize', project?.id), isDisabled: !project.id },
    ],
    [fundingGoalTitle, isLabifOpenFunding, project?.id],
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
    const stepIndex = projectCreationStepIndex[project?.lastCreationStep as ProjectCreationStep] || 0

    return Math.min(stepIndex, projectCreationStepIndex[ProjectCreationStep.Launch])
  }, [project?.lastCreationStep])

  return (
    <HStack w="150px" height="350px" alignItems={'stretch'} paddingTop={1} {...props}>
      <VStack flex={1} height="100%" justifyContent="space-between" alignItems="flex-end" paddingTop="1px">
        {steps.map((step, index) => {
          const isActive = index === activeButtonIndex
          const isDisabled = activeStepIndex < index || step.isDisabled
          const inactiveColor = isDisabled ? 'neutral1.11' : 'primary1.11'

          return (
            <Button
              as={Link}
              to={step.path}
              w={{ base: '100%', md: 'auto' }}
              variant={isActive ? 'soft' : 'ghost'}
              colorScheme={isActive ? 'primary1' : 'neutral1'}
              key={step.path}
              pointerEvents={isDisabled ? 'none' : 'auto'}
              aria-current={isActive ? 'step' : undefined}
              aria-disabled={isDisabled || undefined}
              tabIndex={isDisabled ? -1 : undefined}
              color={isActive ? 'primary1.11' : inactiveColor}
              _disabled={{ backgroundColor: 'transparent', color: 'neutral1.8' }}
              justifyContent={{ base: 'flex-start', md: 'center' }}
            >
              {t(step.title)}
            </Button>
          )
        })}
      </VStack>

      <Stepper index={activeStepIndex} orientation="vertical" gap="0" paddingY={2} size="xs">
        {steps.map((step, index) => {
          return (
            <Step key={step.path} display="flex" alignItems="flex-start">
              <StepIndicator sx={stepIndicatorSx}>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>

              <StepSeparator sx={stepSeparatorSx} />
            </Step>
          )
        })}
      </Stepper>
    </HStack>
  )
}
