import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

export const Home = () => {
	useEffect(() => {
		console.log('checking accessToken', Cookies.get('accessToken')); // => 'value'
		console.log('checking refreshToken', Cookies.get('refreshToken')); // => 'value'
	}, []);

	return (
		<div>
			This is the home page
		</div>
	);
};

