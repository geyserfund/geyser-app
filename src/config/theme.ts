import { extendTheme } from '@chakra-ui/react';
import { colors } from '../constants';
import { fonts } from '../constants/fonts';

export const theme = extendTheme({
	colors: {
		brand: {
			...colors,
		},
	},
	fonts: {
		heading: fonts.brand,
		body: fonts.brand,
		default: fonts.brand,
	},
	components: {
		Button: {
			// 1. We can update the base styles
			baseStyle: {
				fontWeight: 'normal', // Normally, it is "semibold"
			},
		},
		Text: {
			baseStyle: {
				fontSize: '14px',
			},
		},
		Divider: {
			variant: {
				lg: {
					borderBottomWidth: '2px',
					borderColor: 'rgba(196, 196, 196, 0.4)',
				},
			},
		},
	},

});

