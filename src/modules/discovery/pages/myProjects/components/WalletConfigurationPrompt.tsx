import { useMutation } from '@apollo/client'
import { Box, Button, Circle, HStack, Icon, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'react'
import { PiCheckCircle, PiInfo, PiWarning } from 'react-icons/pi'

import { useUserAccountKeys } from '@/modules/auth/hooks/useUserAccountKeys.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import {
  decryptSeed,
  generateProjectKeysFromSeedHex,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { useAccountPasswordForm } from '@/modules/project/forms/accountPassword/useAccountPasswordForm.tsx'
import { MUTATION_PROJECT_RSK_EOA_SET } from '@/modules/project/graphql/mutation/projectMutation.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { UserAccountKeysFragment } from '@/types/index.ts'
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

type WalletConfigurationPromptProps = {
  projectId: string | number
  compact?: boolean
}

export const WalletConfigurationPrompt = ({ projectId, compact = false }: WalletConfigurationPromptProps) => {
  const toast = useNotification()
  const modal = useModal()

  useUserAccountKeys()

  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const accountPassword = useAtomValue(accountPasswordAtom)

  const [isSettingProjectKey, setIsSettingProjectKey] = useState(false)
  const successModal = useModal()

  const [projectRskEoaSet] = useMutation<ProjectRskEoaSetMutation, ProjectRskEoaSetMutationVariables>(
    MUTATION_PROJECT_RSK_EOA_SET,
    {
      refetchQueries: ['ProjectsForMyProjects'],
    },
  )

  const importantContent = (
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
  )

  const passwordCopy = {
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
      confirm: 'sm' as const,
      create: 'sm' as const,
    },
    importantContent,
    showFeedback: false,
    hidePasswordLabel: true,
  }

  const handleConfigureProjectKey = useCallback(
    async (data?: UserAccountKeysFragment, passwordOverride?: string) => {
      if (!projectId) {
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
        const projectKeys = generateProjectKeysFromSeedHex(decryptedSeed, projectId)

        await projectRskEoaSet({
          variables: {
            input: {
              projectId,
              rskEoa: projectKeys.address,
            },
          },
        })

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
    [accountPassword, modal, projectId, projectRskEoaSet, successModal, toast, userAccountKeys?.encryptedSeed],
  )

  const { renderForm, currentForm, titles } = useAccountPasswordForm({
    onComplete(data) {
      const password = currentForm.getValues?.('password') || ''
      handleConfigureProjectKey(data, password)
    },
    isCreator: true,
    copy: passwordCopy,
  })

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

      <Modal isOpen={successModal.isOpen} onClose={successModal.onClose} title={t('Wallet configured!')} size="md">
        <VStack spacing={5} align="stretch" py={2}>
          {/* Success Icon */}
          <HStack justify="center">
            <Circle size="60px" bg="success.2" color="success.11">
              <Icon as={PiCheckCircle} boxSize="32px" />
            </Circle>
          </HStack>

          {/* Main Message */}
          <Body size="md" color="neutral1.11">
            {t('Your wallet is configured and your project is ready to receive more contributions.')}
          </Body>

          {/* Important Notice */}
          <Box bg="warning.1" borderRadius="8px" p={4} borderLeft="3px solid" borderLeftColor="warning.9">
            <HStack spacing={2} align="start">
              <Icon as={PiWarning} color="warning.11" boxSize="20px" flexShrink={0} mt={0.5} />
              <VStack spacing={2} align="start" flex={1}>
                <Body size="sm" bold color="neutral1.12">
                  {t('Important')}:
                </Body>
                <Body size="sm" color="neutral1.11">
                  {t(
                    'Payouts are no longer automatic. You will need to claim them manually to your own wallet. You can do so anytime, as long as the withdrawable balance is at least $10 worth.',
                  )}
                </Body>
              </VStack>
            </HStack>
          </Box>

          <Button colorScheme="primary1" variant="solid" onClick={successModal.onClose} w="full" size="lg">
            {t('I understand')}
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
          spacing={2}
          px={3}
          py={2}
          bg="warning.1"
          borderRadius="6px"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack spacing={2} flex={1} alignItems="center">
            <Icon as={PiInfo} color="warning.11" boxSize="16px" flexShrink={0} />
            <Body size="sm" color="neutral1.11">
              <Body as="span" bold size="sm">
                {t('Wallet setup required.')}
              </Body>{' '}
              {t('Configure before {{keyConfigDeadline}} to continue receiving contributions.', {
                keyConfigDeadline: KEY_CONFIG_DEADLINE,
              })}{' '}
              <ChakraLink
                href="https://guides.geyser.fund"
                isExternal
                color="warning.11"
                textDecoration="underline"
                _hover={{ color: 'warning.12' }}
              >
                {t('Learn more')}
              </ChakraLink>
            </Body>
          </HStack>
          <Button colorScheme="warning" variant="soft" size="sm" flexShrink={0} onClick={modal.onOpen}>
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
            {t(
              'Geyser is migrating to a new payment infrastructure. Configure your new project wallet before the {{keyConfigDeadline}} to continue receiving contributions after that date. You can read more about it',
              { keyConfigDeadline: KEY_CONFIG_DEADLINE },
            )}{' '}
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
            {t('Configure project wallet')}
          </Button>
        </VStack>
      </Feedback>
      {modals}
    </>
  )
}
