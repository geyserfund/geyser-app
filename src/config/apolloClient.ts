
import { ApolloClient, createHttpLink, from, InMemoryCache, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { REACT_APP_GRAPHQL_ENDPOINT } from '../constants';
import { getNewTokens } from '../api';
import { onError } from '@apollo/client/link/error';

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

const errorLink = onError(({ graphQLErrors,
	operation,
	forward,
}) => {
	if (graphQLErrors) {
		console.log('Checking graphQL errors', graphQLErrors);
		for (const err of graphQLErrors) {
			if (err && err.extensions && err.extensions.code) {
				if (err.extensions.code === 'UNAUTHENTICATED') {
					return new Observable(observer => {
						getNewTokens().then(response => {
							Cookies.set('accessToken', response.accessToken);
							Cookies.set('refreshToken', response.refreshToken);
							const oldHeaders = operation.getContext().headers;
							operation.setContext({
								headers: {
									...oldHeaders,
									authorization: `Bearer ${response.accessToken}`,
								},
							});
							forward(operation);
						}).then(() => {
							const subscriber = {
								next: observer.next.bind(observer),
								error: observer.error.bind(observer),
								complete: observer.complete.bind(observer),
							};
							// Retry last failed request
							forward(operation).subscribe(subscriber);
						}).catch(error => {
							// No refresh or client token available, we force user to login
							observer.error(error);
						});
					});
				}
			}
		}
	}
});

export const client = new ApolloClient({
	link: from([errorLink, authLink.concat(httpLink)]),
	cache: new InMemoryCache(),
});

