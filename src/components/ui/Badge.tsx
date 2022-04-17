import { Box, Text } from '@chakra-ui/layout';
import React from 'react';

export const Badge = ({ badge }: { badge: string }) =>
	(
		<Box as="span" backgroundColor="brand.bgGold" padding="0px 8px" borderRadius="20px">
			<Text fontSize="10px">{badge}</Text>
		</Box>
	);

export default Badge;
