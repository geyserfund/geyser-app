import { Button, ButtonProps, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiLightning } from 'react-icons/pi'

import { Modal } from '@/shared/components/layouts'
import { useModal } from '@/shared/hooks'

import { Body } from '../../../../../../../../../shared/components/typography'
import { LightningAddress } from './LightningAddress'
import { NpubDisplay } from './NpubDisplay'

interface LightningAddressModalProps extends ButtonProps {
  name: string
  npub?: string
}

export const GEYSER_DOMAIN_POSTFIX = '@geyser.fund'

export const LightningAddressModal = ({ name, npub, ...rest }: LightningAddressModalProps) => {
  const { t } = useTranslation()

  const lightningAddressModal = useModal()

  return (
    <>
      <Button
        id="lightning-address"
        size="sm"
        variant="soft"
        colorScheme="primary1"
        leftIcon={<PiLightning fontSize={'16px'} />}
        onClick={lightningAddressModal.onOpen}
        {...rest}
      >
        <Body size="sm" medium isTruncated flex={1}>
          {name}
        </Body>

        <Body size="sm" medium>
          {GEYSER_DOMAIN_POSTFIX}
        </Body>
      </Button>

      <Modal
        size="lg"
        {...lightningAddressModal}
        title={t('Lightning address & NPUB')}
        bodyProps={{ as: VStack, gap: 6 }}
      >
        <VStack w="full" spacing={3}>
          <VStack w="full" alignItems={'start'} spacing={0}>
            <Body size="sm">{t('A Lightning Address is an email-like identifier for receiving Bitcoin.')}</Body>
            <UnorderedList>
              <ListItem>
                <Body size="sm">
                  {t(
                    'Add this Lightning Address to your Nostr profile for this project to get “zapped” (tipped) directly by other users',
                  )}
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm">
                  {t('Share your Geyser Lightning address with anyone, and they can fund you through it instantly.')}
                </Body>
              </ListItem>
            </UnorderedList>
          </VStack>
          <LightningAddress flex={1} name={name} />
        </VStack>
        {npub && (
          <VStack w="full" spacing={3}>
            <Body size="sm">
              {t(
                "Nostr npub is your project's unique identifier on the censorship-resistant, decentralized Nostr social network.",
              )}
            </Body>

            <NpubDisplay npub={npub} />
          </VStack>
        )}
      </Modal>
    </>
  )
}
