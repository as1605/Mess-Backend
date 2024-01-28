const BASE = 'http://10.17.50.141';

export const API = {
	auth: {
		login: (kerberos: string, password: string) =>
			fetch(BASE + '/auth/login', {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ kerberos, password }),
				credentials: 'include',
			}),
		logout: () => fetch(BASE + '/auth/logout', { mode: 'no-cors' }),
		myProfile: () => fetch(BASE + '/auth/myProfile', { mode: 'no-cors' }),
	},
};
