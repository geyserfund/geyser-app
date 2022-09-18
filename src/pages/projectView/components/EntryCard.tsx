import { Badge, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { LikeHeart } from '../../../components/molecules';
import { SatoshiAmount } from '../../../components/ui';
import { colors } from '../../../constants';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { AvatarElement } from './AvatarElement';

export const EntryCard = ({entry}: {entry: IProjectListEntryItem}) => {
	const isMobile = isMobileMode();
	const history = useHistory();
	const handleClick = () => {
		history.push(`/entry/${entry.id}`);
	};

	return (
		<HStack
			flexDirection={isMobile ? 'column' : 'row'}
			spacing={isMobile ? '0px' : '20px'}
			width="100%"
			alignItems="flex-start"
			borderRadius="4px"
			_hover={{
				cursor: 'pointer',
				boxShadow: 'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
				transition: 'box-shadow 0.3s ease-in-out',
			}}
			onClick={handleClick}
		>
			<Box maxHeight="150px" maxWidth={isMobile ? '100%' : '200px'} overflow="hidden">
				<Image height="100%" width="100%" src={entry.image}/>
			</Box>
			<VStack alignItems="flex-start" flex="1">
				<Text fontSize="30px" fontWeight={700} color="brand.neutral900">{entry.title}</Text>
				<Text color="brand.neutral600">{entry.description}</Text>
				<HStack >
					<SatoshiAmount color="brand.primary">{entry.amountFunded}</SatoshiAmount>
					{entry.creator && <AvatarElement user={entry.creator} />}
					<Badge>ARTICLE</Badge>
				</HStack>
			</VStack>
			<VStack justifyContent="center" height="100%" paddingRight="10px">
				<LikeHeart count={entry.fundersCount}/>
			</VStack>
		</HStack>
	);
};
