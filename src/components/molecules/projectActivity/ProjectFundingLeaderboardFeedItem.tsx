import { Box, Text, HStack } from '@chakra-ui/layout';
import { Badge } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import { getAvatarMetadata, computeFunderBadges } from '../../../helpers';
import { IProject, IFunder } from '../../../interfaces';
import { commaFormatted } from '../../../utils';
import { SatoshiIconTilted } from '../../icons';
import { AnonymousAvatar, LinkableAvatar } from '../../ui';
import { renderFunderBadges } from './renderFunderBadges';

type Props = HTMLChakraProps<'div'> & {
  project: IProject;
  funder: IFunder;
  leaderboardPosition: number;
};

export const ProjectFundingLeaderboardFeedItem = ({
  funder,
  leaderboardPosition,
  project,
  ...rest
}: Props) => {
  const anonymous = !funder.user;
  const avatarMetadata = getAvatarMetadata({ funder });
  const funderBadges = computeFunderBadges({
    creationDateStringOfFundedContent: project.createdAt,
    funder,
  });

  return (
    <Box
      padding="10px 25px"
      mt={2}
      width="95%"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
      _hover={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)' }}
      borderRadius="12px"
      {...rest}
    >
      <Box display="flex" justifyContent="space-between">
        <HStack>
          <Text fontWeight="bold" mr={2}>
            {leaderboardPosition}
          </Text>

          {anonymous ? (
            <AnonymousAvatar seed={funder.id} />
          ) : (
            <LinkableAvatar
              avatarMetadata={avatarMetadata}
              badgeNames={funderBadges.map((badge) => badge.badge)}
              badgeElements={renderFunderBadges(funderBadges)}
            />
          )}
        </HStack>

        <Box display="flex" alignItems="center">
          <SatoshiIconTilted scale={0.7} />
          <Text>{`${commaFormatted(funder.amountFunded)}`} </Text>
        </Box>
      </Box>
    </Box>
  );
};
