import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/button';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { colors, styles } from '../../constants';

interface IButtonComponentP extends ButtonProps {
	className?: string;
	primary?: boolean;
	standard?: boolean;
	circular?: boolean;
	ref?: any
}

const useStyles = createUseStyles({
	container: {
		minHeight: '40px',
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

export const ButtonComponent = ({ ref, className, variant, primary, children, standard, circular, backgroundColor, _hover, ...rest }: IButtonComponentP) => {
	const classes = useStyles();
	const bgColor = useColorModeValue(colors.bgWhite, colors.bgDark);
	const textColor = useColorModeValue(colors.textBlack, colors.textWhite);
	return (
		<Button
			ref={ref}
			className={classNames(className, { [classes.container]: standard }, { primary })}
			variant={variant || 'solid'}
			minWidth={standard ? '200px' : ''}
			backgroundColor={backgroundColor ? backgroundColor : primary ? 'brand.primary' : bgColor}
			borderRadius={circular ? '50px' : standard ? '4px' : undefined}
			_hover={_hover ? _hover : primary ? { bg: 'brand.primaryTint' } : undefined}
			fontSize="12px"
			fontWeight="medium"
			{...rest}
			sx={styles.buttonCommon}
		>
			<Box as="span" className={classes.text} textColor={primary ? 'black' : textColor}>
				{children}
			</Box>
		</Button>
	);
};
