import { Box, Container, Text, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../components/layouts'
import { useBadges } from '../../graphql/hooks/useBadges'
import BadgeItem from './BadgeItem'
import BadgeList from './BadgeList'
import { BadgesFAQ } from './BadgesFAQ'

export const BadgesPage = () => {
  const { badges } = useBadges()

  return (
    <Container maxWidth="5xl" pt={10}>
      <VStack spacing={4} justify="center" textAlign="center" mb={12}>
        <Container maxWidth="xl">
          <Text mb={4} variant="h2">
            Geyser badges
          </Text>
          <Text variant="body1">
            To recognize active users, Geyser issues and awards users with Nostr
            badges, which can more fully recognize their actions.
          </Text>
        </Container>
        {badges &&
          Object.keys(badges).map((category) => {
            return (
              <Box key={category} pt={6} width="100%">
                <CardLayout width="100%">
                  <Box pb={4}>
                    <Text
                      textAlign="left"
                      width="100%"
                      borderBottom="2px solid"
                      borderColor="neutral.200"
                      pb={1}
                      variant="h3"
                    >
                      {category}
                    </Text>
                    {badges[category] &&
                      Object.keys(badges[category]).map((subcategory) => {
                        return (
                          <Box key={subcategory}>
                            <BadgeList title={subcategory}>
                              {badges[category][subcategory] &&
                                badges[category][subcategory].map(
                                  (badge) =>
                                    badge && (
                                      <BadgeItem key={badge.id} {...badge} />
                                    ),
                                )}
                            </BadgeList>
                          </Box>
                        )
                      })}
                  </Box>
                </CardLayout>
              </Box>
            )
          })}
        <Box pt={6} width="100%">
          <BadgesFAQ />
        </Box>
      </VStack>
    </Container>
  )
}
