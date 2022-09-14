import { Badge, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface IProjectSectionBar {
	name: string;
	number?: string | number
}

export const ProjectSectionBar = ({name, number}: IProjectSectionBar) => {
	console.log('sd');
	return (
		<VStack width="100%" alignItems="flex-start" borderBottom="2px solid" borderColor="brand.neutral300">
			<HStack marginBottom="10px">
				<Text fontSize="18px" color="brand.neutral900">{name}</Text>
				{number && <Badge>{number}</Badge>}
			</HStack>

		</VStack>
	);
};
