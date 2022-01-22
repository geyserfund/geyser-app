import Cookies from 'js-cookie';
import { ApolloError, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useEffect } from 'react';
import { QUERY_GET_USER } from '../graphql';
import { IuserProfile } from '../interfaces';
import { cookieOptions } from '../constants';

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
	logout: () => { },
};

interface IAuthContext {
	isLoggedIn: boolean,
	user: IuserProfile,
	loading: boolean,
	error?: ApolloError,
	logout: any
}

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const logout = () => {
		setUser(defaultAuthUser);
		setIsLoggedIn(false);
		Cookies.remove('accessToken', cookieOptions);
		Cookies.remove('refreshToken', cookieOptions);
		Object.keys(Cookies.get()).forEach(cookieName => {
			Cookies.remove(cookieName);
		});
		fetch('auth/logout');
	};

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [user, setUser] = useState<IuserProfile>(defaultAuthUser);
	const [getUser, { loading, error, data }] = useLazyQuery(QUERY_GET_USER);

	useEffect(() => {
		try {
			getUser();
		} catch (_) {
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		if (data && data.getUser) {
			setUser(data.getUser);
		}
	}, [data]);

	return (
		<AuthContext.Provider value={{ user, loading, error, isLoggedIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
