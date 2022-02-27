import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { fadeOut, slideInRight } from '../../../css';

type Rules = string

interface IStyles {
	isMobile?: boolean;
	detailOpen?: boolean;
	fadeStarted?: boolean;
}

export const useStyles = createUseStyles<Rules, IStyles>({
	container: ({ isMobile, detailOpen, fadeStarted }: IStyles) => ({
		position: fadeStarted ? 'absolute' : 'relative',
		display: (!isMobile || !detailOpen || fadeStarted) ? 'flex' : 'none',
		top: fadeStarted ? 0 : undefined,
		left: fadeStarted ? 0 : undefined,
	}),
	fundButton: {
		position: 'absolute',
		left: '0px',
		top: '5px',
		height: '55px',
		width: '80px',
		paddingLeft: '12px',
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		borderBottomRightRadius: '40px',
		borderTopRightRadius: '40px',
		backgroundColor: colors.primary,
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	},
	...slideInRight,
	...fadeOut,

});
