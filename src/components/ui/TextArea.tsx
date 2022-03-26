import { Textarea, TextareaProps } from '@chakra-ui/react';
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

export const TextArea = ({children, ...rest}: TextareaProps) => {
	const classes = useStyles();

	return (
		<Textarea className={classes.inputElement} {...rest}>
			{children}
		</Textarea>
	);
};
