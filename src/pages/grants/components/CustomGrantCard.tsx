import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ListText } from './ListText';
import { GrantTextType } from '../../../types/types';

interface GrantProps {
  title: string;
  date: string;
  status: boolean;
  to: string;
  showBanner: boolean;

  sponsors: Array<string>;
}
export const CustomGrantCard = ({
  title,
  date,
  showBanner,
  status,
  sponsors,
  to,
}: GrantProps) => {
  return (
    <Box
      minWidth={'100%'}
      cursor="pointer"
      border={'2px solid #E9ECEF'}
      borderRadius="12px"
    >
      {showBanner ? (
        <Box bg="brand.primary50" height={'200px'} borderRadius="12px"></Box>
      ) : null}
      <Box display="flex" flexDirection={'column'} p="4">
        <Box
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Box>
            <Box display="flex" alignItems="start">
              <Text mr={4} fontWeight="bold" fontSize={'16px'}>
                {title}
              </Text>

              {status ? (
                <Text
                  bg="brand.primary100"
                  fontSize={'10px'}
                  px="14px"
                  py={'5px'}
                  fontWeight="500"
                >
                  ACTIVE
                </Text>
              ) : null}
            </Box>
            <Text color={'brand.neutral600'}>{date}</Text>
          </Box>
          <Box display="flex" alignItems={'center'}>
            <Box mr={4}>
              <ListText title="-" subtitle="APPLICANTS" isSatLogo={false} />
            </Box>
            <ListText title="100 M" subtitle="GRANT" isSatLogo={true} />
          </Box>
        </Box>
        <Box display={'flex'} alignItems="center" mt={6}>
          <Text
            color={'brand.neutral600'}
            fontSize="11px"
            mr={2}
            fontWeight="700"
          >
            SPONSORS
          </Text>
          {sponsors.map((item, idx) => (
            <Box key={idx * 2} mr={3}>
              <img src={item} alt="logo" />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
