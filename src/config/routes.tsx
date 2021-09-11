import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import { NavBar } from '../components';
import { Home } from '../pages/home';
import { Project } from '../pages/project';

export const Router = () => (
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
);
