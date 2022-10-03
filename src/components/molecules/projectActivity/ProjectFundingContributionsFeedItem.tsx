import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';
import {
  Center,
  Image,
  Stack,
  Box,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { LinkableAvatar, AnonymousAvatar, ProjectAvatarLink } from '../../ui';
import { IFundingTx, IProject } from '../../../interfaces';
import { SatoshiIconTilted } from '../../icons';
import { getDaysAgo } from '../../../utils';
import { commaFormatted } from '../../../utils/helperFunctions';
import { getAvatarMetadata } from '../../../helpers';

type Props = HTMLChakraProps<'div'> & {
  fundingTx: IFundingTx;
  project: IProject;
};

export const ProjectFundingContributionsFeedItem = ({
  fundingTx,
  project,
  ...rest
}: Props) => {
  const { funder, onChain, paidAt, source } = fundingTx;

  const isFunderAnonymous = !funder.user;
  const timeAgo = getDaysAgo(paidAt) || '';
  const avatarMetadata = getAvatarMetadata({ funder, source });

  return (
    <Center flexDirection={'column'} {...rest}>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        {/* Funding Stats Header */}

        <Box display="flex" justifyContent="space-between">
          {isFunderAnonymous ? (
            <HStack spacing={2}>
              <AnonymousAvatar
                seed={fundingTx.funder.id}
                image={avatarMetadata.image}
                imageSize={'20px'}
              />
              <Text>Anonymous Funder</Text>
            </HStack>
          ) : (
            <LinkableAvatar
              avatarMetadata={avatarMetadata}
              fontSize={'14px'}
              imageSize={'20px'}
            />
          )}

          <Box display="flex" alignItems="center">
            <SatoshiIconTilted scale={0.7} />
            <Text>{`${commaFormatted(fundingTx.amount)}`} </Text>
          </Box>
        </Box>

        <Stack marginTop="6px" width="100%" spacing={'6px'}>
          {/* Funding Comment */}

          {fundingTx.comment && <Text>{fundingTx.comment}</Text>}

          {/* Funding Media Attachment */}

          {fundingTx.media && (
            <Box
              h={'178px'}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
            >
              <Image
                src={fundingTx.media}
                alt="Contribution media attachment"
                objectFit={'contain'}
                width="full"
                height="full"
                borderRadius="4px"
              />
            </Box>
          )}

          {/* Timestamp and Funded-Project Info */}

          <HStack color="brand.neutral700" spacing={2}>
            <Text fontSize={'xs'}>
              {timeAgo
                ? `${onChain ? '⛓' : '⚡️'} ${timeAgo} ago`
                : 'Some time ago'}
            </Text>

            <Text>▶</Text>

            <ProjectAvatarLink project={project} />
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
};
