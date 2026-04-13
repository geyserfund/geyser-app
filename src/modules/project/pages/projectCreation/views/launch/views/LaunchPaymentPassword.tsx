import { ButtonProps, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'

import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import type { UserAccountKeysFragment } from '@/types/index.ts'

import { ProjectCreationPageWrapper } from '../../../components/ProjectCreationPageWrapper.tsx'

/** Password step for Prism-backed launch-fee payments when the cached account password is unavailable. */
export const LaunchPaymentPassword = ({
  onComplete,
  onBack,
  isLoading,
}: {
  onComplete: (params?: { data?: UserAccountKeysFragment; password?: string }) => void
  onBack: () => void
  isLoading?: boolean
}) => {
  const setUserAccountKeys = useSetAtom(userAccountKeysAtom)

  const { currentForm, renderForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      const password = currentForm.getValues?.('password') || ''

      if (data) {
        setUserAccountKeys(data)
      }

      onComplete({ data, password })
    },
    isCreator: true,
    copy: {
      introText: {
        confirm: t('Enter your account password to prepare the Bitcoin payment for your launch fee.'),
        create: t('Set an account password to prepare the Bitcoin payment for your launch fee.'),
      },
    },
  })

  const continueButtonProps: ButtonProps = {
    type: 'submit',
    isLoading: Boolean(currentForm.formState?.isSubmitting || isLoading),
  }

  const backButtonProps: ButtonProps = {
    onClick: onBack,
    isDisabled: Boolean(isLoading),
  }

  return (
    <ProjectCreationPageWrapper
      title={titles}
      continueButtonProps={continueButtonProps}
      backButtonProps={backButtonProps}
      as="form"
      onSubmit={currentForm.onSubmit}
    >
      <VStack w="full" alignItems="start" gap={6}>
        {renderForm()}
      </VStack>
    </ProjectCreationPageWrapper>
  )
}
