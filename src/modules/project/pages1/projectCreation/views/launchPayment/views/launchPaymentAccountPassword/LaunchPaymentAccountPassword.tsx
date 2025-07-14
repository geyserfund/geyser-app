import { ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, useAccountKeysQuery, UserAccountKeysFragment } from '@/types/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../../../hooks/useIsStepAhead.tsx'
import { ProjectCreationLayout } from '../../../../Layouts/ProjectCreationLayout.tsx'
import { ConfirmPasswordForm, useConfirmPasswordForm } from './views/ConfirmPasswordForm.tsx'
import { CreatePasswordForm, useCreateAccountForm } from './views/CreatePasswordForm.tsx'
import { RecoverPasswordForm, useRecoverPasswordForm } from './views/RecoverPasswordForm.tsx'

enum AccountPasswordTypes {
  CREATE = 'create',
  CONFIRM = 'confirm',
  RECOVER = 'recover',
}

const FormTitles = {
  [AccountPasswordTypes.CREATE]: t('Configure your account password'),
  [AccountPasswordTypes.CONFIRM]: t('Confirm your account password'),
  [AccountPasswordTypes.RECOVER]: t('Recover your account password'),
}

export const LaunchPaymentAccountPassword = () => {
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const navigate = useNavigate()

  const { data: accountKeysData } = useAccountKeysQuery({
    skip: !user?.id,
    variables: {
      where: {
        id: user?.id,
      },
    },
    onCompleted(data) {
      if (data.user?.accountKeys?.id) {
        setAccountPasswordType(AccountPasswordTypes.CONFIRM)
      }
    },
  })
  const keys = accountKeysData?.user?.accountKeys

  const [accountPasswordType, setAccountPasswordType] = useState<AccountPasswordTypes>(AccountPasswordTypes.CREATE)

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchPaymentAccountPassword', project.id),
  )

  const handleCreatePasswordSubmit = (data: UserAccountKeysFragment) => {
    updateProjectWithLastCreationStep()
  }

  const handleConfirmPasswordSubmit = () => {
    updateProjectWithLastCreationStep()
  }

  const handleRecoverPasswordSubmit = (data: UserAccountKeysFragment) => {
    updateProjectWithLastCreationStep()
  }

  const createPasswordForm = useCreateAccountForm(handleCreatePasswordSubmit)
  const passwordConfirmationForm = useConfirmPasswordForm({
    onComplete: handleConfirmPasswordSubmit,
    keys,
  })
  const recoverPasswordForm = useRecoverPasswordForm(handleRecoverPasswordSubmit)

  const currentForm = useMemo(() => {
    switch (accountPasswordType) {
      case AccountPasswordTypes.CREATE:
        return createPasswordForm
      case AccountPasswordTypes.CONFIRM:
        return passwordConfirmationForm
      case AccountPasswordTypes.RECOVER:
        return recoverPasswordForm
      default:
        return createPasswordForm
    }
  }, [accountPasswordType, createPasswordForm, passwordConfirmationForm, recoverPasswordForm])

  const handleForgotPassword = () => {
    setAccountPasswordType(AccountPasswordTypes.RECOVER)
  }

  const handleBackToConfirm = () => {
    setAccountPasswordType(AccountPasswordTypes.CONFIRM)
  }

  const continueProps: ButtonProps = {
    type: 'submit',
  }

  const backProps: ButtonProps = {
    onClick() {
      navigate(getPath('launchPaymentWallet', project.id))
    },
  }

  const titles = FormTitles[accountPasswordType]

  const renderForm = () => {
    switch (accountPasswordType) {
      case AccountPasswordTypes.CREATE:
        return <CreatePasswordForm form={createPasswordForm} />
      case AccountPasswordTypes.CONFIRM:
        return (
          <ConfirmPasswordForm control={passwordConfirmationForm.control} onForgotPassword={handleForgotPassword} />
        )
      case AccountPasswordTypes.RECOVER:
        return <RecoverPasswordForm control={recoverPasswordForm.control} onBackToConfirm={handleBackToConfirm} />
      default:
        return null
    }
  }

  return (
    <ProjectCreationLayout
      title={titles}
      continueButtonProps={continueProps}
      backButtonProps={backProps}
      as="form"
      onSubmit={currentForm.onSubmit}
    >
      <VStack w="full" alignItems="start" gap={6}>
        {renderForm()}
      </VStack>
    </ProjectCreationLayout>
  )
}
