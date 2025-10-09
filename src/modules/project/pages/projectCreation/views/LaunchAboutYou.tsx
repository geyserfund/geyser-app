import { Avatar, Button, ButtonProps, HStack, Icon, Textarea, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiCheckBold } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import Loader from '@/components/ui/Loader.tsx'
import { useAuthContext } from '@/context/auth.tsx'
import { ConnectWithNostr } from '@/modules/auth/ConnectWithNostr.tsx'
import { ConnectWithSocial } from '@/modules/auth/ConnectWithSocial.tsx'
import { SocialAccountType } from '@/modules/auth/index.ts'
import { SocialConfig } from '@/modules/auth/SocialConfig.tsx'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { FieldContainer } from '@/shared/components/form/FieldContainer.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, useUpdateUserMutation } from '@/types/index.ts'
import {
  hasGithubAccount,
  hasNostrAccount,
  hasTwitterAccount,
  toInt,
  useCustomTheme,
  useMobileMode,
  useNotification,
} from '@/utils'

import { useUpdateProjectWithLastCreationStep } from '../hooks/useIsStepAhead.tsx'
import { useProjectStoryForm } from '../hooks/useProjectStoryForm.tsx'
import { ProjectCreationPageWrapper } from '../components/ProjectCreationPageWrapper.tsx'

export const LaunchAboutYou = () => {
  const navigate = useNavigate()
  const toast = useNotification()
  const isMobile = useMobileMode()

  const { user, queryCurrentUser } = useAuthContext()

  const [aboutYou, setAboutYou] = useState(user.bio)

  useEffect(() => {
    setAboutYou(user.bio)
  }, [user.bio])

  const { project, loading } = useProjectAtom()

  const [updateUser, { loading: updateUserLoading }] = useUpdateUserMutation()

  const { updateProjectWithLastCreationStep } = useUpdateProjectWithLastCreationStep(
    ProjectCreationStep.AboutYou,
    getPath('launchPayment', project.id),
  )

  const form = useProjectStoryForm({ project })

  const onLeave = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectDetails', project?.id))
  }

  const onBackCLick = () => {
    onLeave()
  }

  const onSubmit = async () => {
    if (user.bio === aboutYou) {
      updateProjectWithLastCreationStep()
      return
    }

    updateUser({
      variables: {
        input: {
          id: toInt(user.id),
          bio: aboutYou,
        },
      },
      onCompleted() {
        queryCurrentUser()
        updateProjectWithLastCreationStep()
      },
      onError(error) {
        toast.error({
          title: 'failed to update user bio',
          description: `${error}`,
        })
      },
    })
  }

  const continueProps: ButtonProps = {
    onClick: onSubmit,
    isLoading: updateUserLoading,
  }
  const backProps = {
    onClick: onBackCLick,
  }

  if (loading) {
    return <Loader />
  }

  const displayNostrButton = !hasNostrAccount(user) && !isMobile

  const displayTwitterButton = !hasTwitterAccount(user)

  const displayGithubButton = !hasGithubAccount(user)

  return (
    <ProjectCreationPageWrapper title={t('About you')} continueButtonProps={continueProps} backButtonProps={backProps}>
      <FieldContainer
        title={t('Tell contributors more about yourself')}
        subtitle={t(
          'Building trust with your contributors is one of the most important aspects of a successful project. Tell contributors a bit more about yourself. This information will show on your project page and profile.',
        )}
        error={form.formState.errors.description?.message}
      >
        <VStack
          w="full"
          h="full"
          border="1px solid"
          borderColor="neutral1.6"
          borderRadius="8px"
          overflow="hidden"
          gap={4}
          padding={4}
        >
          <HStack w="full">
            <Avatar size="xs" src={user?.imageUrl || ''} />
            <Body light>{user?.username}</Body>
          </HStack>

          <Textarea
            padding={0}
            border="none"
            placeholder={t('Write a bit more about yourself')}
            backgroundColor="utils.bg"
            value={aboutYou || ''}
            onChange={(e) => setAboutYou(e.target.value)}
          />
        </VStack>
      </FieldContainer>
      <FieldContainer
        title={t('Social Accounts')}
        subtitle={t('Help contributors get to know you better by linking your social accounts')}
      >
        <VStack w="full" spacing={4} paddingTop={4} alignItems="start">
          {displayTwitterButton ? (
            <ConnectWithSocial maxWidth="300px" accountType={SocialAccountType.twitter} w="full" />
          ) : (
            <ConnectedSocialAccountButton accountType={SocialAccountType.twitter} />
          )}

          {displayGithubButton ? (
            <ConnectWithSocial maxWidth="300px" accountType={SocialAccountType.github} w="full" />
          ) : (
            <ConnectedSocialAccountButton accountType={SocialAccountType.github} />
          )}

          {displayNostrButton ? (
            <ConnectWithNostr width="100%" maxWidth="300px" />
          ) : (
            <ConnectedSocialAccountButton accountType={SocialAccountType.nostr} />
          )}
        </VStack>
      </FieldContainer>
    </ProjectCreationPageWrapper>
  )
}

export const ConnectedSocialAccountButton = ({ accountType }: { accountType: SocialAccountType }) => {
  const { colors } = useCustomTheme()

  const { icon: SocialIcon, label } = SocialConfig[accountType]

  const icon = <SocialIcon color={colors.social[accountType]} fontSize="20px" boxSize="20px" />

  return (
    <HStack width="100%" justifyContent="space-between">
      <Button
        leftIcon={icon}
        size="lg"
        variant="soft"
        colorScheme="neutral1"
        w="full"
        maxWidth="300px"
        _hover={{ cursor: 'default' }}
      >
        {label}
      </Button>
      <HStack>
        <Body> {t('Connected')}</Body>
        <Icon as={PiCheckBold} color="primary1.9" />
      </HStack>
    </HStack>
  )
}
