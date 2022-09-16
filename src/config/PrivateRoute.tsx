import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthModal } from '../components/molecules';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';
import { hasTwitterAccount } from '../utils';

interface IPrivateRoute {
  children: React.ReactNode;
}

export const PrivateRoute = ({children}: IPrivateRoute) => {
	const {loading, user, loginOnClose, loginIsOpen, loginOnOpen} = useAuthContext();
	const history = useHistory();

	if (loading) {
		return <LoadingPage />;
	}

	useEffect(() => {
		if (!loading && (!user || (user && !user.id) || (user && !hasTwitterAccount(user)))) {
			loginOnOpen();
		}
	}, [user, loading]);

	const getAuthModalTitleAndDescription = () => {
		// TODO adapt regex for correct private routes
		if (history.location.pathname.includes('/launch')) {
			return {
				title: 'Connect Twitter',
				description: 'Connect your Twitter social profile to create a project. We require creators to login with twitter to start their Geyser projects.',
			};
		}

		return {
			title: 'The page you are trying to access required authorization.',
			description: 'Login to continue',
		};
	};

	const authModalTitleAndDescription = getAuthModalTitleAndDescription();

	return (
		<>
			{children}
			<AuthModal
				title={authModalTitleAndDescription.title}
				description={authModalTitleAndDescription.description}
				showLightning={false}
				isOpen={loginIsOpen}
				privateRoute={true}
				onClose={loginOnClose}
			/>
		</>
	);
};
