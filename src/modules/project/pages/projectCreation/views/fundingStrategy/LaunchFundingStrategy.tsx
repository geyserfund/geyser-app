import { Circle, Divider, HStack, Icon, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom, useAtomValue } from 'jotai'
import { useRef, useState } from 'react'
import { PiCheck, PiQuestion } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router'

import { canCreateManagedCircularGrant, isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { labifApplicationAtom } from '@/shared/state/labifApplicationAtom.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../components/ProjectCreationPageWrapper.tsx'
import { useCurrentUserIsFieldPartner } from '../../hooks/useCurrentUserIsFieldPartner.ts'
import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import {
  CircularGrantFundingOption,
  getProjectFundingStrategyInput,
  projectCreationFundingOptionAtom,
  type ProjectCreationFundingOption,
} from '../../states/fundingStrategyAtom.ts'

const options: Record<
  ProjectFundingStrategy.TakeItAll | typeof CircularGrantFundingOption,
  {
    title: string
    body: string
    recommendedFor: string
    benefit: string
  }
> = {
  [ProjectFundingStrategy.TakeItAll]: {
    title: t('Open Funding'),
    body: t('Receive contributions as they come in.'),
    recommendedFor: t('Ongoing projects, donations, communities, and creators who want flexibility.'),
    benefit: t('Funds are available as contributions come in.'),
  },
  [CircularGrantFundingOption]: {
    title: t('Circular Grant'),
    body: t(
      '0% interest working capital that is repaid over time and reused to fund the next local project.',
    ),
    recommendedFor: t(
      'Local businesses and entrepreneurs in circular economy hubs who need working capital, community trust, and a safer path to growth.',
    ),
    benefit: t('Repayments help fund the next local project without creating a debt burden.'),
  },
}

const resolveProjectFundingOption = ({
  fundingStrategy,
  isCircularGrant,
  storedFundingOption,
}: {
  fundingStrategy?: ProjectFundingStrategy | null
  isCircularGrant?: boolean
  storedFundingOption: ProjectCreationFundingOption
}): ProjectCreationFundingOption => {
  if (isCircularGrant) {
    return CircularGrantFundingOption
  }

  if (fundingStrategy === ProjectFundingStrategy.TakeItAll) {
    return ProjectFundingStrategy.TakeItAll
  }

  return storedFundingOption === CircularGrantFundingOption
    ? ProjectFundingStrategy.TakeItAll
    : storedFundingOption
}

export const LaunchFundingStrategy = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()
  const [storedFundingOption, setStoredFundingOption] = useAtom(projectCreationFundingOptionAtom)
  const isLabifApplication = useAtomValue(labifApplicationAtom)
  const { isFieldPartner } = useCurrentUserIsFieldPartner()

  const { project } = useProjectAtom()
  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingType,
    getPath('launchProjectDetails', project.id),
  )

  const isNewProject = !params.projectId || params.projectId === 'new'
  const showOpenFundingOption = isLabifApplication || (!isNewProject && !isManagedCircularGrantProject(project) && project.fundingStrategy === ProjectFundingStrategy.TakeItAll)
  const showCircularGrantOption = canCreateManagedCircularGrant(isFieldPartner) || isManagedCircularGrantProject(project)

  const fundingOptionFromProject = showOpenFundingOption
    ? resolveProjectFundingOption({
        fundingStrategy: isNewProject ? ProjectFundingStrategy.TakeItAll : project.fundingStrategy,
        isCircularGrant: isNewProject ? false : isManagedCircularGrantProject(project),
        storedFundingOption: isNewProject ? ProjectFundingStrategy.TakeItAll : storedFundingOption,
      })
    : CircularGrantFundingOption

  const [selectedOption, setSelectedOption] = useState<ProjectCreationFundingOption>(() => fundingOptionFromProject)
  const prevFundingOptionFromProjectRef = useRef(fundingOptionFromProject)

  if (fundingOptionFromProject !== prevFundingOptionFromProjectRef.current) {
    prevFundingOptionFromProjectRef.current = fundingOptionFromProject
    setSelectedOption(fundingOptionFromProject)
  }

  const continueProps = {
    onClick() {
      setStoredFundingOption(selectedOption)

      if (isNewProject) {
        navigate(getPath('launchProjectDetails', 'new'))
        return
      }

      const selectedFundingStrategy = getProjectFundingStrategyInput(selectedOption)
      if (project.fundingStrategy === selectedFundingStrategy) {
        updateProjectWithLastCreationStep(undefined, undefined, ProjectCreationStep.ProjectDetails)
      } else {
        updateProjectWithLastCreationStep(
          {
            fundingStrategy: selectedFundingStrategy,
          },
          undefined,
          ProjectCreationStep.ProjectDetails,
        )
      }
    },
    isDisabled:
      (selectedOption === CircularGrantFundingOption && !showCircularGrantOption) ||
      (selectedOption === ProjectFundingStrategy.TakeItAll && !showOpenFundingOption),
  }

  const backButtonProps = {
    onClick() {
      navigate(isNewProject ? getPath('launchStart') : getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Funding Strategy')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={5}>
        <Body size="lg">{t('Choose how you want to receive contributions.')}</Body>

        <VStack w="full" alignItems="stretch" spacing={4}>
          {showOpenFundingOption ? (
            <OptionButton
              fundingStrategy={ProjectFundingStrategy.TakeItAll}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : null}
          {showCircularGrantOption ? (
            <OptionButton
              fundingStrategy={CircularGrantFundingOption}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : null}
        </VStack>

        <HelpCard isFieldPartner={showCircularGrantOption} showOpenFunding={showOpenFundingOption} />
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

const HelpCard = ({ isFieldPartner, showOpenFunding }: { isFieldPartner: boolean; showOpenFunding: boolean }) => {
  return (
    <HStack
      w="full"
      alignItems="flex-start"
      spacing={4}
      border="1px solid"
      borderColor="neutral1.4"
      borderRadius="8px"
      px={{ base: 4, md: 6 }}
      py={5}
    >
      <Circle size="40px" bg="neutral1.3" flexShrink={0}>
        <Icon as={PiQuestion} color="neutral1.9" fontSize="22px" />
      </Circle>
      <VStack alignItems="flex-start" spacing={1}>
        <Body bold size="lg">
          {t('Not sure which one to choose?')}
        </Body>
        <Body>
          {showOpenFunding
            ? isFieldPartner
              ? t(
                  'Choose Open Funding to apply for LABIF. Choose Circular Grant for Field Partner-led grant projects.',
                )
              : t('Open Funding lets people contribute as they go, and funds are available as they come in.')
            : t('Circular Grants provide 0% interest working capital that is repaid over time.')}
        </Body>
      </VStack>
    </HStack>
  )
}

const OptionButton = ({
  fundingStrategy,
  selectedOption,
  setSelectedOption,
  ...rest
}: {
  fundingStrategy: ProjectFundingStrategy.TakeItAll | typeof CircularGrantFundingOption
  selectedOption: ProjectCreationFundingOption
  setSelectedOption: (fundingStrategy: ProjectCreationFundingOption) => void
} & StackProps) => {
  const { title, body, recommendedFor, benefit } = options[fundingStrategy]
  const isSelected = selectedOption === fundingStrategy

  return (
    <HStack
      w="full"
      border="1px solid"
      borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
      bg={isSelected ? 'primary1.1' : 'utils.pbg'}
      _hover={{ borderColor: isSelected ? 'primary1.9' : 'neutral1.8' }}
      borderRadius="8px"
      px={{ base: 4, md: 5 }}
      py={5}
      cursor="pointer"
      alignItems="flex-start"
      spacing={4}
      onClick={() => setSelectedOption(fundingStrategy)}
      role="button"
      aria-pressed={isSelected}
      {...rest}
    >
      <Circle
        size="32px"
        border="2px solid"
        borderColor={isSelected ? 'primary1.9' : 'neutral1.6'}
        bg={isSelected ? 'primary1.9' : 'transparent'}
        flexShrink={0}
        mt={1}
      >
        {isSelected ? <Icon as={PiCheck} fontSize="18px" color="utils.pbg" /> : null}
      </Circle>

      <VStack w="full" alignItems="flex-start" spacing={3}>
        <VStack w="full" alignItems="flex-start" spacing={1}>
          <H2 size="xl" bold>
            {title}
          </H2>
          <Body>{body}</Body>
        </VStack>

        <VStack alignItems="flex-start" spacing={1}>
          <Body bold>{t('Best for')}</Body>
          <Body>{recommendedFor}</Body>
        </VStack>

        <Divider />

        <HStack spacing={3}>
          <Circle size="24px" border="2px solid" borderColor="primary1.9" flexShrink={0}>
            <Icon as={PiCheck} fontSize="14px" color="primary1.9" />
          </Circle>
          <Body>{benefit}</Body>
        </HStack>
      </VStack>
    </HStack>
  )
}
