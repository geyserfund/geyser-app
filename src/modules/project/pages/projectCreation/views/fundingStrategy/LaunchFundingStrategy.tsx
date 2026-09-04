import { Circle, Divider, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { PiCheck } from 'react-icons/pi'
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
  const setStoredFundingOption = useSetAtom(projectCreationFundingOptionAtom)
  const { isFieldPartner } = useCurrentUserIsFieldPartner()

  const { project } = useProjectAtom()
  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingType,
    getPath('launchProjectDetails', project.id),
  )

  const isNewProject = !params.projectId || params.projectId === 'new'
  const showCircularGrantOption = canCreateManagedCircularGrant(isFieldPartner)

  const continueProps = {
    onClick() {
      setStoredFundingOption(CircularGrantFundingOption)

      if (isNewProject) {
        navigate(getPath('launchProjectDetails', 'new'))
        return
      }

      if (project.fundingStrategy === ProjectFundingStrategy.TakeItAll) {
        updateProjectWithLastCreationStep(undefined, undefined, ProjectCreationStep.ProjectDetails)
      } else {
        updateProjectWithLastCreationStep(
          {
            fundingStrategy: ProjectFundingStrategy.TakeItAll,
          },
          undefined,
          ProjectCreationStep.ProjectDetails,
        )
      }
    },
    isDisabled: isNewProject && !showCircularGrantOption,
  }

  const backButtonProps = {
    onClick() {
      navigate(isNewProject ? getPath('launchStart') : getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('You are creating a Circular Grant')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={5}>
        <CircularGrantExplainer />

        {!showCircularGrantOption && isNewProject ? (
          <Body size="md" light color="neutral1.7">
            {t('Only Field Partners can create Circular Grant projects.')}
          </Body>
        ) : null}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}

const CircularGrantExplainer = () => {
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
