import { ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { LegalEntitySelection } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/components/LegalEntitySelection.tsx'
import { useTaxProfileForm } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/useTaxProfileForm.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'
import { useUpdateProjectWithLastCreationStep } from '../../../hooks/useIsStepAhead.tsx'
import { shouldShowCreationFiatStep } from '../utils/stripeConnect.ts'

export const LaunchPaymentTaxId = () => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const navigate = useNavigate()
  const isAon = isAllOrNothing(project)
  const countryCode = project.location?.country?.code?.toUpperCase()

  const shouldConfigureProjectWallet = project.fundingStrategy === ProjectFundingStrategy.TakeItAll && !project.rskEoa
  const shouldShowAccountPasswordStep = isAon || shouldConfigureProjectWallet
  const shouldShowFiatContributionsStep = shouldShowCreationFiatStep(project)
  let nextPath = getPath('launchFinalize', project.id)
  let lastCreationStepOverride: ProjectCreationStep | undefined = ProjectCreationStep.Launch

  if (shouldShowAccountPasswordStep) {
    nextPath = getPath('launchPaymentAccountPassword', project.id)
    lastCreationStepOverride = undefined
  } else if (shouldShowFiatContributionsStep) {
    nextPath = getPath('launchPaymentFiatContributions', project.id)
    lastCreationStepOverride = ProjectCreationStep.Launch
  }

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    nextPath,
  )

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return
    }

    console.debug('[LaunchPaymentTaxId] next-step decision', {
      projectId: project.id,
      lastCreationStep: project.lastCreationStep,
      fundingStrategy: project.fundingStrategy,
      isAon,
      rskEoa: project.rskEoa,
      countryCode: countryCode || null,
      shouldConfigureProjectWallet,
      shouldShowAccountPasswordStep,
      shouldShowFiatContributionsStep,
      nextPath,
      lastCreationStepOverride,
    })
  }, [
    countryCode,
    isAon,
    lastCreationStepOverride,
    nextPath,
    project.fundingStrategy,
    project.id,
    project.lastCreationStep,
    project.rskEoa,
    shouldConfigureProjectWallet,
    shouldShowAccountPasswordStep,
    shouldShowFiatContributionsStep,
  ])

  const handleTaxIdComplete = () => {
    if (import.meta.env.DEV) {
      console.debug('[LaunchPaymentTaxId] continue', {
        projectId: project.id,
        nextPath,
        lastCreationStepOverride,
      })
    }

    updateProjectWithLastCreationStep(undefined, undefined, lastCreationStepOverride)
  }

  const { form, handleSubmit } = useTaxProfileForm({ userId: user.id, onUpdate: handleTaxIdComplete })

  const continueProps: ButtonProps = {
    onClick() {
      if (form.formState.isDirty) {
        handleSubmit()
      } else {
        handleTaxIdComplete()
      }
    },
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPayment', project.id))
    },
  }

  return (
    <ProjectCreationPageWrapper
      title={t('Wallet Tax ID (optional)')}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
    >
      <VStack w="full" alignItems="start" gap={2}>
        <Body>{t('Add Tax information to all contribution invoices made to your project.')}</Body>
        <LegalEntitySelection form={form} />
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
