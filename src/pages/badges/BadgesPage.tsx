import { Box, Button, Container, Text, VStack } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../components/layouts'
import { useBadges } from '../../graphql/hooks/useBadges'
import BadgeItem from './BadgeItem'
import BadgeList from './BadgeList'
import { BadgesFAQ } from './BadgesFAQ'

export const BADGE_TYPE_MAP: Record<string, string> = {
  contributor: 'Contributor',
  creator: 'Creator',
  grant: 'Grant',
}

export const BADGE_SUBTYPE_MAP: Record<string, string> = {
  // contributor
  'amount-funded': 'Amount funded',
  'count-projects-funded': 'Projects funded',
  'open-source': 'Open source',
  // creator
  podcast: 'Podcast',
  epic: 'Epic',
  // grant
  winner: 'Winner',
  board: 'Board',
}

export const BadgesPage = () => {
  const navigate = useNavigate()
  const { badges } = useBadges()

  return (
    <Container maxWidth="5xl" pt={10}>
      <Button
        mt={4}
        size="sm"
        bg="brand.bgWhite"
        variant="outline"
        gap={2}
        onClick={() => navigate(-1)}
        fontSize="sm"
      >
        <FaArrowLeft /> Back
      </Button>
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
          Object.keys(badges).map((type) => {
            const subtypes = badges[type]
            return (
              <Box key={type} pt={6} width="100%">
                <CardLayout width="100%">
                  <Box pb={4}>
                    <Text
                      textAlign="left"
                      width="100%"
                      borderBottom="2px solid"
                      borderColor="neutral.200"
                      pb={1}
                      variant="h2"
                    >
                      {BADGE_TYPE_MAP[type]}
                    </Text>
                    {subtypes &&
                      Object.keys(subtypes).map((subtype) => {
                        const subtypeBadges = subtypes[subtype]
                        return (
                          <Box key={subtype}>
                            <BadgeList title={BADGE_SUBTYPE_MAP[subtype]}>
                              {subtypeBadges &&
                                subtypeBadges.map(
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
