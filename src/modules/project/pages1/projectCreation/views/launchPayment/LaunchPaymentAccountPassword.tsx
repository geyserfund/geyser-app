import { Button, ButtonProps, Checkbox, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useState } from 'react'
import { Control, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import * as yup from 'yup'

import { useAuthContext } from '@/context/auth.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectCreationStep } from '@/types/index.ts'

import { useUpdateProjectWithLastCreationStep } from '../../hooks/useIsStepAhead.tsx'
import { ProjectCreationLayout } from '../../Layouts/ProjectCreationLayout.tsx'

type PasswordFormData = {
  password: string
  repeatPassword: string
}

type ConfirmPasswordFormData = {
  password: string
}

type RecoverPasswordFormData = {
  password: string
  repeatPassword: string
  acknowledgePasswordLoss: boolean
  acknowledgeRefund: boolean
}

const passwordSchema = yup.object({
  password: yup.string().required(t('Password is required')).min(8, t('Password must be at least 8 characters long')),
  repeatPassword: yup
    .string()
    .required(t('Please repeat your password'))
    .oneOf([yup.ref('password')], t('Passwords must match')),
})

const confirmPasswordSchema = yup.object({
  password: yup.string().required(t('Password is required')),
})

const recoverPasswordSchema = yup.object({
  password: yup.string().required(t('Password is required')).min(8, t('Password must be at least 8 characters long')),
  repeatPassword: yup
    .string()
    .required(t('Please repeat your password'))
    .oneOf([yup.ref('password')], t('Passwords must match')),
  acknowledgePasswordLoss: yup
    .boolean()
    .required()
    .oneOf([true], t('You must acknowledge that the password cannot be recovered')),
  acknowledgeRefund: yup
    .boolean()
    .required()
    .oneOf([true], t('You must acknowledge that unclaimed funds will be refunded')),
})

const useAccountPasswordForm = (onSubmit: SubmitHandler<PasswordFormData>) => {
  const form = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  })

  const handleFormSubmit: SubmitHandler<PasswordFormData> = (data) => {
    onSubmit(data)
  }

  return {
    ...form,
    onSubmit: handleFormSubmit,
  }
}

const useConfirmPasswordForm = (onSubmit: SubmitHandler<ConfirmPasswordFormData>) => {
  const form = useForm<ConfirmPasswordFormData>({
    resolver: yupResolver(confirmPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
    },
  })

  const handleFormSubmit: SubmitHandler<ConfirmPasswordFormData> = (data) => {
    onSubmit(data)
  }

  return {
    ...form,
    onSubmit: handleFormSubmit,
  }
}

const useRecoverPasswordForm = (onSubmit: SubmitHandler<RecoverPasswordFormData>) => {
  const form = useForm<RecoverPasswordFormData>({
    resolver: yupResolver(recoverPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      repeatPassword: '',
      acknowledgePasswordLoss: false,
      acknowledgeRefund: false,
    },
  })

  const handleFormSubmit: SubmitHandler<RecoverPasswordFormData> = (data) => {
    onSubmit(data)
  }

  return {
    ...form,
    onSubmit: handleFormSubmit,
  }
}

type AccountPasswordFormProps = {
  control: Control<PasswordFormData>
}

type ConfirmPasswordFormProps = {
  control: Control<ConfirmPasswordFormData>
  onForgotPassword: () => void
  showRecovery?: boolean
  onBackToConfirm?: () => void
  recoveryControl?: Control<RecoverPasswordFormData>
}

/** Account password form component with password and repeat password fields */
const AccountPasswordForm = ({ control }: AccountPasswordFormProps) => {
  return (
    <VStack w="full" gap={4}>
      <ControlledTextInput
        name="password"
        control={control}
        label={t('Enter your password')}
        placeholder={t('Enter your password')}
        type="password"
        required
      />
      <ControlledTextInput
        name="repeatPassword"
        control={control}
        label={t('Repeat password')}
        placeholder={t('Repeat your password')}
        type="password"
        required
      />
    </VStack>
  )
}

/** Password confirmation form component with single password field and forgot password option */
const ConfirmPasswordForm = ({
  control,
  onForgotPassword,
  showRecovery = false,
  onBackToConfirm,
  recoveryControl,
}: ConfirmPasswordFormProps) => {
  if (showRecovery && recoveryControl) {
    return (
      <VStack w="full" gap={6}>
        <VStack w="full" alignItems="start" gap={4}>
          <Feedback variant={FeedBackVariant.WARNING}>
            <Body>
              {t(
                'If you have forgotten your password, you can set a new account password. Note that you will lose access to all unclaimed funds in previously created projects. You will also lose the ability to claim refunds on pledges made to other projects.',
              )}
            </Body>
          </Feedback>

          <Body>
            {t(
              'You currently have 102,334 sats in unclaimed funds that will be refunded to contributors and 11,342 sats pledged.',
            )}
          </Body>
        </VStack>

        <VStack w="full" gap={4}>
          <ControlledTextInput
            name="password"
            control={recoveryControl}
            label={t('Enter your new password')}
            placeholder={t('Enter your new password')}
            type="password"
            required
          />
          <ControlledTextInput
            name="repeatPassword"
            control={recoveryControl}
            label={t('Repeat new password')}
            placeholder={t('Repeat new password')}
            type="password"
            required
          />

          <VStack w="full" alignItems="start" gap={3}>
            <Checkbox {...recoveryControl.register('acknowledgePasswordLoss')} colorScheme="primary1">
              <Body size="sm">
                {t('I acknowledge that the new password cannot be recovered and I have saved it securely.')}
              </Body>
            </Checkbox>

            <Checkbox {...recoveryControl.register('acknowledgeRefund')} colorScheme="primary1">
              <Body size="sm">
                {t(
                  'I would like to reset my password and acknowledge that unclaimed funds from past projects will be refunded to the contributors.',
                )}
              </Body>
            </Checkbox>
          </VStack>
        </VStack>

        {onBackToConfirm && (
          <Button variant="link" size="sm" onClick={onBackToConfirm} alignSelf="flex-start" color="primary1.11">
            {t('Back to password confirmation')}
          </Button>
        )}
      </VStack>
    )
  }

  return (
    <VStack w="full" gap={4}>
      <ControlledTextInput
        name="password"
        control={control}
        label={t('Enter your password')}
        placeholder={t('Enter your password')}
        type="password"
        required
      />
      <Button variant="link" size="sm" onClick={onForgotPassword} alignSelf="flex-start" color="primary1.11">
        {t('Forgotten your password?')}
      </Button>
    </VStack>
  )
}

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

  const [accountPasswordType, setAccountPasswordType] = useState<AccountPasswordTypes>(AccountPasswordTypes.CREATE)
  const [showRecovery, setShowRecovery] = useState(false)

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.Wallet,
    getPath('launchPaymentAccountPassword', project.id),
  )

  const handleCreatePasswordSubmit: SubmitHandler<PasswordFormData> = (data) => {
    // TODO: Handle password submission logic here
    console.log('Password configured:', { passwordLength: data.password.length })
    updateProjectWithLastCreationStep()
  }

  const handleConfirmPasswordSubmit: SubmitHandler<ConfirmPasswordFormData> = (data) => {
    // TODO: Handle password confirmation logic here
    console.log('Password confirmed:', { passwordLength: data.password.length })
    updateProjectWithLastCreationStep()
  }

  const handleRecoverPasswordSubmit: SubmitHandler<RecoverPasswordFormData> = (data) => {
    // TODO: Handle password recovery logic here
    console.log('Password recovered:', { passwordLength: data.password.length })
    updateProjectWithLastCreationStep()
  }

  const accountPasswordForm = useAccountPasswordForm(handleCreatePasswordSubmit)
  const passwordConfirmationForm = useConfirmPasswordForm(handleConfirmPasswordSubmit)
  const recoverPasswordForm = useRecoverPasswordForm(handleRecoverPasswordSubmit)

  const handleForgotPassword = () => {
    setShowRecovery(true)
    setAccountPasswordType(AccountPasswordTypes.RECOVER)
  }

  const handleBackToConfirm = () => {
    setShowRecovery(false)
    setAccountPasswordType(AccountPasswordTypes.CONFIRM)
  }

  const continueProps: ButtonProps = {
    onClick() {
      if (accountPasswordType === AccountPasswordTypes.CREATE) {
        accountPasswordForm.handleSubmit(accountPasswordForm.onSubmit)()
      } else if (showRecovery) {
        recoverPasswordForm.handleSubmit(recoverPasswordForm.onSubmit)()
      } else {
        passwordConfirmationForm.handleSubmit(passwordConfirmationForm.onSubmit)()
      }
    },
    isDisabled: (() => {
      if (accountPasswordType === AccountPasswordTypes.CREATE) {
        return !accountPasswordForm.formState.isValid
      }

      if (showRecovery) {
        return !recoverPasswordForm.formState.isValid
      }

      return !passwordConfirmationForm.formState.isValid
    })(),
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
        return <AccountPasswordForm control={accountPasswordForm.control} />
      case AccountPasswordTypes.CONFIRM:
        return (
          <ConfirmPasswordForm
            control={passwordConfirmationForm.control}
            onForgotPassword={handleForgotPassword}
            showRecovery={showRecovery}
            onBackToConfirm={handleBackToConfirm}
            recoveryControl={recoverPasswordForm.control}
          />
        )
      case AccountPasswordTypes.RECOVER:
        return (
          <ConfirmPasswordForm
            control={passwordConfirmationForm.control}
            onForgotPassword={handleForgotPassword}
            showRecovery={showRecovery}
            onBackToConfirm={handleBackToConfirm}
            recoveryControl={recoverPasswordForm.control}
          />
        )
      default:
        return null
    }
  }

  const getContent = () => {
    if (showRecovery) {
      return null // Content is handled within the recovery form
    }

    if (accountPasswordType === AccountPasswordTypes.CONFIRM) {
      return (
        <VStack w="full" alignItems="start" gap={2}>
          <Body>
            {t('Enter your account password to access your project funds and continue with the launch process.')}
          </Body>
          <Feedback variant={FeedBackVariant.INFO}>
            <Body>
              {t(
                'This is the password you configured earlier. If you have forgotten your password, use the recovery option below.',
              )}
            </Body>
          </Feedback>
        </VStack>
      )
    }

    return (
      <VStack w="full" alignItems="start" gap={2}>
        <Body>
          {t(
            'Configure your account password. This password is known only by you, and no one but you has access to the project funds.',
          )}
        </Body>
        <Feedback variant={FeedBackVariant.WARNING}>
          <VStack w="full" alignItems="start">
            <Body>
              {t(
                'You must have your account password to access the funds from your crowdfunding campaign. Please save this password in a secure and permanent location, such as a password manager.',
              )}
            </Body>
            <Body>
              {t(
                'Geyser cannot help you recover this password. Your account password is used to encrypt your seed phrase, and only the encrypted version is stored in our database. We never store or know your password.',
              )}
            </Body>
          </VStack>
        </Feedback>
      </VStack>
    )
  }

  return (
    <ProjectCreationLayout title={titles} continueButtonProps={continueProps} backButtonProps={backProps}>
      <VStack w="full" alignItems="start" gap={6}>
        {getContent()}
        {renderForm()}
      </VStack>
    </ProjectCreationLayout>
  )
}
