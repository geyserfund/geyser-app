import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
	Router as BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import { NavBar } from '../components/nav';
import { Home } from '../pages/home';
import { Grants } from '../pages/grants';
import { Project } from '../pages/project';
import { createBrowserHistory } from 'history';
import { NotFound } from '../pages/notFound';

export const customHistory = createBrowserHistory();

export const Router = () => (
	<Box height="100vh">
		<BrowserRouter history={customHistory}>
			<NavBar />
			<Box height="calc(100vh - 62px)" overflowY="auto">
				<Switch>
					<Route path="/grants">
						<Grants />
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
