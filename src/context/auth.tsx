import { ApolloError, useLazyQuery } from '@apollo/client';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { ME } from '../graphql';
import { IUser } from '../interfaces';
import { AUTH_SERVICE_ENDPOINT } from '../constants';
import { defaultUser } from '../defaults';
import { useDisclosure } from '@chakra-ui/react';

const defaultContext = {
	isLoggedIn: false,
	user: defaultUser,
	loading: false,
	error: undefined,
	logout: () => { },
	loginIsOpen: false,
	loginOnOpen: () => { },
	loginOnClose: () => { },
	setIsLoggedIn: () => { },
	getUser: () => { },
	setUser: () => { },
	nav: {title: '', path: ''},
	setNav: () => {},
};

export type Tnav ={
	title: string;
	path: string;
	projectOwnerId?: number;
}

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
	nav: Tnav;
	setNav: React.Dispatch<React.SetStateAction<Tnav>>;
}

export const AuthContext = createContext<IAuthContext>(defaultContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const logout = () => {
    setUser(defaultUser);
    fetch(`${AUTH_SERVICE_ENDPOINT}/logout`, { credentials: 'include' }).catch(
      (error) => console.error(error),
    );
  };

	const [loading, setLoading] = useState(true);
	const [initialLoad, setInitialLoad] = useState(false);
	const [nav, setNav] = useState<Tnav>({title: '', path: ''});

  const [user, setUser] = useState<IUser>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [getUser, { loading: loadingUser, error }] = useLazyQuery(ME, {
    onCompleted: (data: any) => {
      if (data && data.me) {
        setUser(data.me);
        setIsLoggedIn(true);
      }
    },
  });

  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure();

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
		<AuthContext.Provider
			value={{
				user,
				getUser,
				setUser,
				loading,
				error,
				isLoggedIn,
				setIsLoggedIn,
				logout,
				loginIsOpen,
				loginOnOpen,
				loginOnClose,
				nav,
				setNav,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
