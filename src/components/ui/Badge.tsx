import { Box } from '@chakra-ui/layout';
import React from 'react';
// Import { CrownIcon, HourglassIcon, MagnifyGlassIcon, MedalIcon, StarIcon, TrophyIcon } from '../icons';

export type BadgeVariant = 'owner' | 'ambassador' | 'earlyFunder' | 'crown' | 'trophy' | 'medal' | 'ownerPending'

// Interface IBadge {
// 	variant?: BadgeVariant
// 	full?: boolean
// }

// Export const Badge = ({ variant, full }: IBadge) => {
// 	const renderIcon = (variant?: string) => {
// 		switch (variant) {
// 			case 'ambassador':
// 				return <StarIcon />;
// 			case 'owner':
// 				return '';
// 			case 'earlyFunder':
// 				return <MagnifyGlassIcon />;
// 			case 'crown':
// 				return <CrownIcon />;
// 			case 'trophy':
// 				return <TrophyIcon />;
// 			case 'medal':
// 				return <MedalIcon />;
// 			case 'ownerPending':
// 				return <HourglassIcon />;
// 			default:
// 				break;
// 		}
// 	};

// 	const textMap: any = ({
// 		ambassador: 'Ambassador',
// 		owner: 'Fund Owner',
// 		earlyFunder: 'Early Funder',
// 		crown: '',
// 		trophy: '',
// 		medal: '',
// 	});

// 	return (
// 		<Box as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px">
// 			{renderIcon(variant)}
// 			{full && variant ? textMap[variant] : ''}
// 		</Box>
// 	);
// };

export const Badge = ({ badge }: { badge: string }) =>
	(
		<Box as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px">{badge}</Box>
	);

export default Badge;
