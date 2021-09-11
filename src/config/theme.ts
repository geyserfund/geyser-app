import {extendTheme} from '@chakra-ui/react';
const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
	colors: {
		brand: 'linear-gradient(0deg, #20ECC7, #20ECC7)',

	},
};
export const theme = extendTheme({config});
