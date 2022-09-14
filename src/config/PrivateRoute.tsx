import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { RequiredLoginModal } from '../components/molecules';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';

interface IPrivateRoute {
  children: React.ReactNode;
}

export const PrivateRoute = ({children}: IPrivateRoute) => {
	const {loading, user, isLoggedIn, loginOnOpen} = useAuthContext();
	const history = useHistory();

	const {isOpen, onOpen, onClose} = useDisclosure();

	if (loading) {
		return <LoadingPage />;
	}

	useEffect(() => {
		if (!loading && (!user || (user && !user.id))) {
			onOpen();
		} else if (!loading && user && user.id) {
			onClose();
		}
	}, [user, loading]);

	return (
		<>
			{children}
			<RequiredLoginModal isOpen={isOpen} onClose={() => {}} handleClick={loginOnOpen}/>
		</>
	);
};
