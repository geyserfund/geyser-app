import { createUseStyles } from 'react-jss';

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
		textAlign: 'justify',
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
});
