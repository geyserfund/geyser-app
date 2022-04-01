import { HStack, Text, TextProps } from '@chakra-ui/react';
import React from 'react';
import { SatoshiIcon } from '../icons';

interface ISatoshiAmountProps extends TextProps {
	label?: string;
	extra?: string;
}

export const SatoshiAmount = ({label, extra, fontSize, children, ...rest}: ISatoshiAmountProps) => {
	const getScale = () => {
		if (fontSize) {
			let size = 0;

			if (typeof fontSize === 'string') {
				size = parseInt(fontSize.split('px')[0], 10);
			}

			return (size / 14) * 0.8;
		}

		return 0.8;
	};

	return (
		<HStack alignItems="center">
			{label && <Text fontSize={fontSize} {...rest}>{`${label} = `}</Text>}
			<SatoshiIcon color={rest.color} scale={getScale() } />
			<Text fontSize={fontSize} {...rest}>{`${children} ${extra ? '( ' + extra + ' )' : ''}`}</Text>
		</HStack>
	);
};
