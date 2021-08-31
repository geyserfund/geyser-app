import {extendTheme} from '@chakra-ui/react';
// 2. Add your color mode config
const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
	colors: {
		brand: {
			100: '#f7fafc',
			// ...
			900: '#1a202c',
		},
	},
};
// 3. extend the theme
export const theme = extendTheme({config});
