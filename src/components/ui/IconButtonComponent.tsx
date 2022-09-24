import React from 'react';

import { IconButton, IconButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { colors, styles } from '../../constants';

interface IIconButtonComponentP extends IconButtonProps {
  primary?: boolean;
}

export const IconButtonComponent = ({
  primary,
  ...rest
}: IIconButtonComponentP) => {
  const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark);
  const textColor = useColorModeValue(colors.textBlack, colors.textWhite);

  return (
    <IconButton
      variant="solid"
      backgroundColor={primary ? 'brand.primary' : backgroundColor}
      borderRadius="50%"
      color={primary ? 'black' : textColor}
      _hover={primary ? { bg: 'brand.primaryTint' } : undefined}
      {...rest}
      sx={styles.buttonCommon}
    />
  );
};
