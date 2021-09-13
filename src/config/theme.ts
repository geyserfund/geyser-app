import {extendTheme} from '@chakra-ui/react';
import { colors } from '../constants';
import { fonts } from '../constants/fonts';

export const theme = extendTheme({
	colors: {
		brand: {
			...colors,
		},
	},
	fonts: {
		default: fonts.brand,
	},
});

