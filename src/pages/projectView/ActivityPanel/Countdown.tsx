import { Box, HStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { fonts } from '../../../styles';
import { getCountDown } from '../../../utils';

export const Countdown = ({ endDate }: { endDate: string }) => {
  const [countDown, setCountDown] = useState('');
  const handleCountDown = () => {
    const countDown = getCountDown(endDate);
    setCountDown(countDown);
  };

  useEffect(() => {
    const interval = setInterval(handleCountDown, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [endDate]);

  return (
    <HStack>
      {countDown && (
        <Box
          height="5px"
          width="5px"
          borderRadius="50%"
          backgroundColor="brand.primary"
        />
      )}
      <Text
        textAlign="center"
        fontSize="14px"
        fontFamily={fonts.mono}
        color="brand.neutral600"
      >{`${countDown}`}</Text>
    </HStack>
  );
};
