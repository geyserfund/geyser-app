import React from 'react';

import { IconButton, IconButtonProps } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { colors } from '../constants';

interface IIconButtonComponentP extends IconButtonProps {
	primary?: boolean;
}

export const IconButtonComponent = ({ primary, ...rest }: IIconButtonComponentP) => {
	const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark);
	const textColor = useColorModeValue(colors.textBlack, colors.textWhite);

	return (
		<IconButton
			variant="solid"
			backgroundColor={primary ? 'brand.primary' : backgroundColor}
			borderRadius="50%"
			color={primary ? 'black' : textColor}
			_hover={primary ? {bg: 'brand.primaryTint'} : undefined}
			{...rest}
			sx={
				{
					'box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
					'-webkit-box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
					'-moz-box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
				}
			}
		/>
	);
};
