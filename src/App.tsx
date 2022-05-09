import * as React from 'react';
import {
	ChakraProvider,
} from '@chakra-ui/react';
import { client, customHistory, Router, theme } from './config';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context';
import { BtcProvider } from './context/btc';
import { Router as BrowserRouter } from 'react-router-dom';

export const App = () => (
	<ChakraProvider theme={theme}>
		<BrowserRouter history={customHistory}>
			<ApolloProvider client={client}>
				<AuthProvider>
					<BtcProvider>
						<Router />
					</BtcProvider>
				</AuthProvider>
			</ApolloProvider>
		</BrowserRouter>

	</ChakraProvider>
);
