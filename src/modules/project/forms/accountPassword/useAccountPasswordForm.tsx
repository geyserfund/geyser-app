import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactNode } from 'react'

import type { BodyProps } from '@/shared/components/typography/Body.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'

import { userAccountKeysAtom } from '../../../auth/state/userAccountKeysAtom.ts'
import { ConfirmPasswordForm, useConfirmPasswordForm } from './components/ConfirmPasswordForm.tsx'
import { CreatePasswordForm, useCreateAccountForm } from './components/CreatePasswordForm.tsx'
import { RecoverPasswordForm, useRecoverPasswordForm } from './components/RecoverPasswordForm.tsx'
import { AccountKeys } from './keyGenerationHelper.ts'

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

export const useAccountPasswordForm = ({
  onComplete,
  isCreator,
  copy,
}: {
  onComplete: (data?: UserAccountKeysFragment) => void
  isCreator?: boolean
  copy?: {
    titles?: Partial<Record<AccountPasswordTypes, string>>
    introText?: Partial<Record<AccountPasswordTypes, string>>
    introSize?: Partial<Record<AccountPasswordTypes, BodyProps['size']>>
    importantContent?: ReactNode
    showFeedback?: boolean
    hidePasswordLabel?: boolean
  }
}): { renderForm: () => JSX.Element | null; currentForm: any; titles: string } => {
  const [accountPasswordType, setAccountPasswordType] = useState<AccountPasswordTypes>(AccountPasswordTypes.CREATE)

  const keys = useAtomValue(userAccountKeysAtom)

  useEffect(() => {
    if (keys?.id) {
      setAccountPasswordType(AccountPasswordTypes.CONFIRM)
    }
  }, [keys])

  const handleCreatePasswordSubmit = (data: UserAccountKeysFragment) => {
    onComplete(data)
  }

  const handleConfirmPasswordSubmit = (data: AccountKeys) => {
    onComplete()
  }

  const handleRecoverPasswordSubmit = (data: UserAccountKeysFragment) => {
    onComplete(data)
  }

  const createPasswordForm = useCreateAccountForm(handleCreatePasswordSubmit)
  const passwordConfirmationForm = useConfirmPasswordForm({
    onComplete: handleConfirmPasswordSubmit,
    keys,
  })
  const recoverPasswordForm = useRecoverPasswordForm(handleRecoverPasswordSubmit)

  const introText = copy?.introText?.[accountPasswordType]
  const introSize = copy?.introSize?.[accountPasswordType]
  const importantContent = copy?.importantContent
  const showFeedback = copy?.showFeedback
  const hidePasswordLabel = copy?.hidePasswordLabel

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
        return (
          <CreatePasswordForm
            form={createPasswordForm}
            isCreator={isCreator}
            introText={introText}
            introSize={introSize}
            importantContent={importantContent}
            showFeedback={showFeedback}
            hidePasswordLabel={hidePasswordLabel}
          />
        )
      case AccountPasswordTypes.CONFIRM:
        return (
          <ConfirmPasswordForm
            control={passwordConfirmationForm.control}
            onForgotPassword={handleForgotPassword}
            isCreator={isCreator}
            introText={introText}
            introSize={introSize}
            importantContent={importantContent}
            showFeedback={showFeedback}
            hidePasswordLabel={hidePasswordLabel}
          />
        )
      case AccountPasswordTypes.RECOVER:
        return <RecoverPasswordForm control={recoverPasswordForm.control} onBackToConfirm={handleBackToConfirm} />
      default:
        return null
    }
  }, [
    accountPasswordType,
    createPasswordForm,
    passwordConfirmationForm,
    recoverPasswordForm,
    isCreator,
    introText,
    introSize,
    importantContent,
    showFeedback,
    hidePasswordLabel,
  ])

  const titles = copy?.titles?.[accountPasswordType] || FormTitles[accountPasswordType]

  return {
    renderForm,
    currentForm,
    titles,
  }
}
