import { Box, Input, InputProps, Text } from '@chakra-ui/react';
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

interface ITextBoxProps extends InputProps {
	error?: string
}

export const TextBox = ({children, error, ...rest}: ITextBoxProps) => {
	const classes = useStyles();
	return (
		<Box width="100%">
			<Input isInvalid={Boolean(error)} className={classes.inputElement} {...rest}>
				{children}
			</Input>
			{error && <Text color="brand.error" fontSize="12px">{error}</Text>}
		</Box>

	);
};
