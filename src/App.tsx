import * as React from 'react';
import {
	ChakraProvider,
} from '@chakra-ui/react';
import { client, Router, theme } from './config';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context';
import { BtcProvider } from './context/btc';

export const App = () => (
	<ChakraProvider theme={theme}>
		<ApolloProvider client={client}>
			<AuthProvider>
				<BtcProvider>
					<Router />
				</BtcProvider>
			</AuthProvider>
		</ApolloProvider>
	</ChakraProvider>
);
