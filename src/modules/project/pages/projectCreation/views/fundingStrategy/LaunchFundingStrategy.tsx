import { Badge, Circle, Divider, HStack, Icon, StackProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { PiCheck, PiQuestion } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../components/ProjectCreationPageWrapper.tsx'
import { useCurrentUserIsFieldPartner } from '../../hooks/useCurrentUserIsFieldPartner.ts'
import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import {
  getProjectFundingStrategyInput,
  ProjectCreationFundingOption,
  projectCreationFundingOptionAtom,
  RecoverableGrantFundingOption,
} from '../../states/fundingStrategyAtom.ts'

const options: Record<
  ProjectCreationFundingOption,
  {
    title: string
    body: string
    recommendedFor: string
    benefit: string
    badge?: string
  }
> = {
  [ProjectFundingStrategy.TakeItAll]: {
    title: t('Open Funding'),
    body: t('Receive contributions as they come in.'),
    recommendedFor: t('Ongoing projects, donations, communities, and creators who want flexibility.'),
    benefit: t('Funds are available immediately.'),
  },
  [ProjectFundingStrategy.AllOrNothing]: {
    title: t('All-or-Nothing'),
    badge: t('Beta'),
    body: t('Receive funds only if you reach your goal before the deadline.'),
    recommendedFor: t('Projects that need a minimum amount to start, build, or deliver something.'),
    benefit: t('Builds trust with contributors.'),
  },
  [RecoverableGrantFundingOption]: {
    title: t('Recoverable Grant'),
    body: t(
      '0% interest grants that are repaid over time, then reused to fund the next local project without creating a debt burden.',
    ),
    recommendedFor: t(
      'Local businesses and entrepreneurs in circular economy hubs who need working capital, community trust, and a safer path to growth.',
    ),
    benefit: t('Uses All-or-Nothing mechanics with recoverable grant reporting.'),
  },
}

const resolveProjectFundingOption = ({
  fundingStrategy,
  isRecoverableGrant,
  storedFundingOption,
}: {
  fundingStrategy?: ProjectFundingStrategy | null
  isRecoverableGrant?: boolean
  storedFundingOption: ProjectCreationFundingOption | null
}): ProjectCreationFundingOption => {
  if (isRecoverableGrant) {
    return RecoverableGrantFundingOption
  }

  return fundingStrategy || storedFundingOption || ProjectFundingStrategy.TakeItAll
}

export const LaunchFundingStrategy = () => {
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()
  const [storedFundingOption, setStoredFundingOption] = useAtom(projectCreationFundingOptionAtom)
  const { isFieldPartner } = useCurrentUserIsFieldPartner()

  const { project } = useProjectAtom()
  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingType,
    getPath('launchProjectDetails', project.id),
  )

  const isNewProject = !params.projectId || params.projectId === 'new'
  const { isRecoverableGrant } = project as { isRecoverableGrant?: boolean }

  const fundingOptionFromProject = resolveProjectFundingOption({
    fundingStrategy: project.fundingStrategy,
    isRecoverableGrant,
    storedFundingOption,
  })

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
    isDisabled: false,
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
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.TakeItAll}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <OptionButton
            fundingStrategy={ProjectFundingStrategy.AllOrNothing}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          {isFieldPartner ? (
            <OptionButton
              fundingStrategy={RecoverableGrantFundingOption}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : null}
        </VStack>

        <HelpCard isFieldPartner={isFieldPartner} />
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

const HelpCard = ({ isFieldPartner }: { isFieldPartner: boolean }) => {
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
          {isFieldPartner
            ? t(
                'Choose Open Funding if you want maximum flexibility. Choose All-or-Nothing if your project depends on hitting a clear target. Choose Recoverable Grant for Field Partner-led grant projects.',
              )
            : t(
                'Choose Open Funding if you want maximum flexibility. Choose All-or-Nothing if your project depends on hitting a clear target.',
              )}
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
  fundingStrategy: ProjectCreationFundingOption
  selectedOption: ProjectCreationFundingOption
  setSelectedOption: (fundingStrategy: ProjectCreationFundingOption) => void
} & StackProps) => {
  const { title, body, recommendedFor, benefit, badge } = options[fundingStrategy]
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
        {isSelected ? <Circle size="12px" bg="utils.pbg" /> : null}
      </Circle>

      <VStack w="full" alignItems="stretch" spacing={4}>
        <VStack alignItems="flex-start" spacing={1}>
          <HStack spacing={3} alignItems="center" flexWrap="wrap">
            <H2 size="xl" bold>
              {title}
            </H2>
            {badge ? (
              <Badge colorScheme="primary1" borderRadius="full" px={3} py={1} textTransform="none">
                {badge}
              </Badge>
            ) : null}
          </HStack>
          <Body>{body}</Body>
        </VStack>

        <VStack alignItems="flex-start" spacing={1}>
          <Body bold>{t('Best for')}</Body>
          <Body>{recommendedFor}</Body>
        </VStack>

        <Divider />

        <HStack spacing={3}>
          <Circle size="24px" border="2px solid" borderColor={isSelected ? 'primary1.9' : 'neutral1.7'} flexShrink={0}>
            <Icon as={PiCheck} fontSize="14px" color={isSelected ? 'primary1.9' : 'neutral1.7'} />
          </Circle>
          <Body>{benefit}</Body>
        </HStack>
      </VStack>
    </HStack>
  )
}
