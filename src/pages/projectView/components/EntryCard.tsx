import {
  Badge,
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { SatoshiIconTilted } from '../../../components/icons';
import { LikeHeart } from '../../../components/molecules';
import { SatoshiAmount } from '../../../components/ui';
import { GeyserSkeletonUrl } from '../../../constants';
import { fonts } from '../../../constants/fonts';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { AvatarElement } from './AvatarElement';
import entryPlaceholder from '../../../assets/images/entry-placeholder.png';

interface IEntryCard {
  entry: IProjectListEntryItem;
  onEdit?: () => void;
}

export const EntryCard = ({ entry, onEdit }: IEntryCard) => {
  const isMobile = isMobileMode();
  const history = useHistory();
  const handleClick = () => {
    history.push(`/entry/${entry.id}`);
  };

  const handleEdit = (event: any) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  console.log('checking entry', entry);
  return (
    <HStack
      flexDirection={isMobile ? 'column' : 'row'}
      spacing={isMobile ? '0px' : '20px'}
      width="100%"
      alignItems="flex-start"
      borderRadius="4px"
      _hover={{
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Box
        maxHeight="150px"
        maxWidth={isMobile ? '100%' : '200px'}
        overflow="hidden"
      >
        <Image
          borderRadius="4px"
          height="100%"
          width="100%"
          src={entry.image ? entry.image : entryPlaceholder}
          fallbackSrc={GeyserSkeletonUrl}
        />
      </Box>
      <VStack alignItems="flex-start" flex="1">
        <Text fontSize="30px" fontWeight={700} color="brand.neutral900">
          {entry.title}
        </Text>
        <Text color="brand.neutral600">{entry.description}</Text>
        <HStack>
          {entry.creator && <AvatarElement user={entry.creator} />}

          <HStack alignItems="center">
            <Box
              backgroundColor="brand.primary"
              borderRadius="50%"
              h="20px"
              w="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <SatoshiIconTilted scale="0.7" isDark />
            </Box>
            <Text
              color="brand.primary"
              fontFamily={fonts.mono}
              fontWeight={600}
              fontSize="16px"
            >
              {entry.amountFunded}
            </Text>
          </HStack>
          <Badge>ARTICLE</Badge>
        </HStack>
      </VStack>
      <VStack justifyContent="center" height="100%" paddingRight="10px">
        {onEdit ? (
          <Box
            _hover={{ cursor: 'pointer', backgroundColor: 'brand.neutral200' }}
            as="span"
            borderRadius="50%"
            padding="8px"
            onClick={handleEdit}
          >
            <BsPencil />
          </Box>
        ) : (
          <LikeHeart count={entry.fundersCount} />
        )}
      </VStack>
    </HStack>
  );
};
