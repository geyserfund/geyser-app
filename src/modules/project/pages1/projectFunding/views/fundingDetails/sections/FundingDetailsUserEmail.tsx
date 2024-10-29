import { FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, Switch } from '@chakra-ui/react'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

import Loader from '@/components/ui/Loader'
import { useAuthContext } from '@/context'
import { HorizontalFormField } from '@/modules/profile/pages/profileSettings/common/HorizontalFormField'
import {
  UserConfigName,
  UserNotificationType,
  useUserNotificationSettings,
} from '@/modules/profile/pages/profileSettings/hooks/useUserNotificationSettings'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { useFollowedProjectsValue } from '@/pages/auth/state'
import { CardLayout } from '@/shared/components/layouts'
import { H1 } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
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
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const followedProjects = useFollowedProjectsValue()

  const [followsProject] = useState(followedProjects.find((p) => p.id === project.id) !== undefined)
  const [userId] = useState(user?.id || 0)

  const { getUserNotificationConfigValue } = useUserNotificationSettings(userId)
  const subscribedToGeyserEmails =
    getUserNotificationConfigValue(UserNotificationType.PRODUCT_UPDATES, UserConfigName.IS_ENABLED) === 'true'

  const [emailValidationState, setEmailValidationState] = useState(EMAIL_VALIDATION_STATE.IDLE)

  const showEmailComponent = !user?.email || !followsProject || !subscribedToGeyserEmails

  const {
    formState: { needsShipping, followProject, subscribeToGeyserEmails, email },
    hasSelectedRewards,
    setTarget,
    fundingFormError,
    setErrorstate,
  } = useFundingFormAtom()

  /*
   Set the email from the user to the funding form. We do this because the input field
   is not shown if the user already has an email.
  */
  console.log('USER', user)
  useEffect(() => {
    if (user?.email) setTarget({ target: { name: 'email', value: user.email } })
    else setTarget({ target: { name: 'email', value: '' } })
  }, [user])

  const [isEmailAvailable, { loading: userEmailIsAvailableLoading }] = useUserEmailIsAvailableLazyQuery()
  console.log('email', email)

  const debouncedEmailValidation = useCallback(
    debounce(async (email: string) => {
      if (!email) {
        setEmailValidationState(EMAIL_VALIDATION_STATE.IDLE)
        setErrorstate({ key: 'email', value: '' })
        return Promise.resolve()
      }

      if (!validEmail.test(email)) {
        setErrorstate({ key: 'email', value: 'Please enter a valid email address.' })
        setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
        return Promise.resolve()
      }

      isEmailAvailable({
        variables: { email },
      })
        .then((res) => {
          if (res.data?.userEmailIsAvailable) setEmailValidationState(EMAIL_VALIDATION_STATE.SUCCEEDED)
          else {
            setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
            setErrorstate({
              key: 'email',
              value: 'This email is already in use, please log in with that email or enter a different one.',
            })
          }
        })
        .catch((error: Error) => {
          setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
          setErrorstate({ key: 'email', value: error.message })
        })
      return Promise.resolve()
    }, 1000),
    [],
  )

  const renderEmailInputRightElement = () => {
    if (userEmailIsAvailableLoading) return <Loader size="md"></Loader>

    switch (emailValidationState) {
      case EMAIL_VALIDATION_STATE.IDLE:
        return null
      case EMAIL_VALIDATION_STATE.LOADING:
        return <Loader size="md"></Loader>
      case EMAIL_VALIDATION_STATE.FAILED:
        return <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
      case EMAIL_VALIDATION_STATE.SUCCEEDED:
        return <BsFillCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
      default:
        return null
    }
  }

  return (
    <>
      {showEmailComponent && (
        <CardLayout mobileDense width="100%" position="relative">
          <H1 size="2xl" bold>
            {t('Email and Updates')}
          </H1>

          <FieldContainer
            title={`${t('Your email')} ${hasSelectedRewards ? '*' : ''}`}
            subtitle={t('This email will be used by the seller to reach out to you.')}
          >
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
                  onFocus={() => setErrorstate({ key: 'email', value: '' })}
                />
                <InputRightElement>{renderEmailInputRightElement()}</InputRightElement>
              </InputGroup>
              {fundingFormError.email && <FormErrorMessage>{fundingFormError.email}</FormErrorMessage>}
            </FormControl>
          </FieldContainer>
          {needsShipping && (
            <Feedback
              variant={FeedBackVariant.WARNING}
              text={t(
                'To receive the selected rewards, please send your shipping details to the creator’s email, which will be revealed in the success screen.',
              )}
            />
          )}
          {!followsProject && (
            <HorizontalFormField
              label="Receive direct creator emails. If you accept, you will receive updates directly from this project via email."
              htmlFor="creator-email-toggle"
            >
              <Switch
                id="creator-email-toggle"
                isChecked={followProject}
                onChange={(e) => {
                  setTarget({ target: { name: 'followProject', value: e.target.checked } })
                  console.log('Follow Project Toggle:', e.target.checked)
                  console.log(
                    'Current required state:',
                    Boolean(hasSelectedRewards || followProject || subscribeToGeyserEmails),
                  )
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
                onChange={(e) => setTarget({ target: { name: 'subscribeToGeyserEmails', value: e.target.checked } })}
              />
            </HorizontalFormField>
          )}
        </CardLayout>
      )}
    </>
  )
}
