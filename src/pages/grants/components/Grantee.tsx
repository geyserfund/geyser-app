import React from 'react';
import { Link, Text } from '@chakra-ui/react';
import { createUseStyles } from 'react-jss';
import { IGrantee } from '../../../interfaces';

const useStyles = createUseStyles({
	potentialRecipients: {
		'&:hover': {
			textDecoration: 'none',
			backgroundColor: '#F6F6F6',
		},
	},
});

export const Grantee = ({ grantee }: { grantee: IGrantee }) => {
	const classes = useStyles();

	return (
		<Link href={grantee.url} isExternal className={classes.potentialRecipients} border="2px solid lightgrey" borderRadius="md" display="flex" justifyContent="center" alignItems="center" m={2}>
			<Text textDecoration="underline" textDecorationThickness="3px" textDecorationColor="brand.bgGreyDark" px={6} py={2} fontWeight="bold">{grantee.name}</Text>
		</Link>
	);
};
