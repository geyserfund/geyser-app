import { Box, Text } from '@chakra-ui/layout';
import classNames from 'classnames';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
	toggleContainer: {
		width: '100%',
		height: '46px',
		backgroundColor: colors.bgLightGrey,
		borderRadius: '14px',
		display: 'flex',
		border: '1px solid',
		borderColor: colors.bgLightGrey,
		alighItems: 'center',
		position: 'relative',
		overflow: 'hidden',
		'&:hover': {
			cursor: 'pointer',
			border: '1px solid',
			borderColor: colors.bgLightGrey,
			'& $toggleShade': {
				backgroundColor: 'rgba(0,0,0,1)',
				opacity: '0.13',
				transition: 'opacity 300ms',
			},
		},
	},
	toggleShade: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'black',
		opacity: '0',
		transition: 'opacity 300ms',
		zIndex: 3,
	},

	basicBox: {
		borderRadius: '14px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: '1',
		backgroundColor: 'none',
		borderColor: 'transparent',
		zIndex: 2,
	},
	activeBox: {
		backgroundColor: colors.primary,
		zIndex: 4,
	},
});

interface ICustomToggle {
	value: boolean;
	onChange: any;
}

export const CustomToggle = ({value, onChange}:ICustomToggle) => {
	const classes = useStyles();

	const [anonymous, setAnonymous] = useState(value);

	const handleToggle = () => {
		setAnonymous(!anonymous);
		onChange(!anonymous);
	};

	console.log('sdf');
	return (
		<Box className={classes.toggleContainer} onClick={handleToggle}>
			<Box className={classes.toggleShade} />
			<Box className={classNames(classes.basicBox, {[classes.activeBox]: !anonymous})}>
				<Text>
					Appear as anonymous
				</Text>
			</Box>
			<Box className={classNames(classes.basicBox, {[classes.activeBox]: anonymous})} >
				<Text>
					Appear with profile
				</Text>
			</Box>
		</Box>
	);
};
