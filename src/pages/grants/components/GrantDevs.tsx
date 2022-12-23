import React from 'react';
import { isMobileMode } from '../../../utils';

import { Box, Wrap } from '@chakra-ui/react';
import { BitcoinerCard } from './BitcoinerCard';
import { conorUrl, tachiraUrl, umarUrl } from '../../../constants';

const members = [
  {
    name: 'Tachira Homestead',
    role: 'Artist',
    link: 'https://twitter.com/tachirahomestd',
    image: tachiraUrl,
  },

  {
    name: 'Umar Abubakar',
    role: 'Developer',

    link: 'https://twitter.com/umarabox',
    image: umarUrl,
  },
  {
    name: 'Vinayak',
    role: 'Developer',

    link: 'https://twitter.com/ConorOkus',
    image: conorUrl,
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
