import { Box } from '@chakra-ui/layout';
import React from 'react';
import { StarIcon } from '../icons';

export type BadgeVariant = 'owner' | 'ambassador' | 'earlyFunder' | 'crown' | 'trophy' | 'medal'

interface IBadge {
    variant?: BadgeVariant
}

export const Badge = ({variant}: IBadge) => {
	console.log('checking variabt', variant);
	return (
		<Box as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px">
			<StarIcon />
		</Box>
	);
};

export default Badge;
