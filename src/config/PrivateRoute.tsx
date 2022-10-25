import React, { useEffect, useMemo } from 'react';
import { match, useHistory, useParams, useRouteMatch } from 'react-router';
import { AuthModal } from '../components/molecules';
import { getPath, routerPathNames } from '../constants';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';

import { hasTwitterAccount } from '../utils';

interface IPrivateRoute {
  children: React.ReactNode;
}

const privateProjectLaunchRoutes = [getPath('privateProjectLaunch')];

const projectEntryCreationRoutes = [
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`,
  `/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`,
];

export const PrivateRoute = ({ children }: IPrivateRoute) => {
  const {
    loading,
    user,
    loginOnClose,
    isAuthModalOpen: loginIsOpen,
    loginOnOpen,
  } = useAuthContext();

  const history = useHistory();
  const params = useParams<{ projectId: string }>();

  const routeMatchesForPrivateProjectLaunch =
    privateProjectLaunchRoutes.map(useRouteMatch);

  const routeMatchesForEntryProjectCreation =
    projectEntryCreationRoutes.map(useRouteMatch);

  const routeMatchForTopLevelProjectCreation = useRouteMatch(
    getPath('privateProjectLaunch'),
  );

  const isPrivateProjectCreationPath: boolean = useMemo(() => {
    return routeMatchesForPrivateProjectLaunch.some((routeMatch) => {
      return Boolean(routeMatch as match);
    });
  }, [routeMatchesForPrivateProjectLaunch]);

  const isProjectEntryCreationPath: boolean = useMemo(() => {
    return routeMatchesForEntryProjectCreation.some((routeMatch) => {
      return Boolean(routeMatch as match);
    });
  }, [routeMatchesForEntryProjectCreation]);

  const isTopLevelProjectCreationRoute: boolean = useMemo(() => {
    return Boolean(routeMatchForTopLevelProjectCreation?.isExact);
  }, [routeMatchForTopLevelProjectCreation]);

  const isUserViewingTheirOwnProject: boolean = useMemo(() => {
    return user.ownerOf.some(
      ({ project }: any) => project.id === params.projectId,
    );
  }, [params.projectId, user.ownerOf]);

  useEffect(() => {
    if (!loading) {
      if (
        !user ||
        (user && !user.id) ||
        (isPrivateProjectCreationPath && user && !hasTwitterAccount(user))
      ) {
        loginOnOpen();
      }
    }
  }, [user, loading]);

  const modalTitle = () => {
    if (isPrivateProjectCreationPath && user && !hasTwitterAccount(user)) {
      return 'Connect Twitter';
    }

    return 'The page you are trying to access required authorization.';
  };

  const modalDescription = () => {
    if (isPrivateProjectCreationPath && user && !hasTwitterAccount(user)) {
      return 'Connect your Twitter social profile to create a project. We require creators to login with twitter to start their Geyser projects.';
    }

    if (isProjectEntryCreationPath) {
      return 'You must be logged in to create an entry.';
    }

    return 'Login to continue';
  };

  const renderUnauthorized = () => (
    <AuthModal
      title={modalTitle()}
      description={modalDescription()}
      showLightning={!isPrivateProjectCreationPath}
      isOpen={loginIsOpen}
      privateRoute={true}
      onClose={loginOnClose}
    />
  );

  const isForbidden = () => {
    // 1. Check if a user is trying to access the project creation flow
    // of a project they doesn't own.
    if (user && isTopLevelProjectCreationRoute) {
      return false;
    }

    return (
      user &&
      isPrivateProjectCreationPath &&
      Boolean(isUserViewingTheirOwnProject) === false
    );

    // TODO: 2. Check if a user is trying to access the entry creation flow of an
    // that entry they are not the author of.
  };

  const renderForbidden = () => history.push(getPath('notAuthorized'));

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {children}
      {isForbidden() ? renderForbidden() : renderUnauthorized()}
    </>
  );
};
