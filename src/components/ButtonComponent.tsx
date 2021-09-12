import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/button';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { colors } from '../constants';

interface IButtonComponentP extends ButtonProps {
	className?: string;
	primary?: boolean;
	standard?: boolean;
}

const useStyles = createUseStyles({
	container: {
		position: 'relative',
		'& .chakra-button__icon': {
			position: 'absolute',
			left: 30,
		},
		'&.primary': {
			'& .chakra-button__icon': {
				color: 'black',
			},
		},
	},
	text: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
	},
});

export const ButtonComponent = ({className, primary, children, standard, ...rest }: IButtonComponentP) => {
	const classes = useStyles();
	const backgroundColor = useColorModeValue(colors.bgWhite, colors.bgDark);
	const textColor = useColorModeValue(colors.textBlack, colors.textWhite);
	return (
		<Button
			className={classNames(className, { [classes.container]: standard}, {primary})}
			variant="solid"
			minWidth={standard ? '200px' : ''}
			backgroundColor={primary ? 'brand.primary' : backgroundColor}
			borderRadius={standard ? '50px' : undefined}
			_hover={primary ? {bg: 'brand.primaryTint'} : undefined}
			{...rest}
			sx={
				{
					'box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
					'-webkit-box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
					'-moz-box-shadow': ' 0px 5px 7px 3px rgba(0,0,0,0.32)',
				}
			}
		>
			<Box as="span" className={classes.text} textColor={ primary ? 'black' : textColor}>
				{children}
			</Box>
		</Button>
	);
};
