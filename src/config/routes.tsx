import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import {
	Router as BrowserRouter,
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

export const customHistory = createBrowserHistory();

export const Router = () => {
	const [isAtTop, setIsAtTop] = useState(true);

	useEffect(() => {
		const container = document.getElementById('geyser-landing-page');
		if (container) {
			container.addEventListener('scroll', (event: any) => {
				// Console.log('checking isattop', event);
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
	console.log('is at top', isAtTop);
	return (
		<Box height="100vh">
			<BrowserRouter history={customHistory}>
				<NavBar isAtTop={isAtTop}/>
				<Box id="geyser-landing-page" height="calc(100vh - 62px)" overflowY="auto">
					<Switch>
						<Route path="/grants">
							<GrantsLanding />
						</Route>
						<Route path="/launch">
							<LaunchIdea />
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
			</BrowserRouter>
		</Box>
	);
};
