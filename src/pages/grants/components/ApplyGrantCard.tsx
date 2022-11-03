import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { ApplyGrantModal } from './ApplyGrantModal';

interface GrantsProp {
  name: string;
  applicant: number;
}
export const ApplyGrantCard = ({ name, applicant }: GrantsProp) => {
  return (
    <Box rounded="md" borderWidth="1px" minWidth={'100%'}>
      <Box bg="brand.primary50" height={'273px'}></Box>
      <Box px={4} py={2}>
        <Text fontWeight={'600'} fontSize="14px">
          {name}
        </Text>
        <Text fontWeight={'500'} fontSize="13px">
          ROUND 2: DECEMBER
        </Text>
        <Box
          display="flex"
          mt={3}
          justifyContent={'center'}
          flexDirection="column"
          alignItems="center"
        >
          <Text fontWeight={'400'} fontSize="9px" color={'brand.gray500'}>
            {applicant}
          </Text>
          <Text
            fontWeight={'400'}
            fontSize="11px"
            color={'brand.gray500'}
            mt={1}
          >
            APPLICANTS
          </Text>

          <ApplyGrantModal />
        </Box>
      </Box>
    </Box>
  );
};
