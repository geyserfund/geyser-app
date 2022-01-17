import { ApolloError, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useEffect } from 'react';
import { QUERY_GET_USER } from '../graphql';
import { IuserProfile } from '../interfaces';

const defaultAuthUser = {
	id: 0,
	username: '',
	imageUrl: '',
	twitterHandle: '',
};

const defaultContext = {
	isLoggedIn: false,
	user: defaultAuthUser,
	loading: false,
	error: undefined,
};

interface IAuthContext {
  isLoggedIn: boolean,
	user: IuserProfile,
	loading: boolean,
	error?: ApolloError,
}

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [getUser, { loading, error, data }] = useLazyQuery(QUERY_GET_USER);

	useEffect(() => {
		try {
			getUser();
		} catch (_) {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<AuthContext.Provider value={{user: data && data.getUser, loading, error, isLoggedIn}}>
			{children}
		</AuthContext.Provider>
	);
};
