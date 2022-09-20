import { Badge, Box, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { LikeHeart } from '../../../components/molecules';
import { SatoshiAmount } from '../../../components/ui';
import { IProjectListEntryItem } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { AvatarElement } from './AvatarElement';

interface IEntryCard {
	entry: IProjectListEntryItem
	onEdit?: () => void

}

export const EntryCard = ({entry, onEdit}: IEntryCard) => {
	const isMobile = isMobileMode();
	const history = useHistory();
	const handleClick = () => {
		history.push(`/entry/${entry.id}`);
	};

	const handleEdit = (event: any) => {
		event.stopPropagation();
		if (onEdit) {
			onEdit();
		}
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
			}}
			onClick={handleClick}
		>
			<Box maxHeight="150px" maxWidth={isMobile ? '100%' : '200px'} overflow="hidden">
				<Image borderRadius="4px" height="100%" width="100%" src={entry.image}/>
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
				{
					onEdit ? <Box _hover={{cursor: 'pointer', backgroundColor: 'brand.neutral200'}} as="span" borderRadius="50%" padding="8px" onClick={handleEdit}><BsPencil /></Box> : <LikeHeart count={entry.fundersCount}/>
				}
			</VStack>
		</HStack>
	);
};
