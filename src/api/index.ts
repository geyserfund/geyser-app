import Cookies from 'js-cookie';

export const getNewTokens = async () => {
	const refreshToken = Cookies.get('refreshToken');

	return fetch('http://localhost:4000/auth/refresh-token', {
		method: 'get',
		headers: {Authorization: `Bearer ${refreshToken}`},

	}).then(response => response.json());
};
