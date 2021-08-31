import * as React from 'react';
import {
	ChakraProvider,
} from '@chakra-ui/react';
import {Router, theme} from './config';

export const App = () => (
	<ChakraProvider theme={theme}>
		<Router />
	</ChakraProvider>
);
