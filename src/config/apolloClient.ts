import { ApolloClient, InMemoryCache } from '@apollo/client';
import { REACT_APP_GRAPHQL_ENDPOINT } from '../constants';

export const client = new ApolloClient({
	uri: REACT_APP_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache(),
});
