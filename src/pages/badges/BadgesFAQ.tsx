import { Accordion, Link, Text } from '@chakra-ui/react'

import { CardLayout } from '../../components/layouts'
import { AccordionButton } from './AccordionButton'
import { AccordionItem } from './AccordionItem'
import { AccordionPanel } from './AccordionPanel'

export const BadgesFAQ = () => {
  return (
    <CardLayout width="100%">
      <Text variant="h3">FAQ</Text>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>What is Nostr</AccordionButton>
          <AccordionPanel>
            Nostr stands for &quot;Notes and Other Stuff Transmitted by
            Relays&quot;. Like HTTP or TCP-IP, Nostr is a protocol; an open
            standard upon which anyone can build. Nostr itself is not an app or
            service that you sign up for. Check out{' '}
            <Link href="https://nostr.how">nostr.how</Link> for more info.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>What are Nostr Badges</AccordionButton>
          <AccordionPanel>
            Nostr badges are a new event on Nostr that allows users to send and
            receive digital assets with an image, title and description. They
            are NIP-58 on Nostr{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>How to redeem my Nostr badge</AccordionButton>
          <AccordionPanel>
            You can claim your Geyser badges very easily on your Geyser profile.
            Login with Nostr, go to profile and click &apos;claim&apos;.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Where can I see my Geyser badges?</AccordionButton>
          <AccordionPanel>
            You can access your Geyser badges on any Nostr platform that
            showcases Nostr badges such as badges.page and Amethist.{' '}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            Who can edit and update Nostr Badges?
          </AccordionButton>
          <AccordionPanel>
            The issuer of the badges can edit information pertaining to the
            badges, but not revoke the badge at any point. Therefore Geyser can
            make edits to the badges if this is ever needed
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Will there be more badges?</AccordionButton>
          <AccordionPanel>
            Yes! We intend to create more badges when we feel like there is a
            particular reason to recognize hard work or important achievements.
            But don&apos;t worry, we will not &apos;flood the system with
            badges&apos;.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Hey, I should have that badge!</AccordionButton>
          <AccordionPanel>
            If you think you should have access to a badge reach out to us at
            <Link href="mailto:hello@geyser.fund">hello@geyser.fund</Link> and
            we can review your badge privilege!
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </CardLayout>
  )
}
