import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ListText } from './ListText';
import { GrantTextType } from '../../../types/types';
import { isMobileMode } from '../../../utils';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

interface GrantProps {
  title: string;
  date: string;
  status: boolean;
  to: string;
  showBanner: boolean;
  applicants?: string;
  grant?: string;
  banner?: string;
  grantees?: string;
  distributed?: string;
  sponsors?: Array<string>;
}
export const CustomGrantCard = ({
  title,
  date,
  showBanner,
  status,
  sponsors,
  to,
  applicants,
  grant,
  grantees,
  banner,
  distributed,
}: GrantProps) => {
  const isMobile = isMobileMode();
  const history = useHistory();

  return (
    <Link to={to}>
      <Box
        minWidth={'100%'}
        cursor="pointer"
        border={'2px solid #E9ECEF'}
        borderRadius="12px"
      >
        {showBanner ? (
          <Box borderRadius="12px">
            <img src={banner} width="100%" style={{ borderRadius: '11px' }} />
          </Box>
        ) : null}
        <Box display="flex" flexDirection={'column'} p="4">
          <Box
            display="flex"
            justifyContent={'space-between'}
            alignItems={isMobile ? 'center' : 'center'}
            flexDirection={isMobile ? 'column' : 'row'}
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
            {showBanner ? (
              <Box display="flex" alignItems={'center'}>
                <Box mr={4}>
                  <ListText
                    title={applicants}
                    subtitle="APPLICANTS"
                    isSatLogo={false}
                  />
                </Box>
                <ListText title={grant} subtitle="GRANT" isSatLogo={true} />
              </Box>
            ) : (
              <Box display="flex" alignItems={'center'}>
                <Box mr={4}>
                  <ListText
                    title={grantees}
                    subtitle="APPLICANTS"
                    isSatLogo={false}
                  />
                </Box>
                <ListText
                  title={distributed}
                  subtitle="GRANT"
                  isSatLogo={true}
                />
              </Box>
            )}
          </Box>
          {isMobile !== true && (
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
          )}
        </Box>
      </Box>
    </Link>
  );
};
