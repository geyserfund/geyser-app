import { Box } from '@chakra-ui/layout';
import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import { NavBar } from '../components/nav';
import { Home } from '../pages/home';
import { Project } from '../pages/project';

export const Router = () => (
	<Box height="100vh">
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/project/:projectId">
					<Project />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	</Box>
);
