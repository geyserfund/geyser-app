import React from 'react';
import Brad from '../../../assets/brad.png';
import Zucco from '../../../assets/zucco.jpg';
import Lucas from '../../../assets/lucas.jpg';
import Conor from '../../../assets/conor.jpg';
import Des from '../../../assets/des.jpg';
import Prince from '../../../assets/prince.jpg';
import Crypto from '../../../assets/crypto.jpg';
import { Grid, GridItem, Box, Text, Avatar } from '@chakra-ui/react';

const members = [
  {
    name: 'Brad Mills',
    handle: 'bradmillscan',
    link: 'https://twitter.com/bradmillscan',
    image: Brad,
  },
  {
    name: 'Giacomo von Zucco',
    handle: 'giacomozucco',
    link: 'https://twitter.com/giacomozucco',
    image: Zucco,
  },
  {
    name: 'Lucas Ferreira',
    handle: 'lucasdcf',
    link: 'https://twitter.com/lucasdcf',
    image: Lucas,
  },
  {
    name: 'Conor Okus',
    handle: 'ConorOkus',
    link: 'https://twitter.com/ConorOkus',
    image: Conor,
  },
];

export const BoardMembers = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      gap={4}
      minWidth="100%"
    >
      {members.map((item) => (
        <GridItem w={'100%'} key={item.name}>
          <Box
            boxShadow={'md'}
            display="flex"
            p="2"
            width={'194px'}
            height={'152px'}
            alignItems={'center'}
            justifyContent="center"
            flexDirection="column"
          >
            <Box width={'80px'} height="80px" rounded={'full'}>
              <Avatar src={item.image} size="full" />
            </Box>
            <Text fontWeight={'500'} fontSize="16px" mt={2}>
              {item.name}
            </Text>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};
