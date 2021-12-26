import { Box, Text } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { IdComponent } from '.';
import { IIdComponent } from './IdComponent';

interface IIdBar extends IIdComponent, HTMLChakraProps<'div'> {
	amount: number;
}

export const IdBar = ({ URL, username, fullName, twitter, badge, amount, ...rest }: IIdBar) => {
	const { colorMode } = useColorMode();
	const dark = colorMode === 'dark';
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			padding="10px 25px"
			backgroundColor={dark ? 'brand.bgGreenDark' : 'brand.bgGreen'}
			width="100%"
			borderRadius="12px"
			{...rest}
		>
			<IdComponent {...{ URL, username, fullName, twitter, badge }} />
			<Text>{`${amount} 丰`}</Text>
		</Box>
	);
};
