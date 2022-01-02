
import { ApolloClient, createHttpLink, from, InMemoryCache, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { REACT_APP_GRAPHQL_ENDPOINT } from '../constants';
import { onError } from '@apollo/client/link/error';
import { customHistory } from '.';

const httpLink = createHttpLink({
	uri: REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token = Cookies.get('accessToken');
	// Return the headers to the context so httpLink can read them
	if (token) {
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	}

	return {
		headers,
	};
});

const errorLink = onError(({ graphQLErrors,
	operation,
	forward,
}) => {
	if (graphQLErrors) {
		for (const err of graphQLErrors) {
			if (err && err.extensions && err.extensions.code) {
				if (err.extensions.code === 'UNAUTHENTICATED') {
					return new Observable(observer => {
						const refreshToken = Cookies.get('refreshToken');
						fetch('http://localhost:4000/auth/refresh-token', {
							method: 'get',
							headers: { Authorization: `Bearer ${refreshToken}` },
						}).then(response => {
							console.log('cbecking response', response);
							if (response.status === 401) {
								if (!err.path?.includes('getUser')) {
									customHistory.push(customHistory.location.pathname, { loggedOut: true });
								}

								throw new Error('refreshTokenexpired');
							}

							return response.json();
						}).then(response => {
							console.log('checking response', response);
							if (response && response.accessToken && response.refreshToken) {
								Cookies.set('accessToken', response.accessToken);
								Cookies.set('refreshToken', response.refreshToken);
								const oldHeaders = operation.getContext().headers;
								operation.setContext({
									headers: {
										...oldHeaders,
										authorization: `Bearer ${response.accessToken}`,
									},
								});
								const subscriber = {
									next: observer.next.bind(observer),
									error: observer.error.bind(observer),
									complete: observer.complete.bind(observer),
								};
								// Retry last failed request
								forward(operation).subscribe(subscriber);
							}
						}).catch(error => {
							// No refresh or client token available, we force user to login
							console.log('did it get here ?', error);
							// CustomHistory.push('/unauthorized');
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

