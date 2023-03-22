import { Box, Container, Text, VStack } from '@chakra-ui/react'

import defaultBadge from '../../assets/badges/temporary-badge.png'
import { CardLayout } from '../../components/layouts'
import { User } from '../../types'
import BadgeItem from './BadgeItem'
import BadgeList from './BadgeList'

const FUNDERS_BADGES = {
  contributionAmounts: [
    {
      id: 1,
      title: 'Geyser Funder 100k',
      description:
        'This badge is awarded to the honorable plebs that made at least one contribution on Geyser.fund.',
      image: defaultBadge,
      winners: [
        {
          id: 1,
          imageUrl: defaultBadge,
        },
      ] as User[],
    },
    {
      id: 1,
      title: 'Geyser Funder 100k',
      description:
        'This badge is awarded to the honorable plebs that made at least one contribution on Geyser.fund.',
      image: defaultBadge,
      winners: [
        {
          id: 1,
          imageUrl: defaultBadge,
        },
      ] as User[],
    },
    {
      id: 1,
      title: 'Geyser Funder 100k',
      description:
        'This badge is awarded to the honorable plebs that made at least one contribution on Geyser.fund.',
      image: defaultBadge,
      winners: [
        {
          id: 1,
          imageUrl: defaultBadge,
        },
      ] as User[],
    },
  ],
}

export const BadgesPage = () => {
  const funderBadges = FUNDERS_BADGES

  return (
    <Container maxWidth="5xl" pt={10}>
      <VStack spacing={4} justify="center" textAlign="center">
        <Container maxWidth="xl">
          <Text variant="h2">Geyser badges</Text>
          <Text variant="body1">
            To recognize active users, Geyser issues and awards users with Nostr
            badges, which can more fully recognize their actions.
          </Text>
        </Container>
        <Box pt={6} width="100%">
          <CardLayout width="100%">
            <Text
              textAlign="left"
              width="100%"
              borderBottom="2px solid"
              borderColor="neutral.200"
              pb={1}
              variant="h3"
            >
              Funders badges
            </Text>
            <Box>
              <BadgeList title="Contribution amounts">
                {funderBadges.contributionAmounts.map((badge) => (
                  <BadgeItem key={badge.id} {...badge} />
                ))}
              </BadgeList>
            </Box>
          </CardLayout>
        </Box>
      </VStack>
    </Container>
  )
}
