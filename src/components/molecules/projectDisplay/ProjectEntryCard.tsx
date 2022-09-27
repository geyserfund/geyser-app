import {
  Badge,
  Box,
  Heading,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router';
import { LikeHeart } from '..';
import { ICard, SatoshiAmount } from '../../ui';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { AvatarElement } from '../../../pages/projectView/components/AvatarElement';

type Props = ICard & {
  entry: IProjectListEntryItem;
  onClick?: () => void;
};

export const ProjectEntryCard = ({ entry, onClick }: Props) => {
  const isMobile = isMobileMode();
  const history = useHistory();

  const handleClick =
    onClick ||
    (() => {
      history.push(`/entry/${entry.id}`);
    });

  return (
    <Stack
      height={'166px'}
      direction={isMobile ? 'column' : 'row'}
      spacing={isMobile ? '0px' : '20px'}
      align="center"
      justify="start"
      maxWidth={'100%'}
      p={2}
      onClick={handleClick}
    >
      <Box flexShrink={0}>
        <Image
          height="142px"
          width="196px"
          src={entry.image}
          fit="cover"
          alt={entry.title}
          borderRadius="0.25rem"
        />
      </Box>

      <Box
        flex={1}
        alignItems="flex-start"
        flexDirection={'column'}
        justifyContent="space-between"
        height={'full'}
        overflow="hidden"
      >
        <VStack justify={'space-between'} align="start">
          <Heading
            as={'h2'}
            isTruncated={isMobile === false}
            noOfLines={[0, 1]}
          >
            {entry.title}
          </Heading>

          <Text color="brand.neutral600" as={'p'} noOfLines={[0, 2]}>
            {entry.description}
          </Text>

          <Spacer />

          <HStack>
            {entry.creator && <AvatarElement user={entry.creator} />}

            <SatoshiAmount color="brand.primary" fontWeight="bold">
              {entry.amountFunded}
            </SatoshiAmount>

            <Badge textTransform="uppercase" padding={1} borderRadius={0.5}>
              {entry.type}
            </Badge>
          </HStack>
        </VStack>
      </Box>

      <Box flexShrink={0}>
        <LikeHeart count={entry.fundersCount} />
      </Box>
    </Stack>
  );
};
