import { Box, Divider, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import type { KeyboardEvent, ReactNode } from 'react'
import { PiArrowsClockwise, PiCheckCircleFill, PiCircle } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router'

import { canCreateManagedCircularGrant } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../components/ProjectCreationPageWrapper.tsx'
import { useCurrentUserIsFieldPartner } from '../../hooks/useCurrentUserIsFieldPartner.ts'
import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { CircularGrantFundingOption, projectCreationFundingOptionAtom } from '../../states/fundingStrategyAtom.ts'

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
  const showCircularGrantOption = canCreateManagedCircularGrant(isFieldPartner)
  const selectedFundingOption = isNewProject
    ? storedFundingOption
    : project.isCircularGrant
    ? CircularGrantFundingOption
    : ProjectFundingStrategy.TakeItAll

  const continueProps = {
    onClick() {
      setStoredFundingOption(selectedFundingOption)

      if (isNewProject) {
        navigate(getPath('launchProjectDetails', 'new'))
        return
      }

      updateProjectWithLastCreationStep(
        {
          fundingStrategy: ProjectFundingStrategy.TakeItAll,
        },
        undefined,
        ProjectCreationStep.ProjectDetails,
      )
    },
    isDisabled: selectedFundingOption === CircularGrantFundingOption && !showCircularGrantOption,
  }

  const backButtonProps = {
    onClick() {
      navigate(isNewProject ? getPath('discoveryLanding') : getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Choose your funding type')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack
        w="full"
        h="full"
        align="flex-start"
        spacing={5}
        role="radiogroup"
        aria-label={t('Choose your funding type')}
      >
        <FundingOptionCard
          selected={selectedFundingOption === ProjectFundingStrategy.TakeItAll}
          onSelect={() => setStoredFundingOption(ProjectFundingStrategy.TakeItAll)}
        >
          <OpenFundingExplainer selected={selectedFundingOption === ProjectFundingStrategy.TakeItAll} />
        </FundingOptionCard>

        <FundingOptionCard
          selected={selectedFundingOption === CircularGrantFundingOption}
          disabled={!showCircularGrantOption}
          onSelect={() => setStoredFundingOption(CircularGrantFundingOption)}
        >
          <CircularGrantExplainer selected={selectedFundingOption === CircularGrantFundingOption} />
        </FundingOptionCard>

        {!showCircularGrantOption && isNewProject ? (
          <Body size="md" light>
            {t('Only Field Partners can create Circular Grant projects.')}
          </Body>
        ) : null}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

/** Funding type option tile: plain bordered when idle, forest border and tint when selected. */
const FundingOptionCard = ({
  children,
  selected,
  disabled = false,
  onSelect,
}: {
  children: ReactNode
  selected: boolean
  disabled?: boolean
  onSelect: () => void
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect()
    }
  }

  return (
    <Box
      w="full"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      border="1px solid"
      borderColor={selected ? 'primary1.9' : 'neutral1.6'}
      backgroundColor={selected ? 'primary1.2' : 'utils.pbg'}
      borderRadius="card"
      opacity={disabled ? 0.55 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      transition="border-color 0.2s, background-color 0.2s"
      _hover={{ borderColor: selected ? 'primary1.9' : 'primary1.8' }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'primary1.8', outlineOffset: '2px' }}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      {children}
    </Box>
  )
}

const SelectionIndicator = ({ selected }: { selected: boolean }) => (
  <Icon
    as={selected ? PiCheckCircleFill : PiCircle}
    boxSize="24px"
    color={selected ? 'primary1.11' : 'neutral1.11'}
    flexShrink={0}
    mt="2px"
    aria-hidden
  />
)

const OpenFundingExplainer = ({ selected }: { selected: boolean }) => {
  return (
    <VStack w="full" align="stretch" spacing={4} px={{ base: 4, md: 5 }} py={5}>
      <HStack alignItems="flex-start" spacing={4}>
        <SelectionIndicator selected={selected} />
        <VStack w="full" alignItems="flex-start" spacing={1}>
          <H3 size="lg" bold>
            {t('Open Funding')}
          </H3>
          <Body>{t('Raise funds directly from your community and use them as they come in.')}</Body>
        </VStack>
      </HStack>
      <Body light>
        {t('Only applications to LABIF can create Open Funding projects. Other projects will be rejected.')}
      </Body>
    </VStack>
  )
}

const CircularGrantExplainer = ({ selected }: { selected: boolean }) => {
  return (
    <VStack w="full" align="stretch" spacing={4} px={{ base: 4, md: 5 }} py={5}>
      <HStack alignItems="flex-start" spacing={4}>
        <SelectionIndicator selected={selected} />

        <VStack w="full" alignItems="flex-start" spacing={1}>
          <H3 size="lg" bold>
            {t('Circular Grant')}
          </H3>
          <Body>
            {t(
              'Circular Grants provide 0% interest working capital that is repaid over time and reused to fund the next local project.',
            )}
          </Body>
        </VStack>
      </HStack>

      <VStack alignItems="flex-start" spacing={1} pl={{ base: 0, md: '40px' }}>
        <Body bold>{t('Best for')}</Body>
        <Body>
          {t(
            'Local businesses and entrepreneurs in circular economy hubs who need working capital, community trust, and a safer path to growth.',
          )}
        </Body>
      </VStack>

      <Divider borderColor="neutral1.6" />

      <HStack spacing={4}>
        <Icon as={PiArrowsClockwise} boxSize="24px" color="primary1.11" flexShrink={0} aria-hidden />
        <Body>{t('Repayments help fund the next local project without creating a debt burden.')}</Body>
      </HStack>
    </VStack>
  )
}
