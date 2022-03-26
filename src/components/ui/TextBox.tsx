import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
	inputElement: {
		borderWidth: '2px',
		'&:focus': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
	},
});

export const TextBox = ({children, ...rest}: InputProps) => {
	const classes = useStyles();
	return (
		<Input className={classes.inputElement} {...rest}>
			{children}
		</Input>
	);
};
