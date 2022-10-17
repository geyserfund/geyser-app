import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Switch, Route } from 'react-router-dom';
import { LandingPage } from '../pages/landing';
import { TopNavBar } from '../components/nav';
import { Project } from '../pages/project';
import { createBrowserHistory } from 'history';
import { NotFound } from '../pages/notFound';
import { GrantsLanding } from '../pages/grants/GrantsLanding';
import { Profile } from '../pages/profile';
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
import { ProjectDiscoveryPage } from '../pages/project-discovery';
import { getPath } from '../constants';
import { Launch } from '../pages/launch';

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
            <Route path="/grants">
              <GrantsLanding />
            </Route>
            <Route
              path={getPath('launchProjectStart')}
              component={Launch}
            ></Route>
            <Route path="/launch/:projectId/node">
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            </Route>
            <Route path="/launch/:projectId/milestones">
              <PrivateRoute>
                <MilestoneAndRewards />
              </PrivateRoute>
            </Route>
            <Route path="/launch">
              <PrivateRoute>
                <ProjectCreate />
              </PrivateRoute>
            </Route>
            <Route path="/profile/:userId">
              <Profile />
            </Route>
            <Route path="/project/:projectId">
              <Project />
            </Route>
            <Route path="/projects/:projectId/entry/:entryId/preview">
              <PrivateRoute>
                <EntryPreview />
              </PrivateRoute>
            </Route>
            <Route path="/projects/:projectId/entry/:entryId">
              <PrivateRoute>
                <EntryCreateEdit />
              </PrivateRoute>
            </Route>
            <Route path="/projects/:projectId/entry">
              <PrivateRoute>
                <EntryCreateEdit />
              </PrivateRoute>
            </Route>
            <Route path="/projects/:projectId/dashboard">
              <PrivateRoute>
                <ProjectDashboard />
              </PrivateRoute>
            </Route>
            <Route path="/projects/:projectId">
              <ProjectView />
            </Route>
            <Route path="/entry/:entryId">
              <EntryPage />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route path="/not-authorized">
              <NotAuthorized />
            </Route>
            <Route
              path={getPath('projectDiscovery')}
              component={ProjectDiscoveryPage}
            />
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Fade>
  );
};
