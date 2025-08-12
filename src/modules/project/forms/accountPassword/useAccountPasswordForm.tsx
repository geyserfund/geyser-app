import { t } from 'i18next'
import { useCallback, useMemo, useState } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useAccountKeysQuery, UserAccountKeysFragment } from '@/types/index.ts'

import { ConfirmPasswordForm, useConfirmPasswordForm } from './components/ConfirmPasswordForm.tsx'
import { CreatePasswordForm, useCreateAccountForm } from './components/CreatePasswordForm.tsx'
import { RecoverPasswordForm, useRecoverPasswordForm } from './components/RecoverPasswordForm.tsx'

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

export const useAccountPasswordForm = ({ onComplete, isCreator }: { onComplete: () => void; isCreator?: boolean }) => {
  const [accountPasswordType, setAccountPasswordType] = useState<AccountPasswordTypes>(AccountPasswordTypes.CREATE)

  const { user } = useAuthContext()

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

  const handleCreatePasswordSubmit = (data: UserAccountKeysFragment) => {
    onComplete()
  }

  const handleConfirmPasswordSubmit = () => {
    onComplete()
  }

  const handleRecoverPasswordSubmit = (data: UserAccountKeysFragment) => {
    onComplete()
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

  const renderForm = useCallback(() => {
    switch (accountPasswordType) {
      case AccountPasswordTypes.CREATE:
        return <CreatePasswordForm form={createPasswordForm} isCreator={isCreator} />
      case AccountPasswordTypes.CONFIRM:
        return (
          <ConfirmPasswordForm
            control={passwordConfirmationForm.control}
            onForgotPassword={handleForgotPassword}
            isCreator={isCreator}
          />
        )
      case AccountPasswordTypes.RECOVER:
        return <RecoverPasswordForm control={recoverPasswordForm.control} onBackToConfirm={handleBackToConfirm} />
      default:
        return null
    }
  }, [accountPasswordType, createPasswordForm, passwordConfirmationForm, recoverPasswordForm, isCreator])

  const titles = FormTitles[accountPasswordType]

  return {
    renderForm,
    currentForm,
    titles,
  }
}
