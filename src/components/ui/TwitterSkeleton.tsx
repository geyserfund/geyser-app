import { Box } from '@chakra-ui/layout';
import { SkeletonCircle, SkeletonText } from '@chakra-ui/skeleton';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	container: {
		minWidth: '250px',
		maxWidth: '450px',
		cursor: 'pointer',
		pointerEvents: 'auto',
		borderWidth: '1px',
		borderRadius: '12px',
		borderColor: 'rgb(207, 217, 222)',
		overflow: 'hidden',
		padding: '20px 40px',
	},
});

export const TwitterSkeleton = () => {
	const classes = useStyles();
	return (
		<Box
			className={classes.container}
			padding="6"
			boxShadow="lg"
			bg="white"
		>
			<SkeletonCircle size="10" />
			<SkeletonText mt="4" noOfLines={4} spacing="4" />
		</Box>
	);
};
