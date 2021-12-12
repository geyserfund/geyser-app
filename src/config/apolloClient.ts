
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { REACT_APP_GRAPHQL_ENDPOINT } from '../constants';

const httpLink = createHttpLink({
	uri: REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token = Cookies.get('accessToken');
	// Return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		for (let err of graphQLErrors) {
			switch (err.extensions.code) {
				// Apollo Server sets code to UNAUTHENTICATED
				// when an AuthenticationError is thrown in a resolver
				case 'UNAUTHENTICATED':

					// Modify the operation context with a new token
					const oldHeaders = operation.getContext().headers;
					operation.setContext({
						headers: {
							...oldHeaders,
							authorization: getNewToken(),
						},
					});
					// Retry the request, returning the new observable
					return forward(operation);
			}
		}
	}

	export const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
