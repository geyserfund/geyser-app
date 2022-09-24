import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { colors } from '../../../constants';

export const LikeHeart = ({ count }: { count: number }) => (
  <HStack
    background="white"
    borderRadius="35px"
    padding="5px 10px"
    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
  >
    <Text color="brand.primary">{count || 0}</Text>
    <BsHeartFill color={colors.neutral500} />
  </HStack>
);
