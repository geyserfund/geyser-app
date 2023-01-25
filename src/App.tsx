import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { client, theme } from './config';
import { Head } from './config/Head';
import { AuthProvider } from './context';
import { BtcProvider } from './context/btc';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
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
