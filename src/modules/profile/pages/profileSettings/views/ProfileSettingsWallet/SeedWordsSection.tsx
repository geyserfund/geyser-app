import { useQuery } from '@apollo/client'
import { Button, HStack, Input, InputGroup, InputRightElement, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

import { authUserAtom } from '@/modules/auth/state/authAtom.ts'
import { userAccountKeysAtom } from '@/modules/auth/state/userAccountKeysAtom.ts'
import { QUERY_USER_PROJECT_RSK_EOA_BACKUP } from '@/modules/profile/graphql/queries/userQuery.ts'
import {
  decryptMnemonic,
  decryptSeedPayload,
  generateProjectKeysFromSeedHex,
  getSeedWords,
} from '@/modules/project/forms/accountPassword/keyGenerationHelper.ts'
import { accountPasswordAtom } from '@/modules/project/forms/accountPassword/state/passwordStorageAtom.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { __production__ } from '@/shared/constants/index.ts'
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

const PrivateKeyFeedback = () => (
  <>
    <Feedback variant={FeedBackVariant.WARNING}>
      <Body size="sm">
        {t(
          'Store this private key somewhere secure and offline. Never share it. Anyone with this private key can access the funds on this project wallet.',
        )}
      </Body>
    </Feedback>
    <Feedback variant={FeedBackVariant.INFO}>
      <Body size="sm">{t('This private key controls Bitcoin on the Rootstock sidechain.')}</Body>
    </Feedback>
  </>
)

export type ProjectWalletBackupEntry = {
  projectId: string | number | bigint
  projectName?: string | null
  projectTitle?: string | null
  address: string
  derivationPath?: string | null
  privateKey?: string | null
  current: boolean
  createdAt?: string | null
  replacedAt?: string | null
}

type SeedWordsModalProps = {
  isOpen: boolean
  onClose: () => void
  accountKeys?: RecoveryAccountKeys | null
  projectWallets?: ProjectWalletBackupEntry[] | null
}

export type RecoveryAccountKeys = {
  id?: string | number | bigint
  encryptedMnemonic?: string | null
  encryptedSeed?: string | null
  rskKeyPair: {
    address: string
    derivationPath: string
  }
}

export const SeedWordsModal = ({
  isOpen,
  onClose,
  accountKeys: accountKeysOverride,
  projectWallets: projectWalletsOverride,
}: SeedWordsModalProps) => {
  const toast = useNotification()
  const user = useAtomValue(authUserAtom)
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const recoveryAccountKeys = accountKeysOverride || userAccountKeys
  const setAccountPassword = useSetAtom(accountPasswordAtom)
  const { data: backupData } = useQuery(QUERY_USER_PROJECT_RSK_EOA_BACKUP, {
    variables: { where: { id: user.id } },
    skip: !isOpen || !user.id || Boolean(projectWalletsOverride),
    fetchPolicy: 'network-only',
  })

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isDecryptingSeed, setIsDecryptingSeed] = useState(false)
  const [seedWords, setSeedWords] = useState<string[]>([])
  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const [privateKeyWallet, setPrivateKeyWallet] = useState<ProjectWalletBackupEntry | null>(null)
  const [showSeedWords, setShowSeedWords] = useState(false)
  const [isSeedWordsView, setIsSeedWordsView] = useState(false)

  if (!recoveryAccountKeys?.encryptedMnemonic && !recoveryAccountKeys?.encryptedSeed) {
    return null
  }

  const handleCloseSeedWordsModal = () => {
    onClose()
    setPassword('')
    setShowPassword(false)
    setPasswordError(null)
    setSeedWords([])
    setPrivateKey(null)
    setPrivateKeyWallet(null)
    setShowSeedWords(false)
    setIsSeedWordsView(false)
  }

  const handleViewRecoveryData = async () => {
    if (!recoveryAccountKeys?.encryptedMnemonic && !recoveryAccountKeys?.encryptedSeed) {
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
      if (recoveryAccountKeys.encryptedMnemonic) {
        const mnemonic = await decryptMnemonic(recoveryAccountKeys.encryptedMnemonic, password)
        setSeedWords(getSeedWords('', mnemonic))
        setPrivateKey(null)
        setPrivateKeyWallet(null)
      } else {
        const seedPayload = await decryptSeedPayload(recoveryAccountKeys.encryptedSeed as string, password)
        const privateKeyRecovery = deriveProjectPrivateKey(seedPayload.seed, projectWalletsOverride)
        setPrivateKey(privateKeyRecovery.privateKey)
        setPrivateKeyWallet(privateKeyRecovery.wallet)
        setSeedWords([])
      }

      setShowSeedWords(false)
      setAccountPassword(password)
      setIsSeedWordsView(true)
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message.startsWith('Unable') ? error.message : 'Invalid password'
      setPasswordError(t(errorMessage))
    } finally {
      setIsDecryptingSeed(false)
    }
  }

  const handleDownloadBackup = () => {
    const projectWallets = projectWalletsOverride || getProjectWalletBackupEntries(backupData, recoveryAccountKeys.id)
    const hasPrivateKey = Boolean(privateKey && privateKeyWallet)
    const mnemonic = seedWords.join(' ')

    const backup = hasPrivateKey
      ? {
          warning:
            'Keep this file private and secure. Anyone with these private keys can access funds controlled by this wallet.',
          exportedAt: new Date().toISOString(),
          projectWallets: projectWallets.map((wallet) => ({
            ...wallet,
            privateKey:
              privateKeyWallet?.address.toLowerCase() === wallet.address.toLowerCase()
                ? normalizePrivateKey(privateKey)
                : null,
          })),
        }
      : {
          warning:
            'Keep this file private and secure. Anyone with these seed words can access funds controlled by this wallet.',
          exportedAt: new Date().toISOString(),
          seedWords: mnemonic,
          userWallet: {
            address: recoveryAccountKeys?.rskKeyPair.address,
            derivationPath: recoveryAccountKeys?.rskKeyPair.derivationPath,
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

  const projectWallets = projectWalletsOverride || getProjectWalletBackupEntries(backupData, recoveryAccountKeys.id)
  const isPrivateKeyView = Boolean(privateKey && privateKeyWallet)

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
            {t('Address')}: {wallet.address}
          </Body>
          <Body size="sm" color="neutral1.10" wordBreak="break-all">
            {t('Derivation path')}: {wallet.derivationPath || t('Unavailable')}
          </Body>
        </VStack>
      ))}
    </VStack>
  ) : null

  const privateKeyRecoveryView =
    privateKey && privateKeyWallet ? (
      <VStack w="full" spacing={4} align="stretch">
        <PrivateKeyFeedback />

        <VStack align="stretch" spacing={3}>
          <Body medium>{privateKeyWallet.projectTitle || privateKeyWallet.projectName || t('Project wallet')}</Body>
          <VStack align="stretch" spacing={2} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={3}>
            <Body size="sm" color="neutral1.10" wordBreak="break-all">
              {t('Address')}: {privateKeyWallet.address}
            </Body>
            <Body size="sm" color="neutral1.10" wordBreak="break-all">
              {t('Derivation path')}: {privateKeyWallet.derivationPath || t('Unavailable')}
            </Body>
            <Body size="sm" color="neutral1.10" wordBreak="break-all">
              {t('Private key')}: {showSeedWords ? normalizePrivateKey(privateKey) : '••••••••'}
            </Body>
          </VStack>
          <Button
            size="sm"
            variant="soft"
            colorScheme="primary1"
            alignSelf="flex-start"
            onClick={() => setShowSeedWords((prev) => !prev)}
          >
            {showSeedWords ? t('Hide private key') : t('Show private key')}
          </Button>
        </VStack>

        <VStack align="stretch" spacing={2}>
          <Feedback variant={FeedBackVariant.WARNING}>
            <Body size="sm">
              {t('The recovery file contains your private key and derivation path. Keep it private and secure.')}
            </Body>
          </Feedback>
          <Button size="md" variant="outline" colorScheme="primary1" onClick={handleDownloadBackup}>
            {t('Download recovery file')}
          </Button>
        </VStack>
      </VStack>
    ) : null

  const seedWordsListView = (
    <VStack w="full" spacing={4} align="stretch">
      <SeedWordsFeedback />

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5} alignItems="stretch">
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Body medium>{t('Recovery words')}</Body>
            <Button size="sm" variant="soft" colorScheme="primary1" onClick={() => setShowSeedWords((prev) => !prev)}>
              {showSeedWords ? t('Hide words') : t('Show words')}
            </Button>
          </HStack>
          <SimpleGrid w="full" columns={{ base: 2, md: 3, lg: 2 }} spacing={2}>
            {seedWords.map((word, index) => (
              <HStack key={`${word}-${index}`} borderWidth="1px" borderColor="neutral1.4" borderRadius="md" p={2}>
                <Body size="sm" muted>
                  {index + 1}.
                </Body>
                <Body size="sm">{showSeedWords ? word : '••••••••'}</Body>
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>

        <VStack align="stretch" spacing={3} h={{ lg: 'full' }} maxH={{ lg: '724px' }} overflowY={{ lg: 'auto' }}>
          <VStack align="stretch" spacing={1}>
            <Body medium>{t('User wallet derivation path')}</Body>
            <Body size="sm" color="neutral1.10" wordBreak="break-all">
              {recoveryAccountKeys?.rskKeyPair.derivationPath || t('Unavailable')}
            </Body>
          </VStack>
          {projectDerivationPathsView}
        </VStack>
      </SimpleGrid>

      <VStack align="stretch" spacing={2}>
        <Feedback variant={FeedBackVariant.WARNING}>
          <Body size="sm">
            {t('The recovery file contains your seed words and derivation paths. Keep it private and secure.')}
          </Body>
        </Feedback>
        <Button size="md" variant="outline" colorScheme="primary1" onClick={handleDownloadBackup}>
          {t('Download recovery file')}
        </Button>
      </VStack>
    </VStack>
  )

  const seedWordsPasswordView = (
    <VStack w="full" spacing={4} align="stretch">
      <Body size="sm">
        {t('Enter your account password to view your recovery data. Keep it private and store it in a secure place.')}
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
        onClick={handleViewRecoveryData}
        isLoading={isDecryptingSeed}
        isDisabled={isDecryptingSeed}
      >
        {t('View recovery data')}
      </Button>
    </VStack>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseSeedWordsModal}
      title={t('View recovery data')}
      size={isSeedWordsView && !isPrivateKeyView ? '2xl' : 'md'}
    >
      {isSeedWordsView ? privateKeyRecoveryView || seedWordsListView : seedWordsPasswordView}
    </Modal>
  )
}

export const SeedWordsSection = () => {
  const userAccountKeys = useAtomValue(userAccountKeysAtom)
  const seedWordsModal = useModal()

  if (!userAccountKeys?.encryptedMnemonic) {
    return null
  }

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

      <SeedWordsModal isOpen={seedWordsModal.isOpen} onClose={seedWordsModal.onClose} />
    </>
  )
}

const getProjectWalletBackupEntries = (
  backupData: any,
  accountKeysId?: string | number | bigint,
): ProjectWalletBackupEntry[] =>
  ((backupData as any)?.user?.ownerOf ?? []).flatMap((owner: any) => {
    const { project } = owner
    if (!project?.rskEoas?.length) return []

    const normalizedAccountKeysId = accountKeysId?.toString()

    return project.rskEoas
      .filter((rskEoa: any) =>
        normalizedAccountKeysId ? rskEoa.accountKeys?.id?.toString() === normalizedAccountKeysId : rskEoa.isCurrent,
      )
      .map((rskEoa: any) => ({
        projectId: project.id,
        projectName: project.name,
        projectTitle: project.title,
        address: rskEoa.rskAddress,
        derivationPath: decodeHtmlEntities(rskEoa.derivationPath),
        current: rskEoa.isCurrent,
        createdAt: rskEoa.createdAt,
        replacedAt: rskEoa.replacedAt,
      }))
  })

const decodeHtmlEntities = (value?: string | null) => {
  if (!value) return value

  const textarea = document.createElement('textarea')
  let decodedValue = value

  for (let index = 0; index < 3; index += 1) {
    textarea.innerHTML = decodedValue
    const nextDecodedValue = textarea.value
    if (nextDecodedValue === decodedValue) break
    decodedValue = nextDecodedValue
  }

  return decodedValue
}

const normalizePrivateKey = (value?: string | null) => {
  if (!value) return ''

  return value.startsWith('0x') ? value : `0x${value}`
}

const deriveProjectPrivateKey = (seedHex: string, projectWallets?: ProjectWalletBackupEntry[] | null) => {
  const wallet = projectWallets?.find((projectWallet) => projectWallet.derivationPath || projectWallet.address)

  if (!wallet) {
    throw new Error('Unable to find project wallet recovery data')
  }

  const { projectId } = wallet
  const coinType = __production__ ? '137' : '37310'
  const candidatePaths = [
    wallet.derivationPath,
    `m/44'/${coinType}'/0'/0/${projectId}`,
    `m/44'/${coinType}'/0'/1/${projectId}`,
  ].filter((path, index, paths): path is string => Boolean(path) && paths.indexOf(path) === index)

  for (const derivationPath of candidatePaths) {
    const keys = generateProjectKeysFromSeedHex(seedHex, projectId, decodeHtmlEntities(derivationPath))
    if (!wallet.address || keys.address.toLowerCase() === wallet.address.toLowerCase()) {
      return {
        privateKey: keys.privateKey,
        wallet: {
          ...wallet,
          derivationPath: decodeHtmlEntities(derivationPath),
        },
      }
    }
  }

  throw new Error('Unable to derive a private key for this project wallet')
}
