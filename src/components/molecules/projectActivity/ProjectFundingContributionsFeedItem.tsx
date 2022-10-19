import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import {
  Image,
  Stack,
  Box,
  Text,
  useColorModeValue,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { LinkableAvatar, AnonymousAvatar, ProjectAvatarLink } from '../../ui';
import { SatoshiIconTilted } from '../../icons';
import { getDaysAgo } from '../../../utils';
import { commaFormatted } from '../../../utils/helperFunctions';
import { computeFunderBadges, getAvatarMetadata } from '../../../helpers';
import { Funder, FundingTx, Project } from '../../../types/generated/graphql';
import { renderFunderBadges } from './renderFunderBadges';

type Props = HTMLChakraProps<'div'> & {
  funder: Funder;
  project: Project;
  transactionInfo: FundingTx;
  showsProjectLink?: boolean;
};

export const ProjectFundingContributionsFeedItem = ({
  funder,
  project,
  transactionInfo,
  showsProjectLink = false,
  ...rest
}: Props) => {
  const isFunderAnonymous = Boolean(funder?.user) === false;
  const timeAgo = getDaysAgo(funder?.confirmedAt || '');
  const wasMadeOnChain = transactionInfo.onChain;

  const avatarMetadata = getAvatarMetadata({
    funder,
    source: transactionInfo.source,
  });

  const funderBadges = computeFunderBadges({
    project,
    funder,
  });

  return (
    <VStack
      flexDirection="column"
      spacing={'6px'}
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="2px"
      borderColor={'brand.neutral100'}
      _hover={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)' }}
      rounded={'md'}
      px={'26px'}
      py={'10px'}
      overflow={'hidden'}
      width={{
        base: '100%',
        md: '375px',
      }}
      {...rest}
    >
      {/* Funding Stats Header */}

      <Box display="flex" justifyContent="space-between" width={'full'}>
        {/* Funder Avatar */}
        {isFunderAnonymous ? (
          <HStack spacing={2}>
            <AnonymousAvatar
              seed={funder.id}
              image={avatarMetadata.image}
              imageSize={'20px'}
              textColor="brand.neutral900"
            />
            <Text>Anonymous Funder</Text>
          </HStack>
        ) : (
          <LinkableAvatar
            avatarMetadata={avatarMetadata}
            fontSize={'14px'}
            imageSize={'20px'}
            textColor="brand.neutral900"
            badgeNames={funderBadges.map((badge) => badge.badge)}
            badgeElements={renderFunderBadges(funderBadges)}
          />
        )}

        {/* Funding Amount */}
        <Box display="flex" alignItems="center">
          <SatoshiIconTilted scale={0.7} />
          <Text>{`${commaFormatted(transactionInfo.amount)}`} </Text>
        </Box>
      </Box>

      <Stack marginTop="6px" width="100%" spacing={'6px'}>
        {/* Funding Comment */}

        {transactionInfo.comment ? (
          <Text>{transactionInfo.comment}</Text>
        ) : null}

        {/* Funding Media Attachment */}

        {transactionInfo.media ? (
          <Box
            h={'178px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <Image
              src={transactionInfo.media}
              alt="Contribution media attachment"
              objectFit={'cover'}
              width="full"
              height="full"
              borderRadius="4px"
            />
          </Box>
        ) : null}

        {/* Timestamp and Funded-Project Info */}

        <HStack color="brand.neutral700" spacing={2}>
          <Text fontSize={'xs'}>
            {timeAgo
              ? `${wasMadeOnChain ? '⛓' : '⚡️'} ${timeAgo} ago`
              : 'Some time ago'}
          </Text>

          {showsProjectLink ? (
            <>
              <Text>▶</Text>
              <ProjectAvatarLink project={project} />
            </>
          ) : null}
        </HStack>
      </Stack>
    </VStack>
  );
};
