import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';

type Labels = string

interface Istyles {
	isMobile?: boolean
}

export const useStyles = createUseStyles<Labels, Istyles>({
	containers: {
		spacing: '5px',
		alignItems: 'flex-start',
		display: 'flex',
		width: '100%',
		'& img': {
			borderRadius: '5px',
		},
		'& a': {
			color: 'grey',
		},
	},
	texts: {
		fontSize: '16px',
		'& ul, & ol': {
			paddingLeft: '18px',
		},
	},
	readmore: {
		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},
	cardContainer: ({ isMobile }: Istyles) => ({
		borderRadius: '6px',
		padding: isMobile ? '12px 10px' : '12px 20px',
		border: '2px solid #E9E9E9',
		background: 'white',
		height: 'fit-content',
	}),
	amabassadorBlock: {
		backgroundColor: colors.gray100,
		padding: '7px',
		borderRadius: '5px',
		marginRight: '10px',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none',

		},
	},
	podcastContainer: {
		borderRadius: '4px',
		overflow: 'hidden',
	},
});
