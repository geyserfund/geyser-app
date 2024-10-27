import { Input, Switch } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
import { useUserEmailUpdateMutation } from '@/types'
import { validEmail } from '@/utils'

import { FieldContainer } from '../../../../../../../shared/components/form/FieldContainer'

export const FundingDetailsUserEmailAndUpdates = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()
  const { project } = useProjectAtom()
  const followedProjects = useFollowedProjectsValue()

  const { handleFollow, handleUnFollow } = useFollowProject(project)
  const [updatedCreatorEmailSetting, setUpdatedCreatorEmailSetting] = useState(false)
  const [updatedGeyserEmailsSetting, setUpdatedGeyserEmailsSetting] = useState(false)
  const [followsProject, setFollowsProject] = useState(followedProjects.find((p) => p.id === project.id) !== undefined)
  const [subscribedToGeyserEmails, setSubscribedToGeyserEmails] = useState(false)
  const [showEmailComponent, setShowEmailComponent] = useState(false)
  const [localEmail, setLocalEmail] = useState(user?.email || '')
  const { loadingUserNotificationSettings, getUserNotificationConfigValue, updateUserNotificationConfigValue } =
    useUserNotificationSettings(user.id)

  useEffect(() => {
    const followsProject = followedProjects.some((p) => p.id === project.id)
    setFollowsProject(followsProject)

    const isSubscribedToGeyserEmails =
      getUserNotificationConfigValue(UserNotificationType.PRODUCT_UPDATES, UserConfigName.IS_ENABLED) === 'true'
    setSubscribedToGeyserEmails(isSubscribedToGeyserEmails)

    const show = !user?.email || !followsProject || !isSubscribedToGeyserEmails
    setShowEmailComponent(show)
  }, [project.id, followedProjects, user?.email, getUserNotificationConfigValue, loadingUserNotificationSettings])

  const [updateUserEmail] = useUserEmailUpdateMutation()

  const {
    formState: { email, needsShipping },
    hasSelectedRewards,
    setTarget,
    fundingFormError,
    setErrorstate,
  } = useFundingFormAtom()

  const toggleCreatorEmails = (toggled: boolean) => {
    if (toggled) {
      handleFollow()
    } else {
      handleUnFollow()
    }

    setUpdatedCreatorEmailSetting(true)
  }

  const toggleGeyserEmails = (toggled: boolean) => {
    updateUserNotificationConfigValue(
      UserNotificationType.PRODUCT_UPDATES,
      UserConfigName.IS_ENABLED,
      toggled ? 'true' : 'false',
    )
    setUpdatedGeyserEmailsSetting(true)
  }

  /*
   Set the email from the user to the funding form. We do this because the input field
   is not shown if the user already has an email.
  */
  useEffect(() => {
    if (user?.email) setTarget({ target: { name: 'email', value: user.email } })
  }, [user?.email, setTarget])

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
              <Input
                required={hasSelectedRewards}
                type="email"
                name="email"
                placeholder="funderemail@gmail.com"
                value={localEmail}
                onChange={(e) => {
                  setLocalEmail(e.target.value)
                  setTarget(e)
                }}
                onBlur={() => {
                  console.log('localEmail', localEmail)
                  console.log('email', email)

                  if (localEmail && validEmail.test(localEmail)) {
                    updateUserEmail({
                      variables: {
                        input: {
                          email: localEmail,
                        },
                      },
                    })
                  }
                }}
                isInvalid={Boolean(fundingFormError.email)}
                onFocus={() => setErrorstate({ key: 'email', value: '' })}
              />
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
          {(updatedCreatorEmailSetting || !followsProject) && (
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
          {(updatedGeyserEmailsSetting || !subscribedToGeyserEmails) && (
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
        </CardLayout>
      )}
    </>
  )
}
