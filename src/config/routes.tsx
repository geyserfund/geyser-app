import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Switch, Route } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { TopNavBar } from '../components/nav';
import { Project } from '../pages/project';
import { createBrowserHistory } from 'history';
import { NotFoundPage } from '../pages/notFound';
import { GrantsLandingPage } from '../pages/grants/GrantsLandingPage';
import { TwitterSuccess, FailedAuth } from '../pages/auth';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';
import { Fade } from '@chakra-ui/react';
import { EntryCreateEdit } from '../pages/creation/entry/editor/EntryCreateEdit';
import { EntryPreview } from '../pages/creation/entry/EntryPreview';
import {
  MilestoneAndRewards,
  ProjectCreate,
  Wallet,
} from '../pages/creation/projectCreate';
import { PrivateRoute } from './PrivateRoute';
import { ProjectView } from '../pages/projectView';
import { EntryPage } from '../pages/entry/EntryPage';
import { NotAuthorized } from '../pages/notAuthorized';
import { ProjectDashboard } from '../pages/projectDashboard';
import { ProjectDiscoveryPage } from '../pages/projectDiscovery';
import { getPath, routerPathNames } from '../constants';
import { PublicProjectLaunchPage } from '../pages/publicProjectLaunch';
import { ProfilePage } from '../pages/profile/ProfilePage';

export const customHistory = createBrowserHistory();

export const Router = () => {
  const { loading } = useAuthContext();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Fade in={true}>
      <Box height="100vh">
        <TopNavBar />

        <Box id="app-route-content-root" height="100vh" overflowY="auto">
          <Switch>
            <Route path="/auth/twitter">
              <TwitterSuccess />
            </Route>
            <Route path="/failed-authentication">
              <FailedAuth />
            </Route>
            <Route path={getPath('grants')} component={GrantsLandingPage} />
            <Route
              path={getPath('publicProjectLaunch')}
              component={PublicProjectLaunchPage}
            />
            <Route
              path={`/${routerPathNames.launchProject}/:projectId/${routerPathNames.node}`}
            >
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.launchProject}/:projectId/${routerPathNames.milestonesAndRewards}`}
            >
              <PrivateRoute>
                <MilestoneAndRewards />
              </PrivateRoute>
            </Route>
            <Route path={getPath('privateProjectLaunch')}>
              <PrivateRoute>
                <ProjectCreate />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.userProfile}/:userId`}
              component={ProfilePage}
            />
            {/* The <Project> view is an old view. We will delete it after the migration to the new views is completed. */}
            <Route path="/project/:projectId">
              <Project />
            </Route>
            <Route
              path={`/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId/${routerPathNames.preview}`}
            >
              <PrivateRoute>
                <EntryPreview />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.projects}/:projectId/${routerPathNames.entry}/:entryId`}
            >
              <PrivateRoute>
                <EntryCreateEdit />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.projects}/:projectId/${routerPathNames.entry}`}
            >
              <PrivateRoute>
                <EntryCreateEdit />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.projects}/:projectId/${routerPathNames.dashboard}`}
            >
              <PrivateRoute>
                <ProjectDashboard />
              </PrivateRoute>
            </Route>
            <Route
              path={`/${routerPathNames.projects}/:projectId`}
              component={ProjectView}
            />
            <Route
              path={`/${routerPathNames.entry}/:entryId`}
              component={EntryPage}
            />
            <Route path={getPath('notFound')} component={NotFoundPage} />
            <Route path={getPath('notAuthorized')} component={NotAuthorized} />
            <Route
              path={getPath('projectDiscovery')}
              component={ProjectDiscoveryPage}
            />
            <Route path={getPath('index')} component={LandingPage} />
            <Route path={getPath('landingPage')} component={LandingPage} />
          </Switch>
        </Box>
      </Box>
    </Fade>
  );
};
