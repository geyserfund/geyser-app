import { Button, Checkbox, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { Control, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'

import { useUpdateAccountPassword } from '../hooks/useUpdateAccountPassword.ts'
import { useUserAccountPasswordFundsSummary } from '../hooks/useUserAccountPasswordFundsSummary.ts'
import { accountPasswordAtom } from '../state/passwordStorageAtom.ts'
import { PasswordVisibilityToggle } from './PasswordVisibilityToggle.tsx'

export type RecoverPasswordFormData = {
  password: string
  repeatPassword: string
  acknowledgePasswordLoss: boolean
  acknowledgeRefund: boolean
}

type RecoverPasswordFormProps = {
  control: Control<RecoverPasswordFormData>
  onBackToConfirm?: () => void
}

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
    .oneOf([true], t('You must acknowledge that some funds may be lost or refunded')),
})

const getFundsSummaryText = (fundsSummary: {
  tiaUnclaimedFundsSats: string | number | bigint
  aonUnclaimedFundsSats: string | number | bigint
  pledgedSats: string | number | bigint
  affectedTiaProjects?: AccountPasswordProjectImpact[]
  legacyTiaProjects?: AccountPasswordProjectImpact[]
}) => {
  const tiaUnclaimedFundsSats = toSatsBigInt(fundsSummary.tiaUnclaimedFundsSats)
  const aonUnclaimedFundsSats = toSatsBigInt(fundsSummary.aonUnclaimedFundsSats)
  const pledgedSats = toSatsBigInt(fundsSummary.pledgedSats)
  const affectedTiaProjects = fundsSummary.affectedTiaProjects ?? []
  const legacyTiaProjects = fundsSummary.legacyTiaProjects ?? []
  const messages = []

  if (affectedTiaProjects.length > 0) {
    messages.push(
      affectedTiaProjects.length === 1
        ? t('1 TIA project will be closed because it is tied to your current account key.')
        : t('{{count}} TIA projects will be closed because they are tied to your current account key.', {
            count: affectedTiaProjects.length,
          }),
    )
  }

  if (legacyTiaProjects.length > 0) {
    messages.push(
      legacyTiaProjects.length === 1
        ? t('1 older TIA project will require wallet review before it can accept new contributions.')
        : t('{{count}} older TIA projects will require wallet review before they can accept new contributions.', {
            count: legacyTiaProjects.length,
          }),
    )
  }

  if (tiaUnclaimedFundsSats > 0n) {
    messages.push(
      t('You currently have {{tiaUnclaimedFunds}} sats unclaimed that will be lost.', {
        tiaUnclaimedFunds: formatSatsBigInt(tiaUnclaimedFundsSats),
      }),
    )
  }

  if (aonUnclaimedFundsSats > 0n) {
    messages.push(
      t('You currently have {{aonUnclaimedFunds}} sats in AON unclaimed funds that will be refunded to contributors.', {
        aonUnclaimedFunds: formatSatsBigInt(aonUnclaimedFundsSats),
      }),
    )
  }

  if (pledgedSats > 0n) {
    messages.push(
      t('You currently have {{pledged}} sats pledged and will lose the ability to claim refunds on those pledges.', {
        pledged: formatSatsBigInt(pledgedSats),
      }),
    )
  }

  return messages.length
    ? messages.join(' ')
    : t('You currently have no TIA project funds, AON unclaimed funds, or pledged sats tied to this account password.')
}

type AccountPasswordProjectImpact = {
  id: string | bigint
  title: string
  balanceSats: string | number | bigint
}

function toSatsBigInt(value: string | number | bigint): bigint {
  if (typeof value === 'bigint') return value
  if (typeof value === 'number') return Number.isFinite(value) ? BigInt(Math.trunc(value)) : 0n
  return /^-?\d+$/.test(value) ? BigInt(value) : 0n
}

function formatSatsBigInt(value: bigint): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function renderProjectImpactList(projects: AccountPasswordProjectImpact[], label: string) {
  if (!projects.length) return null

  return (
    <VStack w="full" alignItems="start" gap={1}>
      <Body size="sm" bold>
        {label}
      </Body>
      {projects.map((project) => (
        <Body key={`${project.id}`} size="sm">
          {t('{{projectTitle}} - {{balance}} sats', {
            projectTitle: project.title,
            balance: formatSatsBigInt(toSatsBigInt(project.balanceSats)),
          })}
        </Body>
      ))}
    </VStack>
  )
}

/** Password recovery form component with new password fields and acknowledgment checkboxes */
export const RecoverPasswordForm = ({ control, onBackToConfirm }: RecoverPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const { data, loading, error } = useUserAccountPasswordFundsSummary()
  const fundsSummary = data?.userAccountPasswordFundsSummary

  return (
    <VStack w="full" gap={6}>
      <VStack w="full" alignItems="start" gap={4}>
        <Feedback variant={FeedBackVariant.WARNING}>
          <Body>
            {t(
              'If you have forgotten your password, you can set a new account password. Projects tied to your current wallet key will be closed so they cannot receive funds to a wallet you may no longer control. AON funds you can no longer claim will be refunded to contributors. You will also lose the ability to claim refunds on pledges made to other projects.',
            )}
          </Body>
        </Feedback>

        {loading && <Body>{t('Checking current unclaimed and pledged amounts...')}</Body>}

        {!loading && error && (
          <Body>
            {t(
              'We could not calculate your current TIA project funds, AON unclaimed funds, and pledged amounts. Recovering your password may still make funds and refunds tied to your current account password inaccessible.',
            )}
          </Body>
        )}

        {!loading && !error && fundsSummary && (
          <VStack w="full" alignItems="start" gap={3}>
            <Body>{getFundsSummaryText(fundsSummary)}</Body>
            {renderProjectImpactList(fundsSummary.affectedTiaProjects, t('Projects that will be closed'))}
            {renderProjectImpactList(fundsSummary.legacyTiaProjects, t('Projects that will require wallet review'))}
          </VStack>
        )}
      </VStack>

      <VStack w="full" gap={4}>
        <ControlledTextInput
          name="password"
          control={control}
          label={t('Enter your new password')}
          placeholder={t('Enter your new password')}
          type={showPassword ? 'text' : 'password'}
          required
          rightAddon={
            <PasswordVisibilityToggle showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
          }
        />
        <ControlledTextInput
          name="repeatPassword"
          control={control}
          label={t('Repeat new password')}
          placeholder={t('Repeat new password')}
          type={showRepeatPassword ? 'text' : 'password'}
          required
          rightAddon={
            <PasswordVisibilityToggle
              showPassword={showRepeatPassword}
              onToggle={() => setShowRepeatPassword(!showRepeatPassword)}
            />
          }
        />

        <VStack w="full" alignItems="start" gap={3}>
          <Checkbox {...control.register('acknowledgePasswordLoss')} colorScheme="primary1">
            <Body size="sm">
              {t('I acknowledge that the new password cannot be recovered and I have saved it securely.')}
            </Body>
          </Checkbox>

          <Checkbox {...control.register('acknowledgeRefund')} colorScheme="primary1">
            <Body size="sm">
              {t(
                'I would like to reset my password and acknowledge that projects tied to the current wallet key may be closed, TIA project funds may be lost, AON unclaimed funds may be refunded to contributors, and I may lose access to pledge refunds.',
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

export const useRecoverPasswordForm = (onComplete: (_: UserAccountKeysFragment) => void) => {
  const setAccountPassword = useSetAtom(accountPasswordAtom)

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

  const { onSubmit: updatePasswordOnSubmit, isSubmitting } = useUpdateAccountPassword((data) => {
    setAccountPassword(form.getValues('password'))
    onComplete(data)
  })

  return {
    ...form,
    onSubmit: form.handleSubmit(updatePasswordOnSubmit),
    isSubmitting,
  }
}
