import { Stack, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'

import { Head } from '@/config/Head'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1, H3 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'

const TERMS_START = 'February 27, 2026'
const TERMS_END = 'May 30, 2026 23:59:59 (America/Asuncion)'

export const GiveawayTermsPage = () => {
  return (
    <>
      <Head
        title="Giveaway Terms: Acelerando Bitcoin VIP"
        description="Terms for the Acelerando Bitcoin VIP ticket giveaway on Geyser."
        url={`https://geyser.fund${getPath('legalGiveawayAcelerandoVipTerms')}`}
      />

      <VStack w="full" spacing={6} alignItems="stretch">
        <CardLayout w="full" gap={4}>
          <H1>Acelerando Bitcoin VIP Giveaway Terms</H1>
          <Body>
            Contest window: {TERMS_START} to {TERMS_END}
          </Body>
        </CardLayout>

        <CardLayout w="full" gap={3}>
          <H3>Eligibility and scoring</H3>
          <Stack as="ul" spacing={2} pl={5}>
            <Body as="li">Only contributions made while logged in are eligible.</Body>
            <Body as="li">Contributions to your own projects do not count.</Body>
            <Body as="li">Score equals total eligible sats contributed during the contest window.</Body>
            <Body as="li">Winners are the top 3 contributors at the deadline.</Body>
          </Stack>
        </CardLayout>

        <CardLayout w="full" gap={3}>
          <H3>Prize and claims</H3>
          <Stack as="ul" spacing={2} pl={5}>
            <Body as="li">Prize: one (1) VIP conference pass per winner.</Body>
            <Body as="li">Travel and accommodation are excluded unless explicitly stated otherwise.</Body>
            <Body as="li">Winners are contacted by email and/or inbox within 7 days after contest end.</Body>
            <Body as="li">Winners must respond within 72 hours to claim the ticket.</Body>
          </Stack>
        </CardLayout>

        <CardLayout w="full" gap={3}>
          <H3>Anti-fraud and tie-breakers</H3>
          <Stack as="ul" spacing={2} pl={5}>
            <Body as="li">Refunded or chargeback-related contributions are excluded.</Body>
            <Body as="li">In score ties, earlier timestamp of reaching that score wins.</Body>
            <Body as="li">If still tied, lower user ID lexicographically wins.</Body>
            <Body as="li">One ticket per person.</Body>
          </Stack>
          <Body>We may review suspicious activity and disqualify ineligible entries.</Body>
          <Body>Final eligibility decisions are made at our discretion.</Body>
        </CardLayout>

        <CardLayout w="full" gap={2}>
          <Body as={RouterLink} to={getPath('giveawayAcelerandoVip')} textDecoration="underline">
            Back to giveaway page
          </Body>
        </CardLayout>
      </VStack>
    </>
  )
}
