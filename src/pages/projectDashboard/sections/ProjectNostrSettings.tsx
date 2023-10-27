import {
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { TbWorld } from 'react-icons/tb'

import { Body1, Body2 } from '../../../components/typography'
import { useProjectContext } from '../../../context'

export const ProjectNostrSettings = () => {
  const { t } = useTranslation()

  const { project } = useProjectContext()

  if (!project) {
    return null
  }

  return (
    <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
      <VStack width="full" alignItems="flex-start">
        <Body2>
          {t(
            'Nostr is a simple, open protocol that enables global, decentralized, and censorship-resistant broadcasting of information. Geyser provides each project with its own npub. This means that you are able to access your project from other Nostr clients, and that your activity on Geyser will be viewable and accessible cross-platform.',
          )}
        </Body2>
        <Body2>
          {t(
            'Below you can find the information you need to access your public and private keys.',
          )}
        </Body2>
      </VStack>

      <VStack width="full" alignItems="flex-start">
        <Body1 semiBold>{t('Your Nostr Public Key (npub)')}</Body1>
        <InputGroup size="md">
          <Input value={'npubadsf9a7df987ad98f7ads98'} />
          <InputRightElement>
            <IconButton
              aria-label="copy-nostr-npub"
              size="sm"
              onClick={() => {}}
            />
          </InputRightElement>
        </InputGroup>
      </VStack>

      <VStack width="full" alignItems="flex-start">
        <Body1 semiBold>{t('Your Nostr Private Key (nsec)')}</Body1>
        <VStack
          padding={{ base: '10px', lg: '20px' }}
          bgColor="neutral.100"
          width="full"
          borderRadius={'8px'}
          alignItems="flex-start"
        >
          <Input width="full" value={'nsecadsf9a7df987ad98f7ads98'} />
          <Body2 color="secondary.red">
            {t(
              'Warning: Before exporting your private keys, make sure to read the following message.',
            )}
          </Body2>

          <Body2>
            {t(
              'You can export your Geyser project private keys to access it from another Nostr client. However, keep in mind of the following:',
            )}
            <ul>
              <li>
                {t(
                  'If you lose or leak your private keys your project risks being compromised, and there is nothing we can do about your project being compromised.',
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
          </Body2>
          <Button width="full" variant="secondary">
            {' '}
            {t('Export Private key (nsec)')}
          </Button>
        </VStack>
      </VStack>

      <VStack w="full" alignItems="flex-start">
        <Body1 semiBold>{t('The Relays')}</Body1>

        <Body2>{t('These are the relays that we publish to.')}</Body2>

        <VStack
          padding={{ base: '10px', lg: '20px' }}
          bgColor="neutral.100"
          width="full"
          borderRadius={'8px'}
          alignItems="flex-start"
        >
          <RelayDisplayComponent relayLink="wss://relay.geyser.fund" />
          <RelayDisplayComponent relayLink="wss://relay.damus.io" />
          <RelayDisplayComponent relayLink="wss://relay.nostr.info" />
          <RelayDisplayComponent relayLink="wss://brb.io" />
        </VStack>
      </VStack>
    </VStack>
  )
}

export const RelayDisplayComponent = ({ relayLink }: { relayLink: string }) => {
  return (
    <HStack w="full" justifyContent={'start'}>
      <TbWorld />
      <Body1>{relayLink}</Body1>
    </HStack>
  )
}
