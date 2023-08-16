import { Accordion, Link, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

import { CardLayout } from '../../components/layouts'
import { AccordionButton } from './AccordionButton'
import { AccordionItem } from './AccordionItem'
import { AccordionPanel } from './AccordionPanel'

export const BadgesFAQ = () => {
  const { t } = useTranslation()
  return (
    <CardLayout width="100%">
      <Text variant="h3">FAQ</Text>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>{t('What is Nostr')}</AccordionButton>
          <AccordionPanel>
            <Trans
              i18nKey={
                "Nostr stands for 'Notes and Other Stuff Transmitted by Relays'. Like HTTP or TCP-IP, Nostr is a protocol; an open standard upon which anyone can build. Nostr itself is not an app or service that you sign up for. Check out <1>nostr.how</1> for more info"
              }
            >
              {
                "Nostr stands for 'Notes and Other Stuff Transmitted by Relays'. Like HTTP or TCP-IP, Nostr is a protocol; an open standard upon which anyone can build. Nostr itself is not an app or service that you sign up for. Check out "
              }
              <Link href="https://nostr.how">nostr.how</Link> for more info.
            </Trans>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('What are Nostr Badges')}</AccordionButton>
          <AccordionPanel>
            {t(
              'Nostr badges are a new event on Nostr that allows users to send and receive digital assets with an image, title and description. They are NIP-58 on Nostr',
            )}{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('How to redeem my Nostr badge')}</AccordionButton>
          <AccordionPanel>
            {t(
              'You can claim your Geyser badges very easily on your Geyser profile. Login with Nostr, go to profile and click &apos;claim&apos;.',
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            {t('Where can I see my Geyser badges?')}
          </AccordionButton>
          <AccordionPanel>
            {t(
              'You can access your Geyser badges on any Nostr platform that showcases Nostr badges such as badges.page and Amethist.',
            )}{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            {t('Who can edit and update Nostr Badges?')}
          </AccordionButton>
          <AccordionPanel>
            {t(
              'The issuer of the badges can edit information pertaining to the badges, but not revoke the badge at any point. Therefore Geyser can make edits to the badges if this is ever needed',
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>{t('Will there be more badges?')}</AccordionButton>
          <AccordionPanel>
            {t(
              'Yes! We intend to create more badges when we feel like there is a particular reason to recognize hard work or important achievements. But don&apos;t worry, we will not &apos;flood the system with badges&apos;.',
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            {t('Hey, I should have that badge!')}
          </AccordionButton>
          <AccordionPanel>
            <Trans
              i18nKey={
                'If you think you should have access to a badge reach out to us at <1>hello@geyser.fund</1> and we can review your badge privilege!'
              }
            >
              If you think you should have access to a badge reach out to us at
              <Link href="mailto:hello@geyser.fund">hello@geyser.fund</Link> and
              we can review your badge privilege!
            </Trans>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </CardLayout>
  )
}
