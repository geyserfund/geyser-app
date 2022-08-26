import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
	Switch,
	Route,
} from 'react-router-dom';
import { NavBar } from '../components/nav';
import { Home } from '../pages/home';
import { Project } from '../pages/project';
import { createBrowserHistory } from 'history';
import { NotFound } from '../pages/notFound';
import { GrantsLanding } from '../pages/grants/GrantsLanding';
import { LaunchIdea } from '../pages/launchIdea';
import { Profile } from '../pages/profile';
import { TwitterSuccess, FailedAuth } from '../pages/auth';
import { useAuthContext } from '../context';
import { LoadingPage } from '../pages/loading';
import { Fade } from '@chakra-ui/react';
import { PostCreateEdit } from '../pages/creation/postEditor';
import { PostPreview } from '../pages/creation/postPreview';
import { ProjectCreate } from '../pages/creation/projectCreate';

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
				<NavBar showBorder={showBorder} skipRoutes={['/posts', '/posts/:postId', '/posts/:postId/preview']} />
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
						<Route path="/launch">
							<LaunchIdea />
						</Route>
						<Route path="/posts/:postId/preview">
							<PostPreview />
						</Route>
						<Route path="/posts/:postId">
							<PostCreateEdit />
						</Route>
						<Route path="/posts">
							<PostCreateEdit />
						</Route>
						<Route path="/projects">
							<ProjectCreate />
						</Route>
						<Route path="/profile/:userId">
							<Profile />
						</Route>
						<Route path="/project/:projectId">
							<Project />
						</Route>
						<Route path="/not-found">
							<NotFound />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Box>
			</Box>
		</Fade>
	);
};
