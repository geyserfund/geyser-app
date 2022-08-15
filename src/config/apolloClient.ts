
import { ApolloClient, createHttpLink, from, InMemoryCache, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { cookieOptions, API_SERVICE_ENDPOINT, AUTH_SERVICE_ENDPOINT } from '../constants';
import { onError } from '@apollo/client/link/error';
import { customHistory } from '.';
import { useNotification } from '../utils';

const httpLink = createHttpLink({
	uri: `${API_SERVICE_ENDPOINT}/graphql`,
	credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
	// Get the authentication token from local storage if it exists
	const token = Cookies.get('accessToken');
	// Return the headers to the context so httpLink can read them
	Cookies.set('authorization', token ? `Bearer ${token}` : '');
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

let onProcess = false;

const errorLink = onError(({ graphQLErrors,
	operation,
	forward,
}) => {
	if (graphQLErrors) {
		for (const err of graphQLErrors) {
			if (err && err.extensions && err.extensions.code) {
				// if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
				// 	forward(operation);
				// }

				const refreshToken = Cookies.get('refreshToken');
				if (err.extensions.code === 'UNAUTHENTICATED' && refreshToken && !onProcess) {
					return new Observable(observer => {
						onProcess = true;
						fetch(`${AUTH_SERVICE_ENDPOINT}/refresh-token`, {
							method: 'get',
							headers: { Authorization: `Bearer ${refreshToken}` },
						}).then(response => {
							onProcess = true;
							if (response.status === 401) {
								customHistory.push(customHistory.location.pathname, { loggedOut: true });

								throw new Error('refreshTokenexpired');
							}

							return response.json();
						}).then(response => {
							if (response && response.accessToken && response.refreshToken) {
								Cookies.set('accessToken', response.accessToken, cookieOptions);
								Cookies.set('refreshToken', response.refreshToken, cookieOptions);
								customHistory.replace(customHistory.location.pathname, {refresh: true});
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
	// Link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	// Headers: {'access-token': token ? `Bearer ${token}` : ''},
});

