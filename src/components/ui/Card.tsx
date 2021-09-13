import { Box } from '@chakra-ui/layout';
import { HTMLChakraProps } from '@chakra-ui/system';
import React from 'react';

interface ICard extends HTMLChakraProps<'div'> {
    children: React.ReactNode
}

export const Card = ({children, ...rest}: ICard) => (
	<Box
		{...rest}
		sx={{
			borderRadius: '22px',
			boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
		}}
	>
		{children}
	</Box>
);

