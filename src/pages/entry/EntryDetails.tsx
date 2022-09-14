import { Avatar, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { colors } from '../../constants';
import { TPostData } from '../../interfaces/posts';
import { Editor } from '../creation/postEditor';

export const EntryDetails = ({entry}:{entry: TPostData}) => {
	console.log('checking somehitng');
	return (
		<VStack width="100%" alignItems="flex-start">
			<Box>
				<Text fontSize="35px" fontWeight={700} color="brand.neutral900">{entry.title}</Text>
			</Box>
			<HStack width="100%" justifyContent="space-between">
				<HStack>
					<Avatar size="sm" src={entry.creator.imageUrl} />
					<Text>{entry.creator.username}</Text>
					<Text paddingX="10px" color="brand.neutral900">{DateTime.fromMillis(parseInt(entry.publishedAt, 10)).toFormat('dd LLL yyyy')}</Text>
				</HStack>
				<HStack backgroundColor="white" borderRadius="35px" padding="1px 5px">
					<Text color="brand.primary">{entry.fundersCount}</Text>
					<BsHeartFill color={colors.neutral500}/>
				</HStack>
			</HStack>
			<HStack width={'100%'} justifyContent="center" maxHeight="400px" overflow="hidden">
				<Image width="100%" src={entry.image} />
			</HStack>
			<Text fontSize="18px" fontWeight={600}>{entry.description}</Text>
			<Box flex={1} width="100%" >
				<Editor name="content" value={entry.content} readOnly/>
			</Box>
		</VStack>
	);
};
