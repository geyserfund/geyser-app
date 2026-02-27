import { useMutation } from '@apollo/client'
import { Button, HStack, Image, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo, useState } from 'react'

import { useAuthContext } from '@/context/auth.tsx'
import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  decryptSeed,
  generateProjectKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { MUTATION_PROJECT_RSK_EOA_SET } from '@/modules/project/graphql/mutation/projectMutation.ts'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectFundingStrategy, UserAccountKeysFragment } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

const KEY_CONFIG_DEADLINE = '30th of April 2026'

type ProjectRskEoaSetMutation = {
  projectRskEoaSet: {
    id: string
    rskEoa?: string | null
  }
}

type ProjectRskEoaSetMutationVariables = {
  input: {
    projectId: string | number
    rskEoa: string
  }
}

type TiaRskEoaSetupNoticeProps = {
  compact?: boolean
}

export const TiaRskEoaSetupNotice = ({ compact = false }: TiaRskEoaSetupNoticeProps) => {
  const { user } = useAuthContext()
  const toast = useNotification()
  const modal = useModal()

  const { project, isProjectOwner, partialUpdateProject } = useProjectAtom()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const accountPassword = useAtomValue(accountPasswordAtom)

  const [isSettingProjectKey, setIsSettingProjectKey] = useState(false)
  const successModal = useModal()

  const [projectRskEoaSet] = useMutation<ProjectRskEoaSetMutation, ProjectRskEoaSetMutationVariables>(
    MUTATION_PROJECT_RSK_EOA_SET,
  )

  const needsProjectKey = !project?.rskEoa
  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll

  const shouldShow = Boolean(user?.id && isProjectOwner && isTiaProject && needsProjectKey)

  const message = t(
    'Geyser is migrating to a new payment infrastructure. Configure your new project wallet before the {{keyConfigDeadline}} to continue receiving contributions after that date. You can read more about it',
    { keyConfigDeadline: KEY_CONFIG_DEADLINE },
  )

  const buttonLabel = t('Configure project wallet')

  const importantContent = useMemo(
    () => (
      <Feedback variant={FeedBackVariant.WARNING} noIcon>
        <VStack spacing={1} align="start">
          <Body size="sm">
            <strong>{t('Important')}</strong>
            {': '}
            {t(
              "this password is required to claim your funds. Store it somewhere safe, like a password manager. We can't recover it for you.",
            )}{' '}
            <ChakraLink
              href="https://guides.geyser.fund"
              isExternal
              color="amber1.900"
              textDecoration="underline"
              _hover={{ color: 'amber1.1000', textDecoration: 'underline' }}
            >
              {t('Learn more')}
            </ChakraLink>
          </Body>
        </VStack>
      </Feedback>
    ),
    [],
  )

  const passwordCopy = useMemo(
    () => ({
      titles: {
        confirm: t('Confirm your password'),
        create: t('Configure your password'),
      },
      introText: {
        confirm: t(
          'Enter the password you previously configured. This will be used to generate a new wallet for your project.',
        ),
        create: t(
          'Enter an account password. This will be used to generate keys for your account and a new wallet for your project.',
        ),
      },
      introSize: {
        confirm: 'sm',
        create: 'sm',
      },
      importantContent,
      showFeedback: false,
      hidePasswordLabel: true,
    }),
    [importantContent],
  )

  const handleConfigureProjectKey = useCallback(
    async (data?: UserAccountKeysFragment, passwordOverride?: string) => {
      if (!project?.id) {
        toast.error({ title: t('Missing project id') })
        return
      }

      const encryptedSeed = data?.encryptedSeed || userAccountKeys?.encryptedSeed
      if (!encryptedSeed) {
        toast.error({ title: t('Unable to find your account keys') })
        return
      }

      const password = passwordOverride || accountPassword || ''
      if (!password) {
        toast.error({ title: t('Missing account password') })
        return
      }

      setIsSettingProjectKey(true)

      try {
        const decryptedSeed = await decryptSeed(encryptedSeed, password)
        const projectKeys = generateProjectKeysFromSeedHex(decryptedSeed, project.id)

        const result = await projectRskEoaSet({
          variables: {
            input: {
              projectId: project.id,
              rskEoa: projectKeys.address,
            },
          },
        })

        const rskEoa = result.data?.projectRskEoaSet?.rskEoa || projectKeys.address
        partialUpdateProject({ rskEoa })

        toast.success({
          title: t('Project key configured'),
        })

        modal.onClose()
        successModal.onOpen()
      } catch (error) {
        toast.error({
          title: t('Failed to configure project key'),
        })
      } finally {
        setIsSettingProjectKey(false)
      }
    },
    [
      accountPassword,
      modal,
      partialUpdateProject,
      project?.id,
      projectRskEoaSet,
      successModal,
      toast,
      userAccountKeys?.encryptedSeed,
    ],
  )

  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      const password = currentForm.getValues?.('password') || ''
      void handleConfigureProjectKey(data, password)
    },
    isCreator: true,
    copy: passwordCopy,
  })

  if (!shouldShow) {
    return null
  }

  const modals = (
    <>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose} title={titles} size="md">
        <VStack as="form" w="full" spacing={6} onSubmit={currentForm.onSubmit}>
          {renderForm()}
          <Button
            width="200px"
            size="lg"
            colorScheme="primary1"
            type="submit"
            isLoading={Boolean(currentForm.isSubmitting || currentForm.formState?.isSubmitting || isSettingProjectKey)}
          >
            {t('Continue')}
          </Button>
        </VStack>
      </Modal>

      <Modal isOpen={successModal.isOpen} onClose={successModal.onClose} title={t('Project key configured')}>
        <VStack spacing={4} align="start">
          <Body size="md">
            {t(
              "You're all set. In the new funding flow, payouts aren't automatic. You'll need to claim payouts to your wallet.",
            )}
          </Body>
          <Button colorScheme="primary1" variant="solid" onClick={successModal.onClose}>
            {t('Got it')}
          </Button>
        </VStack>
      </Modal>
    </>
  )

  if (compact) {
    return (
      <>
        <HStack
          w="full"
          justifyContent="space-between"
          alignItems="center"
          bg="utils.pbg"
          border="1px solid"
          borderColor="warning.9"
          borderRadius="8px"
          px={4}
          py={4}
          spacing={4}
        >
          <HStack spacing={3} flex={1} alignItems="center">
            <Image
              src="/icons/creator_tools_wallet.png"
              alt="wallet"
              boxSize="52px"
              objectFit="contain"
              flexShrink={0}
              // filter="grayscale(1)"
            />
            <VStack align="start" spacing={0}>
              <Body size="md" bold>
                {t('Configure your project wallet')}
              </Body>
              <Body size="sm" color="neutral1.11">
                {t('Set up before')} {KEY_CONFIG_DEADLINE} {t('to continue receiving contributions.')}{' '}
                {t('You can read more about this migration')}{' '}
                <ChakraLink
                  href="https://guides.geyser.fund"
                  isExternal
                  color="warning.10"
                  textDecoration="underline"
                  _hover={{ color: 'warning.11' }}
                >
                  {t('here')}
                </ChakraLink>
                {'.'}
              </Body>
            </VStack>
          </HStack>
          <Button colorScheme="warning" variant="solid" size="md" flexShrink={0} onClick={modal.onOpen}>
            {t('Configure')}
          </Button>
        </HStack>
        {modals}
      </>
    )
  }

  return (
    <>
      <Feedback variant={FeedBackVariant.WARNING}>
        <VStack spacing={4} align="stretch">
          <Body size="xl" bold>
            {t('Configure your project wallet')}
          </Body>
          <Body dark>
            {message}{' '}
            <ChakraLink
              href="https://guides.geyser.fund"
              isExternal
              color="amber1.900"
              textDecoration="underline"
              _hover={{ color: 'amber1.1000', textDecoration: 'underline' }}
            >
              {t('here')}
            </ChakraLink>
            {'.'}
          </Body>
          <Button colorScheme="warning" variant="solid" size="lg" w="full" onClick={modal.onOpen}>
            {buttonLabel}
          </Button>
        </VStack>
      </Feedback>
      {modals}
    </>
  )
}
