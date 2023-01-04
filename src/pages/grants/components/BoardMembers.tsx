import React from 'react';
import { isMobileMode } from '../../../utils';
import { Box, Wrap, WrapItem } from '@chakra-ui/react';
import { BitcoinerCard } from './BitcoinerCard';
import {
  abubakarUrl,
  bradUrl,
  danialUrl,
  desUrl,
  lucasUrl,
  pacoUrl,
} from '../../../constants';

const members = [
  {
    name: 'Brad Mills',
    handle: 'bradmillscan',
    link: 'https://twitter.com/bradmillscan',
    image: bradUrl,
  },

  {
    name: 'Lucas Ferreira',
    handle: 'lucasdcf',
    link: 'https://twitter.com/lucasdcf',
    image: lucasUrl,
  },
  {
    name: 'Daniel Prince',
    link: 'https://twitter.com/PrinceySOV',
    image: danialUrl,
  },
  {
    name: 'Abubakar',
    link: 'https://twitter.com/ihate1999',
    image: abubakarUrl,
  },
  {
    name: 'Des',
    link: 'https://twitter.com/dickerson_des',
    image: desUrl,
  },
  {
    name: 'Paco de la India',
    image: pacoUrl,
    link: 'https://twitter.com/RunwithBitcoin',
  },
];

export const BoardMembers = () => {
  const isMobile = isMobileMode();

  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={isMobile ? '100%' : '600px'} md="">
        <Wrap spacing="20px" justify="center">
          {members.map((item, idx) => (
            <WrapItem key={idx}>
              <BitcoinerCard
                name={item.name}
                image={item.image}
                link={item.link}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};
