import { Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { useGoalsAtom, useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { GoalModal } from '@/modules/project/pages/projectView/components/GoalModal.tsx'
import { useGoalsModal } from '@/modules/project/pages/projectView/hooks/useGoalsModal.tsx'
import { useProjectGoalForm } from '@/modules/project/pages/projectView/hooks/useProjectGoalForm.tsx'
import { RenderGoals } from '@/modules/project/pages/projectView/views/goals/common/RenderGoals.tsx'
import { AmountInput } from '@/shared/components/form/AmountInput.tsx'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, Satoshis, USDCents, USDollars } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'

export const OpenFundingGoal = () => {
  const navigate = useNavigate()

  const { project } = useProjectAtom()
  const { inProgressGoals } = useGoalsAtom()
  const isManagedCircularGrant = isManagedCircularGrantProject(project)

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingGoal,
    getPath('launchStory', project.id),
  )

  const { onGoalModalOpen } = useGoalsModal()

  if (isManagedCircularGrant) {
    return <ManagedCircularGrantGoal />
  }

  const continueProps = {
    onClick() {
      updateProjectWithLastCreationStep()
    },
    label: inProgressGoals.length > 0 ? t('Continue') : t('Skip for now'),
    isDisabled: false,
  }

  const backButtonProps = {
    onClick() {
      navigate(getPath('launchProjectDetails', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Funding Goals')}
      continueButtonProps={continueProps}
      backButtonProps={backButtonProps}
    >
      <VStack w="full" h="full" align="flex-start" spacing={8}>
        <Body size="sm">
          {t(
            'Set one goal or more to help your contributors understand how you plan to use the funds. If you create multiple goals, contributions will go towards the default goal. You can re-order the goals to set a different default goal at any time.',
          )}
        </Body>

        <RenderGoals creationMode />
        <Button width="full" size="xl" variant="soft" colorScheme="neutral1" onClick={() => onGoalModalOpen()}>
          {t('Add a goal')}
        </Button>
      </VStack>
      <GoalModal />
    </ProjectCreationPageWrapper>
  )
}

const ManagedCircularGrantGoal = () => {
  const navigate = useNavigate()
  const { project } = useProjectAtom()
  const { inProgressGoals } = useGoalsAtom()
  const goal = inProgressGoals[0] || null

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.FundingGoal,
    getPath('launchStory', project.id),
  )

  const { getSatoshisFromUSDCents, getUSDAmount } = useBTCConverter()
  const { handleSubmit, loading, errors, enableSubmit, setValue, watch } = useProjectGoalForm({
    goal,
    projectId: project.id,
    managedCircularGrant: true,
    onClose: updateProjectWithLastCreationStep,
  })
  const amount = watch('targetAmount') || 0
  const [isSatoshi, setIsSatoshi] = useState(true)
  const [amountUSD, setAmountUSD] = useState(() => getUSDAmount(amount as Satoshis))

  useEffect(() => {
    setAmountUSD(getUSDAmount(amount as Satoshis))
  }, [amount, getUSDAmount])

  const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replaceAll(',', '')) || 0
    if (isSatoshi) {
      setValue('targetAmount', value, { shouldDirty: true, shouldValidate: true })
      return
    }

    setAmountUSD(value as USDollars)
    setValue('targetAmount', getSatoshisFromUSDCents((value * 100) as USDCents), {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProjectCreationPageWrapper
        title={t('Funding Goal')}
        continueButtonProps={{
          type: 'submit',
          isLoading: loading,
          isDisabled: !enableSubmit,
        }}
        backButtonProps={{
          onClick: () => navigate(getPath('launchProjectDetails', project.id)),
        }}
      >
        <VStack w="full" h="full" align="flex-start" spacing={8}>
          <Body size="sm">
            {t(
              'Set the Circular Grant goal amount. This goal amount cannot be edited after the project has launched.',
            )}
          </Body>
          <FieldContainer title={t('Goal amount')} error={errors.targetAmount?.message}>
            <AmountInput
              satoshi={amount}
              dollar={amountUSD}
              isSatoshi={isSatoshi}
              handleInput={handleAmountInput}
              onToggle={() => setIsSatoshi((current) => !current)}
            />
          </FieldContainer>
        </VStack>
      </ProjectCreationPageWrapper>
    </form>
  )
}
