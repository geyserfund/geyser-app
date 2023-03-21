import { Box, HStack, Text } from '@chakra-ui/layout'
import { HTMLChakraProps } from '@chakra-ui/system'

import { computeFunderBadges, getAvatarMetadata } from '../../../helpers'
import { Funder, Project } from '../../../types/generated/graphql'
import { commaFormatted } from '../../../utils'
import { SatoshiIconTilted } from '../../icons'
import { AnonymousAvatar, LinkableAvatar } from '../../ui'
import { renderFunderBadges } from './renderFunderBadges'

type Props = HTMLChakraProps<'div'> & {
  project: Project
  funder: Funder
  leaderboardPosition: number
}

export const ProjectFundingLeaderboardFeedItem = ({
  funder,
  leaderboardPosition,
  project,
  ...rest
}: Props) => {
  const anonymous = !funder.user
  const avatarMetadata = getAvatarMetadata({ funder })
  const funderBadges = computeFunderBadges({
    creationDateStringOfFundedContent: project.createdAt,
    funder,
  })

  return (
    <Box borderRadius="12px" {...rest}>
      <Box display="flex" justifyContent="space-between">
        <HStack>
          <Text fontWeight="bold" mr={2}>
            {leaderboardPosition}
          </Text>

          {anonymous ? (
            <AnonymousAvatar seed={funder.id} />
          ) : (
            <LinkableAvatar
              imageSrc={avatarMetadata.image}
              avatarUsername={avatarMetadata.username || ''}
              userProfileID={funder.user?.id}
              badgeNames={funderBadges.map((badge) => badge.badge)}
              badgeElements={renderFunderBadges(funderBadges)}
            />
          )}
        </HStack>

        <Box display="flex" alignItems="center">
          <SatoshiIconTilted scale={0.7} />
          <Text>{`${commaFormatted(funder.amountFunded || 0)}`} </Text>
        </Box>
      </Box>
    </Box>
  )
}
