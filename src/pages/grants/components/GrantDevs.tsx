import React from 'react';
import { isMobileMode } from '../../../utils';
import umar from '../../../assets/umar.svg';
import tachira from '../../../assets/tachira.svg';

import {
  Grid,
  GridItem,
  Box,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Center,
  Link,
} from '@chakra-ui/react';
import { BitcoinerCard } from './BitcoinerCard';

const members = [
  {
    name: 'Tachira Homestead',
    role: 'Artist',
    link: 'https://twitter.com/tachirahomestd',
    image: tachira,
  },

  {
    name: 'Umar Abubakar',
    role: 'Developer',

    link: 'https://twitter.com/umarabox',
    image: umar,
  },
  {
    name: 'Vinayak',
    role: 'Developer',

    link: 'https://twitter.com/ConorOkus',
    image: umar,
  },
];

export const GrantDevelopers = () => {
  const isMobile = isMobileMode();
  return (
    <Box display={'flex'} justifyContent="center">
      <Box width={isMobile ? '100%' : '600px'} md="">
        <Wrap spacing="20px" align="center" justify={'center'}>
          {members.map((item, idx) => (
            <BitcoinerCard
              key={idx}
              name={item.name}
              role={item.role}
              link={item.link}
              image={item.image}
            />
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};
