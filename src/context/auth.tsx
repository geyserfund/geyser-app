import Cookies from 'js-cookie';
import { ApolloError, useLazyQuery } from '@apollo/client';
import React, { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
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
	setIsLoggedIn: () => { },
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
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
	getUser: any
	setUser: any
}

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const logout = () => {
		setUser(defaultAuthUser);
		// setIsLoggedIn(false);
		Cookies.remove('accessToken', cookieOptions);
		Cookies.remove('refreshToken', cookieOptions);
		Object.keys(Cookies.get()).forEach(cookieName => {
			Cookies.remove(cookieName, cookieOptions);
		});
		fetch('auth/logout');
	};

	const [loading, setLoading] = useState(true);
	const [initialLoad, setInitialLoad] = useState(false);

	const [user, setUser] = useState<IUser>(defaultAuthUser);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [getUser, { loading: loadingUser, error }] = useLazyQuery(ME, {
		onCompleted: (data: any) => {
			if (data && data.me) {
				setUser(data.me);
				setIsLoggedIn(true);
			}
		},
	});

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
		if (user.id === 0) {
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
		}
	}, [user]);

	useEffect(() => {
		if (initialLoad) {
			setLoading(loadingUser);
		}
	}, [loadingUser]);

	return (
		<AuthContext.Provider value={{ user, getUser, setUser, loading, error, isLoggedIn, setIsLoggedIn, logout, loginIsOpen, loginOnOpen, loginOnClose }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
