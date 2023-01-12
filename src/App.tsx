import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { client, customHistory, theme } from './config';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context';
import { BtcProvider } from './context/btc';
import { Head } from './utils/Head';
import { Router as BrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter history={customHistory}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <BtcProvider>
            <Head />
            <AppLayout />
          </BtcProvider>
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </ChakraProvider>
);
