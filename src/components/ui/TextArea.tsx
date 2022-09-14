import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
	inputElement: {
		borderWidth: '2px',
		'&:focus': {
			borderColor: `${colors.normalLightGreen} !important`,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
		'&:hover': {
			borderColor: colors.gray300,
		},
	},
});

interface ITextBoxProps extends TextareaProps {
	error?: string
}

export const TextArea = ({children, error, ...rest}: ITextBoxProps) => {
	const classes = useStyles();

	return (
		<Box width="100%">
			<Textarea isInvalid={Boolean(error)} className={classes.inputElement} {...rest}>
				{children}
			</Textarea>
			{error && <Text color="brand.error" fontSize="12px">{error}</Text>}
		</Box>

	);
};
