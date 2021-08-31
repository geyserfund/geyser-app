import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import {Home} from '../pages/home';

export const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/">
				<Home/>
			</Route>
		</Switch>
	</BrowserRouter>
);
