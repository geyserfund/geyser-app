import { Box, Circle, Divider, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { PiCheck } from 'react-icons/pi'
import type { ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router'

import { canCreateManagedCircularGrant } from '@/modules/project/domain/managedCircularGrant.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body, H2 } from '@/shared/components/typography'
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
      navigate(isNewProject ? getPath('launchStart') : getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Choose your funding type')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={5}>
        <FundingOptionCard selected={selectedFundingOption === ProjectFundingStrategy.TakeItAll}>
          <OpenFundingExplainer onClick={() => setStoredFundingOption(ProjectFundingStrategy.TakeItAll)} />
        </FundingOptionCard>

        <FundingOptionCard
          selected={selectedFundingOption === CircularGrantFundingOption}
          disabled={!showCircularGrantOption}
        >
          <CircularGrantExplainer onClick={() => setStoredFundingOption(CircularGrantFundingOption)} />
        </FundingOptionCard>

        {!showCircularGrantOption && isNewProject ? (
          <Body size="md" light color="neutral1.7">
            {t('Only Field Partners can create Circular Grant projects.')}
          </Body>
        ) : null}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

const FundingOptionCard = ({
  children,
  selected,
  disabled = false,
}: {
  children: ReactNode
  selected: boolean
  disabled?: boolean
}) => (
  <Box
    w="full"
    border="2px solid"
    borderColor={selected ? 'primary1.9' : 'neutral1.6'}
    borderRadius="10px"
    opacity={disabled ? 0.55 : 1}
    pointerEvents={disabled ? 'none' : 'auto'}
    cursor={disabled ? 'not-allowed' : 'pointer'}
  >
    {children}
  </Box>
)

const OpenFundingExplainer = ({ onClick }: { onClick: () => void }) => {
  return (
    <VStack
      w="full"
      align="stretch"
      spacing={4}
      bg="utils.bg"
      borderRadius="8px"
      px={{ base: 4, md: 5 }}
      py={5}
      onClick={onClick}
    >
      <HStack alignItems="flex-start" spacing={4}>
        <Circle size="32px" bg="primary1.9" flexShrink={0} mt={1}>
          <Icon as={PiCheck} fontSize="18px" color="utils.pbg" />
        </Circle>
        <VStack w="full" alignItems="flex-start" spacing={1}>
          <H2 size="xl" bold>{t('Open Funding')}</H2>
          <Body>
            {t('Raise funds directly from your community and use them as they come in.')}
          </Body>
        </VStack>
      </HStack>
      <Body light color="neutral1.7">
        {t('Only applications to LABIF can create Open Funding projects. Other projects will be rejected.')}
      </Body>
    </VStack>
  )
}

const CircularGrantExplainer = ({ onClick }: { onClick: () => void }) => {
  return (
    <VStack
      w="full"
      align="stretch"
      spacing={4}
      border="1px solid"
      borderColor="primary1.9"
      bg="primary1.1"
      borderRadius="8px"
      px={{ base: 4, md: 5 }}
      py={5}
      onClick={onClick}
    >
      <HStack alignItems="flex-start" spacing={4}>
        <Circle size="32px" bg="primary1.9" flexShrink={0} mt={1}>
          <Icon as={PiCheck} fontSize="18px" color="utils.pbg" />
        </Circle>

        <VStack w="full" alignItems="flex-start" spacing={1}>
          <H2 size="xl" bold>
            {t('Circular Grant')}
          </H2>
          <Body>
            {t(
              'Circular Grants provide 0% interest working capital that is repaid over time and reused to fund the next local project.',
            )}
          </Body>
        </VStack>
      </HStack>

      <VStack alignItems="flex-start" spacing={1} pl={{ base: 0, md: '48px' }}>
        <Body bold>{t('Best for')}</Body>
        <Body>
          {t(
            'Local businesses and entrepreneurs in circular economy hubs who need working capital, community trust, and a safer path to growth.',
          )}
        </Body>
      </VStack>

      <Divider />

      <HStack spacing={3}>
        <Circle size="24px" border="2px solid" borderColor="primary1.9" flexShrink={0}>
          <Icon as={PiCheck} fontSize="14px" color="primary1.9" />
        </Circle>
        <Body>{t('Repayments help fund the next local project without creating a debt burden.')}</Body>
      </HStack>
    </VStack>
  )
}
