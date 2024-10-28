import { FormErrorMessage, Input, InputGroup, InputRightElement, Switch, useToast } from '@chakra-ui/react'
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
import { useFollowProject } from '@/shared/hooks/graphqlState'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { lightModeColors } from '@/shared/styles'
import { useUserCreateMutation, useUserEmailUpdateMutation } from '@/types'
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
  const toast = useToast()
  const followedProjects = useFollowedProjectsValue()

  const [followsProject, setFollowsProject] = useState(followedProjects.find((p) => p.id === project.id) !== undefined)
  const [subscribedToGeyserEmails, setSubscribedToGeyserEmails] = useState(false)
  const [showEmailComponent, setShowEmailComponent] = useState(
    !user?.email || !followsProject || !subscribedToGeyserEmails,
  )
  const [localEmail, setLocalEmail] = useState(user?.email || '')
  const [emailValidationState, setEmailValidationState] = useState(
    localEmail ? EMAIL_VALIDATION_STATE.SUCCEEDED : EMAIL_VALIDATION_STATE.IDLE,
  )
  const [userId, setUserId] = useState(user?.id || 0)

  const [updatedSettings, setUpdatedSettings] = useState({
    creatorEmail: false,
    geyserEmails: false,
    userEmail: false,
  })
  const { updateUserNotificationConfigValue } = useUserNotificationSettings(userId)

  const [createUser, { loading: createUserLoading }] = useUserCreateMutation()
  const [updateUserEmail, { loading: updateUserEmailLoading }] = useUserEmailUpdateMutation()
  const { handleFollow, handleUnFollow, error: followHookError } = useFollowProject(project)

  useEffect(() => {
    console.log('in SHOW useEffect', user?.email, followsProject, subscribedToGeyserEmails)

    const show = !user?.email || !followsProject || !subscribedToGeyserEmails
    setShowEmailComponent(show)
  }, [])

  /*
   Set the email from the user to the funding form. We do this because the input field
   is not shown if the user already has an email.
  */
  useEffect(() => {
    if (user?.email) setTarget({ target: { name: 'email', value: user.email } })
  }, [])

  const {
    formState: { needsShipping },
    hasSelectedRewards,
    setTarget,
    fundingFormError,
    setErrorstate,
  } = useFundingFormAtom()

  const toggleCreatorEmails = (toggled: boolean) => {
    if (toggled) handleFollow()
    else handleUnFollow()

    setFollowsProject(toggled)
    setUpdatedSettings({ ...updatedSettings, creatorEmail: true })
  }

  const debouncedEmailValidation = useCallback(
    debounce(async (email: string) => {
      if (!email) return Promise.resolve()

      if (!validEmail.test(email)) {
        setErrorstate({ key: 'email', value: 'Please enter a valid email address.' })
        setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
        return Promise.resolve()
      }

      setUpdatedSettings({ ...updatedSettings, userEmail: true })

      if (!user?.id) {
        createUser({
          variables: {
            input: {
              email,
            },
          },
        })
          .then((res) => {
            setEmailValidationState(EMAIL_VALIDATION_STATE.SUCCEEDED)
            setUserId(res.data?.userCreate.id || 0)
          })
          .catch((error) => {
            setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
            setErrorstate({ key: 'email', value: error.message })
          })
      } else {
        updateUserEmail({
          variables: {
            input: {
              email,
            },
          },
        })
          .then(() => {
            setEmailValidationState(EMAIL_VALIDATION_STATE.SUCCEEDED)
          })
          .catch((error) => {
            setEmailValidationState(EMAIL_VALIDATION_STATE.FAILED)
            setErrorstate({ key: 'email', value: error.message })
          })
      }

      return Promise.resolve()
    }, 1000),
    [],
  )

  useEffect(() => {
    if (followHookError) {
      toast({
        title: 'Error',
        description: followHookError?.message,
        status: 'error',
      })
      setFollowsProject((prev) => !prev)
    }
  }, [followHookError])

  const toggleGeyserEmails = (toggled: boolean) => {
    updateUserNotificationConfigValue(
      UserNotificationType.PRODUCT_UPDATES,
      UserConfigName.IS_ENABLED,
      toggled ? 'true' : 'false',
    )

    setSubscribedToGeyserEmails(toggled)
    console.log('SUBSCRIBED TO GEYSER EMAILS', subscribedToGeyserEmails)
    setUpdatedSettings({ ...updatedSettings, geyserEmails: true })
  }

  const renderEmailInputRightElement = () => {
    if (createUserLoading || updateUserEmailLoading) return <Loader size="md"></Loader>

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
          {!user?.email && (
            <FieldContainer
              title={`${t('Your email')} ${hasSelectedRewards ? '*' : ''}`}
              subtitle={t('This email will be used by the seller to reach out to you.')}
            >
              <InputGroup>
                <Input
                  required={hasSelectedRewards}
                  type="email"
                  name="email"
                  placeholder="funderemail@gmail.com"
                  value={localEmail}
                  onChange={(e) => {
                    console.log('IN ON CHANGE', e.target.value)
                    setLocalEmail(e.target.value)
                    setTarget(e)
                    setEmailValidationState(EMAIL_VALIDATION_STATE.LOADING)
                    debouncedEmailValidation(e.target.value)
                  }}
                  isInvalid={Boolean(fundingFormError.email)}
                  onFocus={() => setErrorstate({ key: 'email', value: '' })}
                />
                <InputRightElement>{renderEmailInputRightElement()}</InputRightElement>
              </InputGroup>
              {fundingFormError.email}
            </FieldContainer>
          )}
          {needsShipping && (
            <Feedback
              variant={FeedBackVariant.WARNING}
              text={t(
                'To receive the selected rewards, please send your shipping details to the creator’s email, which will be revealed in the success screen.',
              )}
            />
          )}
          {emailValidationState === EMAIL_VALIDATION_STATE.SUCCEEDED && (
            <>
              {!followsProject && (
                <HorizontalFormField
                  label="Receive direct creator emails. If you accept, you will receive updates directly from this project via email."
                  htmlFor="creator-email-toggle"
                >
                  <Switch
                    id="creator-email-toggle"
                    isChecked={followsProject}
                    onChange={(e) => toggleCreatorEmails(e.target.checked)}
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
                    isChecked={subscribedToGeyserEmails}
                    onChange={(e) => toggleGeyserEmails(e.target.checked)}
                  />
                </HorizontalFormField>
              )}
            </>
          )}
        </CardLayout>
      )}
    </>
  )
}
