import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from '../components/nav';
import { LandingPage } from '../pages/landing';
import { Project } from '../pages/project';
import { createBrowserHistory } from 'history';
import { NotFound } from '../pages/notFound';
import { GrantsLanding } from '../pages/grants/GrantsLanding';
import { Launch } from '../pages/launch';
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

export const customHistory = createBrowserHistory();

export const Router = () => {
  const { loading } = useAuthContext();

  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const container = document.getElementById('geyser-landing-page');
    if (container) {
      container.addEventListener('scroll', (event: any) => {
        if (event && event.target && event.target.scrollTop >= 30) {
          setIsAtTop(false);
        } else {
          setIsAtTop(true);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', () => null);
      }
    };
  }, []);

  const showBorder = isAtTop && location.pathname === '/';

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Fade in={true}>
      <Box height="100vh">
        <NavBar
          showBorder={showBorder}
          skipRoutes={[
            '/projects/:projectId/entry',
            '/projects/:projectId/entry/:entryId',
            '/projects/:projectId/entry/:entryId/preview',
          ]}
        />
        <Box id="geyser-landing-page" height="100vh" overflowY="auto">
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
            {/* <Route path="/launch">
							<LaunchIdea />
						</Route> */}
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
            <Route path="/launch/:projectId">
              <PrivateRoute>
                <ProjectCreate />
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
            <Route path="/project-discovery" component={ProjectDiscoveryPage} />
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Fade>
  );
};
