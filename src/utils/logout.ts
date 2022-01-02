import Cookies from 'js-cookie';

export const logout = () => {
	Cookies.remove('accessToken');
	Cookies.remove('refreshToken');
	Object.keys(Cookies.get()).forEach(cookieName => {
		Cookies.remove(cookieName);
	});
	fetch('auth/logout');
};
