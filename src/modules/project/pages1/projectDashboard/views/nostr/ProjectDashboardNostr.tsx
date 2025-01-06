import { CopyIcon } from '@chakra-ui/icons'
import { HStack, IconButton, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbWorld } from 'react-icons/tb'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { SkeletonLayout } from '@/shared/components/layouts/SkeletonLayout'
import { Body } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { useNotification } from '../../../../../../utils'
import { DashboardLayout } from '../../common'
import { ExportNostrKeysModal } from './components/ExportNostrKeysModal'

export const ProjectDashboardNostr = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project } = useProjectAtom()

  const [copied, setCopied] = useState(false)

  const handleCopyNPub = async () => {
    try {
      navigator.clipboard.writeText(project?.keys.nostrKeys.publicKey.npub || '')
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    } catch {
      toast({
        title: 'failed to copy',
        status: 'error',
      })
    }
  }

  if (!project) return null

  return (
    <DashboardLayout desktopTitle={t('Nostr settings')}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1} paddingX={{ base: 0, lg: 6 }}>
        <VStack width="full" alignItems="flex-start">
          <Body size="sm" light>
            {t(
              'Nostr is a simple, open protocol that enables global, decentralized, and censorship-resistant broadcasting of information. Geyser provides each project with its own npub. This means that you are able to access your project from other Nostr clients, and that your activity on Geyser will be viewable and accessible cross-platform.',
            )}
          </Body>
          <Body size="sm" light>
            {t('Below you can find the information you need to access your public and private keys.')}
          </Body>
        </VStack>

        <VStack width="full" alignItems="flex-start">
          <Body medium>{t('Your Nostr Public Key (npub)')}</Body>
          {!project?.keys.nostrKeys.publicKey.npub ? (
            <SkeletonLayout height="40px" width="full" />
          ) : (
            <InputGroup size="md">
              <Input
                value={project?.keys.nostrKeys.publicKey.npub}
                backgroundColor={copied ? 'primary1.9' : 'initial'}
                borderRadius="8px"
              />
              <InputRightElement>
                <IconButton aria-label="copy-nostr-npub" size="sm" onClick={handleCopyNPub} icon={<CopyIcon />} />
              </InputRightElement>
            </InputGroup>
          )}
        </VStack>

        <VStack width="full" alignItems="flex-start">
          <Body medium>{t('Your Nostr Private Key Kit (nsec)')}</Body>
          <CardLayout>
            <Feedback
              variant={FeedBackVariant.WARNING}
              text={t('Warning: Before exporting your private keys, make sure to read the following message.')}
            />

            <Body size="sm">
              {t(
                'You can export your Geyser project private keys to access it from another Nostr client. However, keep in mind of the following:',
              )}
              <ul style={{ paddingLeft: '15px' }}>
                <li>
                  {t(
                    "Handle the key with a lot of care. Anyone holding the private key can post on the project's behalf. If you leak your private key, the project risks being compromised, and there is nothing Geyser can do to prevent it.",
                  )}
                </li>
                <li>
                  {t(
                    "Geyser takes custody of your private keys, therefore we don't recommend using these private keys for the non-custodial Nostr experience.",
                  )}
                </li>
                <li>
                  {t(
                    'Not all Geyser features are built on Nostr yet, therefore not all content you create on Geyser will interoperate with the rest of the Nostr Network.',
                  )}
                </li>
                <li>
                  {t(
                    'If you change your Geyser lightning address from other clients Geyser has no way to verify the Zaps being made from other clients, therefore, these Zaps won’t show up on Geyser.',
                  )}
                </li>
              </ul>
            </Body>
            <ExportNostrKeysModal projectTitle={project?.title} projectId={project?.id} />
          </CardLayout>
        </VStack>

        <VStack w="full" alignItems="flex-start">
          <Body medium>{t('The Relays')}</Body>

          <Body size="sm">{t('These are the relays that we publish to.')}</Body>

          <CardLayout width="full" borderRadius={'12px'} alignItems="flex-start" spacing={2}>
            <RelayDisplayComponent relayLink="wss://relay.geyser.fund" />
            <RelayDisplayComponent relayLink="wss://relay.damus.io" />
            <RelayDisplayComponent relayLink="wss://relay.snort.social" />
            <RelayDisplayComponent relayLink="wss://nos.lol" />
            <RelayDisplayComponent relayLink="wss://relay.primal.net" />
          </CardLayout>
        </VStack>
      </VStack>
    </DashboardLayout>
  )
}

export const RelayDisplayComponent = ({ relayLink }: { relayLink: string }) => {
  return (
    <HStack
      w="full"
      justifyContent={'start'}
      padding={1}
      paddingX={2}
      backgroundColor="neutral1.3"
      border="1px solid"
      borderColor="neutral1.6"
      borderRadius="8px"
    >
      <TbWorld />
      <Body>{relayLink}</Body>
    </HStack>
  )
}
