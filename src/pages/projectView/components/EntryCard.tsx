import { Badge, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { colors, LaunchImageUrl } from '../../../constants';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { AvatarElement } from './AvatarElement';

export const EntryCard = ({entry}: {entry: IProjectListEntryItem}) => {
	const isMobile = isMobileMode();
	console.log('checking osmethingS');
	return (
		<HStack flexDirection={isMobile ? 'column' : 'row'} spacing={isMobile ? '0px' : '10px'} width="100%" alignItems="flex-start" >
			<Box maxHeight="150px" maxWidth={isMobile ? '100%' : '200px'} overflow="hidden">
				<Image height="100%" width="100%" src={LaunchImageUrl}/>
			</Box>
			<VStack alignItems="flex-start" flex="1">
				<Text fontSize="30px" fontWeight={700} color="brand.neutral900">{entry.title}</Text>
				<Text color="brand.neutral600">{entry.description}</Text>
				<HStack >
					<AvatarElement username="Paco de la India" image="https://picsum.photos/200/300"/>
					<Badge>ARTICLE</Badge>
				</HStack>
			</VStack>
			<VStack justifyContent="center" height="100%">
				<HStack background="white" borderRadius="35px" padding="1px 5px">
					<Text color="brand.primary">{entry.fundersCount}</Text>
					<BsHeartFill color={colors.neutral500}/>
				</HStack>
			</VStack>
		</HStack>
	);
};
