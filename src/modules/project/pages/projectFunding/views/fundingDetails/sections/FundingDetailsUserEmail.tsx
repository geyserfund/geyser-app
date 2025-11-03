import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Switch,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { PiCheckCircleFill, PiXCircleFill } from 'react-icons/pi'

import Loader from '@/components/ui/Loader'
import { useAuthContext } from '@/context'
import { useAuthModal } from '@/modules/auth/hooks'
import { useFollowedProjectsValue } from '@/modules/auth/state'
import { HorizontalFormField } from '@/modules/profile/pages/profileSettings/common/HorizontalFormField'
import {
  UserConfigName,
  UserNotificationType,
  useUserNotificationSettings,
} from '@/modules/profile/pages/profileSettings/hooks/useUserNotificationSettings'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'
import { useUserEmailIsAvailableLazyQuery } from '@/types'
import { validEmail } from '@/utils'

import { FieldContainer } from '../../../../../../../shared/components/form/FieldContainer'

const EMAIL_VALIDATION_STATE = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
}

export const FundingDetailsUserEmailAndUpdates = () => {
  const { user, isLoggedIn } = useAuthContext()
  const { loginOnOpen } = useAuthModal()
  const followedProjects = useFollowedProjectsValue()

  const {
    project,
    formState: { followProject, subscribeToGeyserEmails, email },
    hasSelectedRewards,
    setTarget,
    setState,
    fundingFormError,
    fundingFormWarning,
    setErrorstate,
    setWarningstate,
  } = useFundingFormAtom()

  const [followsProject] = useState(followedProjects.find((p) => p.id === project.id) !== undefined)
  const [userId] = useState(user?.id || 0)

  const { getUserNotificationConfigValue } = useUserNotificationSettings(userId)
  const subscribedToGeyserEmails =
    getUserNotificationConfigValue(UserNotificationType.PRODUCT_UPDATES, UserConfigName.IS_ENABLED) === 'true'

  const [emailValidationState, setEmailValidationState] = useState(EMAIL_VALIDATION_STATE.IDLE)

  const showEmailComponent = !user?.email || !followsProject || !subscribedToGeyserEmails

  const isEmailValidated = emailValidationState === EMAIL_VALIDATION_STATE.SUCCEEDED

  /*
   Set the email from the user to the funding form. We do this because the input field
   is not shown if the user already has an email.
  */
  useEffect(() => {
    if (!email) {
      if (user?.email) setState('email', user.email)
      else setState('email', '')
    }

    if (user?.id && user?.email) {
      setState('followProject', true)
    } else {
      setState('followProject', false)
    }
  }, [user, email, setState])

  const [isEmailAvailable, { loading: userEmailIsAvailableLoading }] = useUserEmailIsAvailableLazyQuery()

  const debouncedEmailValidation = useCallback(
    debounce(async (email: string) => {
      if (!email) {
        setEmailValidationState(EMAIL_VALIDATION_STATE.IDLE)
        setErrorstate({ key: 'email', value: '' })
        setWarningstate({
          key: 'email',
          value: '',
        })
        return Promise.resolve()
      }

      if (!validEmail.test(email)) {
        setErrorstate({ key: 'email', value: 'Please enter a valid email address.' })
        setWarningstate({
          key: 'email',
          value: '',
        })
        setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
        return Promise.resolve()
      }

      isEmailAvailable({
        variables: { email },
      })
        .then((res) => {
          setEmailValidationState(EMAIL_VALIDATION_STATE.SUCCEEDED)
          setErrorstate({ key: 'email', value: '' })
          if (!res.data?.userEmailIsAvailable) {
            setWarningstate({
              key: 'email',
              value: 'This email is associated with a user, did you forget to log in?',
            })
          }
        })
        .catch((error: Error) => {
          setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
          setErrorstate({ key: 'email', value: error.message })
          setWarningstate({
            key: 'email',
            value: '',
          })
        })
      return Promise.resolve()
    }, 1000),
    [],
  )

  const renderEmailInputRightElement = () => {
    if (userEmailIsAvailableLoading) return <Loader />

    switch (emailValidationState) {
      case EMAIL_VALIDATION_STATE.IDLE:
        return null
      case EMAIL_VALIDATION_STATE.LOADING:
        return <Loader size="md"></Loader>
      case EMAIL_VALIDATION_STATE.FAILED:
        return <PiXCircleFill fill={lightModeColors.secondary.red} size="24px" />
      case EMAIL_VALIDATION_STATE.SUCCEEDED:
        return <PiCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
      default:
        return null
    }
  }

  if (!isLoggedIn && !hasSelectedRewards) return <ConnectProfileCard />

  if (!showEmailComponent) return null

  return (
    <CardLayout mobileDense width="100%" position="relative">
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <H1 size="2xl" bold>
          {t('Add Email')}
        </H1>
        <Body size="sm" light>
          {t('Add your email to receive project updates from the creator.')}
        </Body>
      </VStack>

      <FieldContainer>
        <FormControl isInvalid={Boolean(fundingFormError.email)}>
          <InputGroup>
            <Input
              disabled={Boolean(user?.email)}
              required={hasSelectedRewards}
              type="email"
              name="email"
              placeholder="funderemail@gmail.com"
              value={email}
              inputMode="email"
              onChange={(e) => {
                setTarget({ target: { name: 'email', value: e.target.value } })
                setEmailValidationState(EMAIL_VALIDATION_STATE.LOADING)
                debouncedEmailValidation(e.target.value)
              }}
              isInvalid={Boolean(fundingFormError.email)}
              onFocus={() => {
                setErrorstate({ key: 'email', value: '' })
                setWarningstate({ key: 'email', value: '' })
              }}
            />
            <InputRightElement>{renderEmailInputRightElement()}</InputRightElement>
          </InputGroup>
          {fundingFormError.email && <FormErrorMessage>{fundingFormError.email}</FormErrorMessage>}
          {fundingFormWarning.email && <FormHelperText color="orange.9">{fundingFormWarning.email}</FormHelperText>}
          {!fundingFormWarning.email && !fundingFormError.email && !isLoggedIn && (
            <FormHelperText color="neutral1.11">
              <Trans i18nKey="You're funding anonymously. <1>Sign in</1> to connect your contribution to your profile.">
                {"You're funding anonymously. "}
                <Box
                  as="span"
                  onClick={() => loginOnOpen()}
                  color="primary.600"
                  fontWeight="bold"
                  _hover={{ cursor: 'pointer' }}
                >
                  Sign in
                </Box>
                {' to connect your profile to contribution'}
              </Trans>
            </FormHelperText>
          )}
        </FormControl>
      </FieldContainer>
      {(isEmailValidated || user.email) && (
        <>
          {!followsProject && (
            <HorizontalFormField
              label="Follow Project: receive this project’s updates directly by email."
              htmlFor="creator-email-toggle"
            >
              <Switch
                id="creator-email-toggle"
                isChecked={followProject}
                onChange={(e) => {
                  if (user.id) {
                    setState('followProject', e.target.checked)
                  } else {
                    loginOnOpen()
                  }
                }}
              />
            </HorizontalFormField>
          )}
          {!subscribedToGeyserEmails && (
            <HorizontalFormField
              label="Subscribe to Geyser newsletter to discover new projects."
              htmlFor="geyser-email-toggle"
            >
              <Switch
                id="geyser-email-toggle"
                isChecked={subscribeToGeyserEmails}
                onChange={(e) => {
                  if (user.id) {
                    setState('subscribeToGeyserEmails', e.target.checked)
                  } else {
                    loginOnOpen()
                  }
                }}
              />
            </HorizontalFormField>
          )}
        </>
      )}
    </CardLayout>
  )
}

export const ConnectProfileCard = () => {
  const { loginOnOpen } = useAuthModal()
  return (
    <CardLayout mobileDense width="100%" position="relative">
      <VStack w="full" alignItems="flex-start" spacing={0}>
        <HStack w="full" justifyContent="space-between">
          <H1 size="2xl" bold>
            ✨ {t('Follow this project for exclusive updates')}
          </H1>
          <Switch
            size="lg"
            onChange={() => {
              loginOnOpen()
            }}
          />
        </HStack>

        <Body size="sm" light>
          {t(
            'Get notified by email when new goals are hit, impact is made, and Bitcoin adoption grows, straight from the creator.',
          )}
        </Body>
      </VStack>
    </CardLayout>
  )
}
