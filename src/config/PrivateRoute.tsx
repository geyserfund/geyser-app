import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { AuthModal } from '../components/molecules';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';
import { hasTwitterAccount } from '../utils';

interface IPrivateRoute {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const { loading, user, loginOnClose, loginIsOpen, loginOnOpen } =
    useAuthContext();
  const history = useHistory();

  if (loading) {
    return <LoadingPage />;
  }

  const isEntryCreationPath = /\/projects\/([a-z-_0-9])*\/entry/.test(
    history.location.pathname,
  );
  const isProjectCreationPath = /\/launch/.test(history.location.pathname);

  useEffect(() => {
    if (!loading) {
      if (
        !user ||
        (user && !user.id) ||
        (isProjectCreationPath && user && !hasTwitterAccount(user))
      ) {
        loginOnOpen();
      }
    }
  }, [user, loading]);

  const modalTitle = () => {
    if (isProjectCreationPath && user && !hasTwitterAccount(user)) {
      return 'Connect Twitter';
    }

    return 'The page you are trying to access required authorization.';
  };

  const modalDescription = () => {
    if (isProjectCreationPath && user && !hasTwitterAccount(user)) {
      return 'Connect your Twitter social profile to create a project. We require creators to login with twitter to start their Geyser projects.';
    }

    if (isEntryCreationPath) {
      return 'You must be logged in to create an entry.';
    }

    return 'Login to continue';
  };

  return (
    <>
      {children}
      <AuthModal
        title={modalTitle()}
        description={modalDescription()}
        showLightning={!isProjectCreationPath}
        isOpen={loginIsOpen}
        privateRoute={true}
        onClose={loginOnClose}
      />
    </>
  );
};
