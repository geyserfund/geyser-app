import { Modal } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { AuthModal } from '../components/molecules';
import { getPath } from '../constants';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';
import { ProjectType, OwnerOf, Project } from '../types/generated/graphql';

import { hasTwitterAccount } from '../utils';

interface IPrivateRoute {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const {
    loading,
    user,
    loginOnClose,
    isAuthModalOpen: loginIsOpen,
    loginOnOpen,
  } = useAuthContext();
  const history = useHistory();

  if (loading) {
    return <LoadingPage />;
  }

  const isEntryCreationPath = /\/projects\/([a-z-_0-9])*\/entry/.test(
    history.location.pathname,
  );
  const isProjectCreationPath = /\/launch/.test(history.location.pathname);
  const params = useParams<{ projectId: string }>();
  const isViewerProjectOwner = user.ownerOf?.find(
    ({ project }: any) => project.id === params.projectId,
  );

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

  const renderUnauthorised = () => (
    <AuthModal
      title={modalTitle()}
      description={modalDescription()}
      showLightning={!isProjectCreationPath}
      isOpen={loginIsOpen}
      privateRoute={true}
      onClose={loginOnClose}
    />
  );

  const isForbidden = () => {
    // 1. User trying to access the project creation flow of a project he doesn't own
    if (user && isProjectCreationPath && !isViewerProjectOwner) return true;

    // TODO: 2. User trying to access the entry creation flow of an entry he is not the author of
    return false;
  };

  const renderForbidden = () => history.push(getPath('index'));

  return (
    <>
      {children}
      {isForbidden() ? renderForbidden() : renderUnauthorised()}
    </>
  );
};
