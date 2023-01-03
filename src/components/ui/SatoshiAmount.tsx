import { HStack, Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import { useBTCConverter } from '../../helpers';
import { numberWithCommas } from '../../utils';
import { SatoshiIconTilted } from '../icons';

type Props = TextProps & {
  label?: string;
  extra?: string;
  isLoading?: boolean;
  shouldShowDollarConversion?: boolean;
  wrapperClassName?: string;
  scale?: number;
};

export const SatoshiAmount = ({
  label,
  extra,
  fontSize,
  isLoading = false,
  shouldShowDollarConversion,
  wrapperClassName,
  children,
  scale,
  ...rest
}: Props) => {
  const btcConverter = useBTCConverter();

  const getScale = () => {
    if (fontSize) {
      let size = 0;

      if (typeof fontSize === 'string') {
        size = parseInt(fontSize.split('px')[0], 10);
      }

      return (size / 14) * (scale || 0.4);
    }

    return 0.8;
  };

  return (
    <HStack alignItems="center" className={wrapperClassName}>
      {label ? (
        <Text fontSize={fontSize} {...rest}>
          {`${label}: `}
        </Text>
      ) : null}

      {isLoading === false ? (
        <SatoshiIconTilted color={rest.color} scale={getScale()} />
      ) : null}

      <Text fontSize={fontSize} {...rest}>
        {`${numberWithCommas(`${children}`)} ${
          extra ? '( ' + extra + ' )' : ''
        }`}
      </Text>

      {shouldShowDollarConversion ? (
        <Text
          marginLeft={4}
          marginInlineStart={4}
          fontSize={fontSize}
          {...rest}
        >
          (${btcConverter.getUSDAmount(Number(children)).toFixed(2)})
        </Text>
      ) : null}
    </HStack>
  );
};
