import React from 'react';
import Brad from '../../../assets/brad.png';
import Zucco from '../../../assets/zucco.jpg';
import Lucas from '../../../assets/lucas.jpg';
import { isMobileMode } from '../../../utils';
import Conor from '../../../assets/conor.jpg';
import Des from '../../../assets/des.svg';
import abubakar from '../../../assets/abubakar.svg';
import danial from '../../../assets/danial.svg';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Avatar,
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react';
import { GrantCard } from './GrantCard';
import { BitcoinerCard } from './BitcoinerCard';
import { isTemplateMiddle } from 'typescript';

const members = [
  {
    name: 'Brad Mills',
    handle: 'bradmillscan',
    link: 'https://twitter.com/bradmillscan',
    image: Brad,
  },

  {
    name: 'Lucas Ferreira',
    handle: 'lucasdcf',
    link: 'https://twitter.com/lucasdcf',
    image: Lucas,
  },
  {
    name: 'Daniel Prince',

    link: 'https://twitter.com/PrinceySOV',
    image: danial,
  },
  {
    name: 'Abubakar',

    link: 'https://twitter.com/ihate1999',
    image: abubakar,
  },
  {
    name: 'Des',

    link: '',
    image: Des,
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
                link={isTemplateMiddle.link}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};
