import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { ApplyGrantModal } from './ApplyGrantModal';

interface GrantsProp {
  applicant: number;
  title: string;
  subtitle: string;
  about: string;
  image: string;
}
export const ApplyGrantCard = ({
  title,
  subtitle,
  about,
  applicant,
  image,
}: GrantsProp) => {
  return (
    <Box rounded="md" borderWidth="1px" minWidth={'100%'}>
      <Box width={'100%'}>
        <img src={image} width={'100%'} />
      </Box>
      <Box px={4} py={2}>
        <Text fontWeight={'600'} fontSize="14px">
          {title}
        </Text>
        <Text fontWeight={'300'} fontSize="13px">
          {subtitle}
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

          <ApplyGrantModal
            title={title}
            subtitle={subtitle}
            about={about}
            applicant={applicant}
            image={image}
          />
        </Box>
      </Box>
    </Box>
  );
};
