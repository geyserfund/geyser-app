import { HStack, Text } from '@chakra-ui/react';
import { BsHeartFill } from 'react-icons/bs';

import { colors } from '../../../styles';

type Props = {
  count: number;
};

export const ProjectFundersCountIndicator = ({ count }: Props) => (
  <HStack
    background="white"
    borderRadius="35px"
    padding="5px 10px"
    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
  >
    <Text color="brand.primary" fontWeight={'bold'}>
      {count || 0}
    </Text>
    <BsHeartFill color={colors.neutral500} />
  </HStack>
);
