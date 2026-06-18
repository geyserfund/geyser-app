import { useQuery } from '@apollo/client'
import { Button, HStack, Input, InputGroup, InputRightElement, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { QUERY_USER_PROJECT_RSK_EOA_BACKUP } from '@/modules/profile/graphql/queries/userQuery.ts'
import { decryptMnemonic, getSeedWords } from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useNotification } from '@/utils'

const SeedWordsFeedback = () => (
  <>
    <Feedback variant={FeedBackVariant.WARNING}>
      <Body size="sm">
        {t(
          'Store them somewhere secure and offline, like a paper backup. Never share them. Anyone with these words can access your Bitcoin.',
        )}
      </Body>
    </Feedback>
    <Feedback variant={FeedBackVariant.INFO}>
      <Body size="sm">{t('These recovery words store your Bitcoin on the Rootstock sidechain or on base-chain.')}</Body>
    </Feedback>
  </>
)

type ProjectWalletBackupEntry = {
  projectId: string | number | bigint
  projectName?: string | null
  projectTitle?: string | null
  address: string
  derivationPath?: string | null
  current: boolean
  createdAt?: string | null
  replacedAt?: string | null
}

export const SeedWordsSection = () => {
  const toast = useNotification()
  const user = useAtomValue(authUserAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const setAccountPassword = useSetAtom(accountPasswordAtom)
  const seedWordsModal = useModal()
  const { data: backupData } = useQuery(QUERY_USER_PROJECT_RSK_EOA_BACKUP, {
    variables: { where: { id: user.id } },
    skip: !user.id,
    fetchPolicy: 'network-only',
  })

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isDecryptingSeed, setIsDecryptingSeed] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>([])
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [isSeedWordsView, setIsSeedWordsView] = useState(false)

  if (!userAccountKeys?.encryptedMnemonic) {
    return null
  }

  const handleCloseSeedWordsModal = () => {
    seedWordsModal.onClose()
    setPassword('')
    setShowPassword(false)
    setPasswordError(null)
    setSeedWords([])
    setShowSeedWords(false)
    setIsSeedWordsView(false)
  }

  const handleViewSeedWords = async () => {
    if (!userAccountKeys?.encryptedMnemonic) {
      toast.error({ title: t('Unable to find your account keys') })
      return
    }

    if (!password) {
      setPasswordError(t('Password is required'))
      return
    }

    setIsDecryptingSeed(true)
    setPasswordError(null)

    try {
      const mnemonic = await decryptMnemonic(userAccountKeys.encryptedMnemonic, password)
      setSeedWords(getSeedWords('', mnemonic))
      setShowSeedWords(false)
      setAccountPassword(password)
      setIsSeedWordsView(true)
    } catch (_error) {
      setPasswordError(t('Invalid password'))
    } finally {
      setIsDecryptingSeed(false)
    }
  }

  const handleDownloadBackup = () => {
    const mnemonic = seedWords.join(' ')
    const projectWallets = getProjectWalletBackupEntries(backupData)

    const backup = {
      warning:
        'Keep this file private and secure. Anyone with these seed words can access funds controlled by this wallet.',
      exportedAt: new Date().toISOString(),
      seedWords: mnemonic,
      userWallet: {
        address: userAccountKeys?.rskKeyPair.address,
        derivationPath: userAccountKeys?.rskKeyPair.derivationPath,
      },
      projectWallets,
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `geyser-wallet-backup-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const projectWallets = getProjectWalletBackupEntries(backupData)

  const projectDerivationPathsView = projectWallets.length ? (
    <VStack align="stretch" spacing={2}>
      <Body medium>{t('Project derivation paths')}</Body>
      {projectWallets.map((wallet) => (
        <VStack
          key={`${wallet.projectId}-${wallet.address}`}
          align="stretch"
          spacing={1}
          borderWidth="1px"
          borderColor="neutral1.4"
          borderRadius="md"
          p={2}
        >
          <Body size="sm" medium>
            {wallet.projectTitle || wallet.projectName}
          </Body>
          <Body size="sm" color="neutral1.10" wordBreak="break-all">
            {t('{{status}} address: {{address}}', {
              status: wallet.current ? t('Current') : t('Historical'),
              address: wallet.address,
            })}
          </Body>
          <Body size="sm" color="neutral1.10" wordBreak="break-all">
            {t('Derivation path: {{path}}', { path: wallet.derivationPath || t('Unavailable') })}
          </Body>
        </VStack>
      ))}
    </VStack>
  ) : null

  const seedWordsListView = (
    <VStack w="full" spacing={4} align="stretch">
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Body medium>{t('Recovery words')}</Body>
          <Button size="sm" variant="soft" colorScheme="primary1" onClick={() => setShowSeedWords((prev) => !prev)}>
            {showSeedWords ? t('Hide words') : t('Show words')}
          </Button>
        </HStack>
        <SimpleGrid w="full" columns={{ base: 2, md: 3 }} spacing={2}>
          {seedWords.map((word, index) => (
            <HStack key={`${word}-${index}`} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={2}>
              <Body size="sm" muted>
                {index + 1}.
              </Body>
              <Body size="sm">{showSeedWords ? word : '••••••••'}</Body>
            </HStack>
          ))}
        </SimpleGrid>
        <SeedWordsFeedback />
        <VStack align="stretch" spacing={1}>
          <Body medium>{t('User wallet derivation path')}</Body>
          <Body size="sm" color="neutral1.10" wordBreak="break-all">
            {userAccountKeys?.rskKeyPair.derivationPath || t('Unavailable')}
          </Body>
        </VStack>
        {projectDerivationPathsView}
        <VStack align="stretch" spacing={2}>
          <Feedback variant={FeedBackVariant.WARNING}>
            <Body size="sm">
              {t('The backup file contains your seed words and derivation paths. Keep it private and secure.')}
            </Body>
          </Feedback>
          <Button size="sm" variant="outline" colorScheme="primary1" onClick={handleDownloadBackup}>
            {t('Download wallet backup')}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  )

  const seedWordsPasswordView = (
    <VStack w="full" spacing={4} align="stretch">
      <Body size="sm">
        {t('Enter your account password to view your seed words. Keep them private and store them in a secure place.')}
      </Body>

      <VStack align="stretch" spacing={2}>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('Enter your password')}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" variant="ghost" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? t('Hide') : t('Show')}
            </Button>
          </InputRightElement>
        </InputGroup>
        {passwordError ? (
          <Body size="sm" color="error.9">
            {passwordError}
          </Body>
        ) : null}
      </VStack>

      <Button
        size="md"
        colorScheme="primary1"
        onClick={handleViewSeedWords}
        isLoading={isDecryptingSeed}
        isDisabled={isDecryptingSeed}
      >
        {t('Show seed words')}
      </Button>
    </VStack>
  )

  return (
    <>
      <VStack id="recovery-seed" spacing={4} align="flex-start" w="full">
        <H2 size="md">{t('Recovery seed words')}</H2>
        <Body size="md" color="neutral1.10" maxW="4xl">
          {t(
            'These recovery words back up your Bitcoin wallet on Geyser. They are the only way to recover your funds if you lose access.',
          )}
        </Body>
        <SeedWordsFeedback />
        <Button size="md" colorScheme="primary1" variant="outline" onClick={seedWordsModal.onOpen}>
          {t('View seed words')}
        </Button>
      </VStack>

      <Modal isOpen={seedWordsModal.isOpen} onClose={handleCloseSeedWordsModal} title={t('View seed words')} size="md">
        {isSeedWordsView ? seedWordsListView : seedWordsPasswordView}
      </Modal>
    </>
  )
}

const getProjectWalletBackupEntries = (backupData: any): ProjectWalletBackupEntry[] =>
  ((backupData as any)?.user?.ownerOf ?? []).flatMap((owner: any) => {
    const { project } = owner
    if (!project?.rskEoas?.length) return []

    return project.rskEoas.map((rskEoa: any) => ({
      projectId: project.id,
      projectName: project.name,
      projectTitle: project.title,
      address: rskEoa.rskAddress,
      derivationPath: rskEoa.derivationPath,
      current: rskEoa.isCurrent,
      createdAt: rskEoa.createdAt,
      replacedAt: rskEoa.replacedAt,
    }))
  })
