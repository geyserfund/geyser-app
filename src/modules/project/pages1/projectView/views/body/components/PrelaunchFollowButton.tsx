import { Box, Button, ButtonProps, HStack, Image, useClipboard, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { useEffect } from 'react'

import { AuthModal } from '@/components/molecules/AuthModal.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { useEmailPrompt } from '@/modules/auth/hooks/useEmailPrompt.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { EmailPromptModalUrl, FollowBellIllurationsUrl } from '@/shared/constants/index.ts'
import { useFollowProject } from '@/shared/hooks/graphqlState/useFollowProject.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import {
  Project,
  useUserNotificationsSettingsQuery,
  useUserNotificationsSettingsUpdateMutation,
} from '@/types/index.ts'
import { NotificationSettings } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

export const FOLLOWERS_NEEDED = 21

type PrelaunchFollowButtonProps = ButtonProps & {
  project: Pick<Project, 'id' | 'name' | 'title' | 'followersCount'>
  onFollowCompleted?: () => void
}

export const PrelaunchFollowButton = ({ project, onFollowCompleted, ...props }: PrelaunchFollowButtonProps) => {
  const { user } = useAuthContext()
  const { loginOnOpen } = useAuthModal()

  const loginModal = useModal()
  const emailModal = useModal()
  const followSuccessModal = useModal()

  const projectUrl = `${window.location.origin}/project/${project.name}`

  const { onCopy, hasCopied } = useClipboard(projectUrl)

  const userHasEmail = Boolean(user?.email)

  const { handleFollow, isFollowed } = useFollowProject(project, {
    onFollowCompleted() {
      followSuccessModal.onOpen()
      onFollowCompleted?.()
    },
  })

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (!user || !user.id) {
      loginOnOpen()
      return
    }

    if (!userHasEmail) {
      emailModal.onOpen()
      return
    }

    handleFollow()
  }

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onCopy()
  }

  return (
    <>
      {!isFollowed ? (
        <Button size="lg" variant="solid" colorScheme="primary1" onClick={handleClick} {...props}>
          {t('Follow')}
        </Button>
      ) : (
        <Button
          variant="outline"
          colorScheme={hasCopied ? 'primary1' : 'neutral1'}
          w="full"
          size="lg"
          onClick={handleCopy}
          {...props}
        >
          {hasCopied ? t('Link copied!') : t('Share link')}
        </Button>
      )}

      <AuthModal
        isOpen={loginModal.isOpen}
        onClose={() => {
          loginModal.onClose()
        }}
      />
      <EmailInputModal isOpen={emailModal.isOpen} onClose={emailModal.onClose} onCloseAction={handleFollow} />
      <FollowSuccessModal isOpen={followSuccessModal.isOpen} onClose={followSuccessModal.onClose} project={project} />
    </>
  )
}

const FollowSuccessModal = ({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean
  onClose: () => void
  project: Pick<Project, 'name' | 'followersCount'>
}) => {
  const { followersCount } = project
  const followersNeeded = FOLLOWERS_NEEDED - (followersCount ?? 0)

  const enoughFollowers = followersNeeded <= 0

  const projectUrl = `${window.location.origin}/project/${project.name}`

  const { onCopy, hasCopied } = useClipboard(projectUrl)
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('Successful follow!')}
      bodyProps={{ as: VStack, width: 'full', gap: 8 }}
    >
      <HStack w="full" justifyContent="center">
        <Image height="200px" width="auto" src={FollowBellIllurationsUrl} alt="Email illustration" />
      </HStack>
      <VStack w={'full'} alignItems={'flex-start'} gap={2}>
        {!enoughFollowers && (
          <Body>
            {t('This project still needs {{countdown}} followers to be able to start raising funds.', {
              countdown: followersNeeded,
            })}
          </Body>
        )}
        <Body>{t('Share it with other friends to help spread the word and make this project a reality!')}</Body>
        <Body>{t('We’ll email you when the project goes live.')}</Body>
      </VStack>
      <Button width="full" variant="outline" colorScheme={hasCopied ? 'primary1' : 'neutral1'} onClick={onCopy}>
        {hasCopied ? t('Copied!') : t('Copy link')}
      </Button>
    </Modal>
  )
}

type EmailInputModalProps = {
  onCloseAction?: () => void
  onClose: () => void
  isOpen: boolean
}

const EmailInputModal = ({ onCloseAction, onClose, isOpen }: EmailInputModalProps) => {
  const { user } = useAuthContext()
  const toast = useNotification()

  const { control, handleSubmit, onSubmit, enableSave, reset } = useEmailPrompt({
    afterEmailUpdate: onCloseAction,
  })

  const [productUpdatesNotificationSetting, setProductUpdatesNotificationSetting] = useState<NotificationSettings>()

  useUserNotificationsSettingsQuery({
    skip: !user?.id,
    variables: {
      userId: user?.id,
    },
    onCompleted(data) {
      const productUpdatesSetting = data?.userNotificationSettingsGet.userSettings.notificationSettings.find(
        (setting: NotificationSettings) => setting.notificationType === 'user.productUpdates',
      )
      setProductUpdatesNotificationSetting(productUpdatesSetting)
    },
  })

  const [updateNotificationSetting] = useUserNotificationsSettingsUpdateMutation()

  const updateProductUpdatesNotification = async (data: any) => {
    const configId = productUpdatesNotificationSetting?.configurations.find(
      (config) => config.name === 'is_enabled',
    )?.id
    if (!configId) return

    const value = data.email ? 'true' : 'false'

    try {
      await updateNotificationSetting({
        variables: {
          userNotificationConfigurationId: configId,
          value,
        },
      })
    } catch (error) {
      toast.error({
        title: 'Update failed',
        description: 'Failed to update product updates notification setting. Please try again.',
      })
    }
  }

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const handleEmailPrompSubmit = (data: any) => {
    onSubmit(data)
    updateProductUpdatesNotification(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('Add email to follow')}>
      <form onSubmit={handleSubmit(handleEmailPrompSubmit)}>
        <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={4}>
          <Box w="100%" height="200px" display="flex" justifyContent="center" alignItems="center">
            <Image height="100%" src={EmailPromptModalUrl} alt="Email illustration" objectFit="contain" />
          </Box>
          <VStack justifyContent="flex-start" alignItems="flex-start" w="100%" gap={1}>
            <Body size="sm" medium>
              {t('You’re about to power a launch!')}
            </Body>
            <Body size="sm" light>
              {t('To follow Launchpad projects, we need your email so we can ping you when they go live. ')}
            </Body>
          </VStack>
          <VStack w="100%" gap={2}>
            <ControlledTextInput control={control} name="email" label="" placeholder="satoshi@gmx.com" />
          </VStack>
          <Button w="100%" variant="solid" colorScheme="primary1" type="submit" isDisabled={!enableSave}>
            {t('Save')}
          </Button>
        </VStack>
      </form>
    </Modal>
  )
}
