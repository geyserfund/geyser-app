import { Box, BoxProps, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { resolveTripleslashReference } from 'typescript';
import { ProgressBar } from '../ui';

interface ITitleWithProgressBar extends BoxProps {
	title: string;
	subTitle: string;
	percentage: number;
}

export default function TitleWithProgressBar({title, subTitle, percentage, ...rest}:ITitleWithProgressBar) {
	return (
		<Box width="100%" {...resolveTripleslashReference}>
			<Text fontSize="18px" fontWeight={600}>{title}</Text>
			<HStack>
				<Text color="brand.gray500" fontSize="12px" > {subTitle} </Text>
				<ProgressBar flex="1" value={percentage}/>
			</HStack>
		</Box>
	);
}
