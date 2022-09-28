import { Box, Text } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import { Image } from '@chakra-ui/react';
import { LinkableAvatar, AnonymousAvatar } from '../../ui';
import { IFundingTx, IProject } from '../../../interfaces';
import { SatoshiIconTilted } from '../../icons';
import { getDaysAgo } from '../../../utils';
import { fonts } from '../../../constants/fonts';
import { commaFormatted } from '../../../utils/helperFunctions';
import { getAvatarMetadata } from '../../../helpers';

type Props = HTMLChakraProps<'div'> & {
  fundingTx: IFundingTx;
  project: IProject;
};

export const ProjectFundingContributionFeedItem = ({
  fundingTx,
  project,
  ...rest
}: Props) => {
  const { funder, onChain, paidAt, source } = fundingTx;

  const anonymous = !funder.user;
  const timeAgo = getDaysAgo(paidAt) || '';
  const avatarMetadata = getAvatarMetadata({ funder, source });

  return (
    <Box
      padding="10px 25px"
      mt={2}
      width="95%"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
      _hover={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)' }}
      borderRadius="4px"
      {...rest}
    >
      <Box display="flex" justifyContent="space-between">
        {anonymous ? (
          <AnonymousAvatar
            seed={fundingTx.funder.id}
            image={avatarMetadata.image}
          />
        ) : (
          <LinkableAvatar avatarMetadata={avatarMetadata} />
        )}

        <Box display="flex" alignItems="center">
          <SatoshiIconTilted scale={0.7} />
          <Text>{`${commaFormatted(fundingTx.amount)}`} </Text>
        </Box>
      </Box>
      <Box marginTop="6px" width="100%">
        {fundingTx.comment && (
          <Text mb="6px" fontFamily={fonts.solway}>
            {fundingTx.comment}
          </Text>
        )}
        {fundingTx.media && (
          <Image
            src={`${fundingTx.media}`}
            alt="gif"
            width="100%"
            borderRadius="4px"
          />
        )}
        <Text
          mt="6px"
          color="brand.textGrey"
          fontSize="10px"
          fontFamily={fonts.solway}
        >
          {timeAgo && `${onChain ? '⛓' : '⚡️'} ${timeAgo} ago `}
          {() => {
            if (avatarMetadata.appName) {
              return `from ${avatarMetadata.appName}`;
            }

            if (source && source !== 'geyser') {
              return `from ${source}`;
            }
          }}
        </Text>
      </Box>
    </Box>
  );
};
