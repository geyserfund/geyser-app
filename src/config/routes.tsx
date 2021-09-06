import { useQuery } from '@apollo/client';
import React from 'react';
import {
	BrowserRouter,
	Switch,
	Route,
} from 'react-router-dom';
import { QUERY_SERVICE_STATUS } from '../graphql';
import { Home } from '../pages/home';

export const Router = () => {
	const { loading, error, data } = useQuery(QUERY_SERVICE_STATUS);

	if (loading) {
		return <p>loading</p>;
	}

	if (error) {
		return <p>error</p>;
	}

	console.log('chekcing data', data);

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};
