import { Box, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';

import satsymbol from '../../../assets/satoshi.png';
import { fonts } from '../../../styles';
import { GrantTextType } from '../../../types/types';

export const ListText = ({ title, subtitle, isSatLogo }: GrantTextType) => {
  const theme = useTheme();

  return (
    <Box display={'flex'} alignItems="center" flexDirection={'column'}>
      <Box display={'flex'} alignItems="center">
        {isSatLogo ? (
          <Box mr={1}>
            <img src={satsymbol} width="8px" alt="satsymbol" />
          </Box>
        ) : null}
        <Text
          fontWeight={'800'}
          fontSize={'18px'}
          fontFamily={fonts.interBlack}
        >
          {title}
        </Text>
      </Box>
      <Text
        fontWeight={'700'}
        fontSize="9px"
        fontFamily={fonts.interBlack}
        color={theme.colors.brand.neutral600}
      >
        {subtitle}
      </Text>
    </Box>
  );
};
