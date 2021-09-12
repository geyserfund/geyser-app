import {extendTheme} from '@chakra-ui/react';
import { colors } from '../constants';

export const theme = extendTheme({
	colors: {
		brand: {
			...colors,
		},
	},
});

