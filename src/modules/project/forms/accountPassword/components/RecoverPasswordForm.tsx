import { Box, Button, Checkbox, Divider, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
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
    .oneOf([true], t('You must acknowledge that funds tied to your current password may become inaccessible')),
})

type FundsSummary = {
  userWalletBalanceSats: string | number | bigint
  tiaUnclaimedFundsSats: string | number | bigint
  aonUnclaimedFundsSats: string | number | bigint
  pledgedSats: string | number | bigint
  affectedTiaProjects?: AccountPasswordProjectImpact[]
  legacyTiaProjects?: AccountPasswordProjectImpact[]
  pendingTiaProjects?: AccountPasswordProjectImpact[]
}

const getFundsSummaryItems = (fundsSummary: FundsSummary) => {
  const userWalletBalanceSats = toSatsBigInt(fundsSummary.userWalletBalanceSats)
  const tiaUnclaimedFundsSats = toSatsBigInt(fundsSummary.tiaUnclaimedFundsSats)
  const aonUnclaimedFundsSats = toSatsBigInt(fundsSummary.aonUnclaimedFundsSats)
  const pledgedSats = toSatsBigInt(fundsSummary.pledgedSats)
  const affectedTiaProjects = fundsSummary.affectedTiaProjects ?? []
  const legacyTiaProjects = fundsSummary.legacyTiaProjects ?? []
  const pendingTiaProjects = fundsSummary.pendingTiaProjects ?? []

  return [
    {
      label: t('User wallet'),
      value: t('{{balance}} sats', { balance: formatSatsBigInt(userWalletBalanceSats) }),
      detail: t('Tied to your current password.'),
      isWarning: userWalletBalanceSats > 0n,
    },
    {
      label: t('TIA project balances'),
      value: t('{{balance}} sats', { balance: formatSatsBigInt(tiaUnclaimedFundsSats) }),
      detail: t('Will become historical after rotation.'),
      isWarning: tiaUnclaimedFundsSats > 0n,
    },
    {
      label: t('AON claimable'),
      value: t('{{balance}} sats', { balance: formatSatsBigInt(aonUnclaimedFundsSats) }),
      detail: t('May no longer be claimable with the new password.'),
      isWarning: aonUnclaimedFundsSats > 0n,
    },
    {
      label: t('AON refundable'),
      value: t('{{balance}} sats', { balance: formatSatsBigInt(pledgedSats) }),
      detail: t('May no longer be refundable with the new password.'),
      isWarning: pledgedSats > 0n,
    },
    {
      label: t('Project rotations'),
      value: t('{{count}} wallets', { count: affectedTiaProjects.length + legacyTiaProjects.length }),
      detail: t('Current and legacy TIA project wallets affected.'),
      isWarning: affectedTiaProjects.length + legacyTiaProjects.length > 0,
    },
    {
      label: t('Payments in progress'),
      value: t('{{count}} projects', { count: pendingTiaProjects.length }),
      detail: t('May block reset until payments settle.'),
      isWarning: pendingTiaProjects.length > 0,
    },
  ]
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

function renderFundsSummary(fundsSummary: FundsSummary) {
  return (
    <SimpleGrid w="full" columns={{ base: 1, sm: 2 }} spacing={3}>
      {getFundsSummaryItems(fundsSummary).map((item) => (
        <Box
          key={item.label}
          borderWidth="1px"
          borderColor={item.isWarning ? 'warning.6' : 'neutral1.5'}
          borderRadius="lg"
          bg={item.isWarning ? 'warning.1' : 'neutral1.1'}
          p={3}
        >
          <VStack align="flex-start" spacing={1}>
            <Body size="xs" medium color="neutral1.10">
              {item.label}
            </Body>
            <Body size="md" medium color="neutral1.12">
              {item.value}
            </Body>
            <Body size="xs" color="neutral1.10">
              {item.detail}
            </Body>
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )
}

function renderProjectImpactList(projects: AccountPasswordProjectImpact[], label: string) {
  if (!projects.length) return null

  return (
    <VStack w="full" alignItems="stretch" gap={2}>
      <HStack justify="space-between" spacing={3}>
        <Body size="sm" bold>
          {label}
        </Body>
        <Body size="xs" color="neutral1.10" flexShrink={0}>
          {t('{{count}} total', { count: projects.length })}
        </Body>
      </HStack>
      <VStack w="full" alignItems="stretch" gap={1}>
        {projects.map((project) => (
          <HStack key={`${project.id}`} justify="space-between" spacing={3}>
            <Body size="sm" color="neutral1.11" noOfLines={1}>
              {project.title}
            </Body>
            <Body size="sm" color="neutral1.10" flexShrink={0}>
              {t('{{balance}} sats', { balance: formatSatsBigInt(toSatsBigInt(project.balanceSats)) })}
            </Body>
          </HStack>
        ))}
      </VStack>
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
    <VStack w="full" gap={6} align="stretch">
      <Feedback variant={FeedBackVariant.WARNING}>
        <Body size="sm">
          {t(
            'If you reset your password, Geyser will create a new seed and rotate project wallet addresses where possible. Funds tied to the old seed/password are not moved automatically and may become inaccessible unless you have a backup of the old seed/password.',
          )}
        </Body>
      </Feedback>

      <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} spacing={6} alignItems="start">
        <VStack w="full" alignItems="stretch" gap={4}>
          <VStack align="stretch" spacing={1}>
            <Body medium>{t('Current password impact')}</Body>
            <Body size="sm" color="neutral1.10">
              {t('Review the funds and project wallets that may depend on your existing seed before continuing.')}
            </Body>
          </VStack>

          {loading && (
            <Box borderWidth="1px" borderColor="neutral1.5" borderRadius="lg" bg="neutral1.1" p={4}>
              <Body size="sm">{t('Checking current unclaimed and pledged amounts...')}</Body>
            </Box>
          )}

          {!loading && error && (
            <Box borderWidth="1px" borderColor="warning.6" borderRadius="lg" bg="warning.1" p={4}>
              <Body size="sm">
                {t(
                  'We could not calculate your current TIA project funds, AON unclaimed funds, and pledged amounts. Recovering your password may still make funds and refunds tied to your current account password inaccessible.',
                )}
              </Body>
            </Box>
          )}

          {!loading && !error && fundsSummary && (
            <VStack w="full" alignItems="stretch" gap={4}>
              {renderFundsSummary(fundsSummary)}
              <Divider />
              {renderProjectImpactList(
                fundsSummary.affectedTiaProjects,
                t('Project funds tied to your current password'),
              )}
              {renderProjectImpactList(fundsSummary.legacyTiaProjects, t('Legacy project wallets to rotate'))}
              {renderProjectImpactList(fundsSummary.pendingTiaProjects, t('Projects with payments in progress'))}
            </VStack>
          )}
        </VStack>

        <VStack
          w="full"
          gap={4}
          alignItems="stretch"
          borderWidth="1px"
          borderColor="neutral1.5"
          borderRadius="lg"
          p={4}
        >
          <VStack align="stretch" spacing={1}>
            <Body medium>{t('New password')}</Body>
            <Body size="sm" color="neutral1.10">
              {t('Use a password you can store securely. Geyser cannot recover it for you.')}
            </Body>
          </VStack>

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
            <Checkbox {...control.register('acknowledgePasswordLoss')} colorScheme="primary1" alignItems="flex-start">
              <Body size="sm">
                {t('I acknowledge that the new password cannot be recovered and I have saved it securely.')}
              </Body>
            </Checkbox>

            <Checkbox {...control.register('acknowledgeRefund')} colorScheme="primary1" alignItems="flex-start">
              <Body size="sm">
                {t(
                  'I understand funds tied to my current password may be inaccessible unless I have a backup of the old seed/password.',
                )}
              </Body>
            </Checkbox>
          </VStack>
        </VStack>
      </SimpleGrid>

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
