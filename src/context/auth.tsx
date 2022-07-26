import Cookies from 'js-cookie';
import { ApolloError, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ME } from '../graphql';
import { IUser } from '../interfaces';
import { cookieOptions } from '../constants';
import { useDisclosure } from '@chakra-ui/react';

const defaultAuthUser = {
	id: 0,
	username: '',
	imageUrl: '',
	externalAccounts: [],
};

const defaultContext = {
	isLoggedIn: false,
	user: defaultAuthUser,
	loading: false,
	error: undefined,
	logout: () => { },
	loginIsOpen: false,
	loginOnOpen: () => { },
	loginOnClose: () => { },
	getUser: () => { },
	setUser: () => { },
};

interface IAuthContext {
	isLoggedIn: boolean,
	user: IUser,
	loading: boolean,
	error?: ApolloError,
	logout: any
	loginIsOpen: boolean
	loginOnOpen: () => void
	loginOnClose: () => void
	getUser: any
	setUser: any
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
	const [loading, setLoading] = useState(true);
	const [initialLoad, setInitialLoad] = useState(false);

	const [user, setUser] = useState<IUser>(defaultAuthUser);
	const [getUser, { loading: loadingUser, error, data }] = useLazyQuery(ME);
	const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();

	useEffect(() => {
		try {
			getUser();
		} catch (_) {
			setIsLoggedIn(false);
		}

		setInitialLoad(true);
	}, []);

	useEffect(() => {
		if (initialLoad) {
			setLoading(loadingUser);
		}
	}, [loadingUser]);

	useEffect(() => {
		if (data && data.me) {
			setUser(data.me);
		}
	}, [data]);

	return (
		<AuthContext.Provider value={{ user, getUser, setUser, loading, error, isLoggedIn, logout, loginIsOpen, loginOnOpen, loginOnClose }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
