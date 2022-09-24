import { InfoIcon } from '../icons';
import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface IInfoTooltip {
  title: string;
  description: string;
  options: React.CSSProperties;
  width: string;
}

export const InfoTooltip = ({
  title,
  description,
  options,
  width,
}: IInfoTooltip) => {
  const [hover, setHover] = useState(false);
  const { top, left } = options;

  return (
    <Box position="relative">
      {hover && (
        <>
          <Box
            width={width}
            position="absolute"
            p={2}
            zIndex={2}
            bg="#5B5B5B"
            rounded="lg"
            top={top}
            left={left}
          >
            <Text fontWeight="bold" color="white" fontSize="10px">
              {title}
            </Text>
            <Text color="white" fontSize="9px" fontWeight="medium" mt={1}>
              {description}
            </Text>
          </Box>
          <Box
            position="absolute"
            top="-17px"
            left="-14px"
            zIndex={1}
            borderLeft="20px solid transparent"
            borderRight="20px solid transparent"
            borderTop="20px solid #5B5B5B"
          />
        </>
      )}
      <InfoIcon
        backgroundColor="#E9E9E9"
        rounded="full"
        p="2px"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
      />
    </Box>
  );
};
