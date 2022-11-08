import {
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  Text,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import satlogo from '../../../assets/satgrey.svg';
import { styles } from '../../../constants';
import { fonts } from '../../../constants/fonts';
import satlg from '../../../assets/satoshi.png';

const currencies = [
  {
    name: 'SATs 🟠',
    symbol: satlg,
    sImg: true,
  },
  {
    name: 'BTC 🟠',
    symbol: '',
    sImg: true,
  },
  {
    name: 'USD 🇺🇸',
    symbol: '$',
  },

  {
    name: 'EUR 🇪🇺',
    symbol: '£',
  },
  {
    name: 'NGA 🇳🇬',
    symbol: '₦',
  },
];

export const SelectCurrencyMenu = () => {
  return (
    <Menu>
      <MenuButton>
        {' '}
        <Box
          rounded={'md'}
          _focus={{ boxShadow: 'outline' }}
          border={'1px'}
          borderColor="brand.bgGrey3"
          px={2.5}
          py={2.5}
          maxHeight="40px"
        >
          <Box display="flex" justifyContent={'center'} alignContent="center">
            <img src={satlogo} alt="sat logo" width={'18px'} />
          </Box>
        </Box>
      </MenuButton>

      <MenuList p={0} minW="0" w={'163px'}>
        <MenuGroup title="Local currency" fontSize={'17px'} ml={3}>
          {currencies.map((item) => (
            <MenuItem
              key={item.name}
              fontSize={'16px'}
              fontWeight={500}
              fontFamily={fonts.inter}
            >
              <Box display={'flex'} alignContent="center" gap={4}>
                {item.sImg ? (
                  <Box>
                    {item.name === 'BTC 🟠' ? (
                      <Box ml={-1}>
                        <BsCurrencyBitcoin />
                      </Box>
                    ) : (
                      <img src={item.symbol} width="10px" />
                    )}
                  </Box>
                ) : (
                  <Text>{item.symbol}</Text>
                )}{' '}
                <Text> {item.name}</Text>
              </Box>
            </MenuItem>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
