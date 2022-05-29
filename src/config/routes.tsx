import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router';
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

export const customHistory = createBrowserHistory();

export const Router = () => {
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
	return (
		<Box height="100vh">
			<NavBar showBorder={showBorder}/>
			<Box id="geyser-landing-page" height="calc(100vh - 62px)" overflowY="auto">
				<Switch>
					<Route path="/grants">
						<GrantsLanding />
					</Route>
					<Route path="/launch">
						<LaunchIdea />
					</Route>
					<Route path="/profile">
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
	);
};
