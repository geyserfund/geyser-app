import { CloseIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { IProjectReward } from '../../../interfaces';
import { TRewards } from '../../../pages/creation/projectCreate/types';
import { Card, ICard, IconButtonComponent, ImageWithReload, SatoshiAmount } from '../../ui';

interface IRewardCard extends ICard {
	reward: TRewards | IProjectReward,
	isSatoshi: boolean,
	handleEdit?: any,
	handleRemove?: any,
}

export const RewardCard = ({reward, isSatoshi, handleEdit, handleRemove, ...rest}: IRewardCard) => {
	console.log('something');
	return (
		<Card
			borderRadius="4px"
			alignItems="flex-start"
			padding="10px"
			_hover={{
				cursor: 'pointer',
				boxShadow: 'rgba(60, 64, 67, 0.3) 0px 0px 2px 0px, rgba(60, 64, 67, 0.15) 0px 0px 3px 1px',
				'.rocketicon': {
					color: 'brand.primary',
				},
			}}
			{...rest}
		>
			<VStack width="100%">
				<HStack width="100%" justifyContent={'space-between'} paddingX="4px">
					<HStack>
						<VStack spacing="0px">
							{
								isSatoshi
									? <SatoshiAmount color="brand.primary">{reward.cost}</SatoshiAmount>
									: <Text color="brand.primary">{`$ ${reward.cost}`}</Text>
							}
							<Text fontSize="12px" color="brand.primary">per item</Text>
						</VStack>
						<VStack spacing="0px" alignItems="flex-start">
							<Text fontWeight={500} color="brand.neutral900">{reward.name}</Text>
							<Text fontSize="12px" backgroundColor="brand.neutral200" padding="2px 5px" borderRadius="4px"><b>{reward.backers || 0}</b> collected</Text>
						</VStack>
					</HStack>

					<HStack>
						{handleEdit &&	<IconButtonComponent
							aria-label="edit-reward"
							size="sm"
							icon={<BiPencil />}
							onClick={handleEdit}
						/>}
						{handleRemove && <IconButtonComponent
							aria-label="edit-reward"
							size="sm"
							icon={<CloseIcon />}
							backgroundColor="red.100"
							_hover={{backgroundColor: 'red.300'}}
							onClick={handleRemove}
						/>}
					</HStack>
				</HStack>
				{reward.image && <Box>
					<ImageWithReload borderRadius="4px" src={reward.image} width="335px" height="192px" objectFit="cover"/>
				</Box>}

				<Text width="100%" paddingX="5px">{reward.description}</Text>
			</VStack>

		</Card>
	);
};
