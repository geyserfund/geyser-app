import { Box, VStack } from '@chakra-ui/layout';
import React from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { SatoshiIcon } from '../../components/icons';
import { CircularFundProgress } from '../../components/molecules';
import { ButtonComponent } from '../../components/ui';

export const Activity = () => (
	<Box flex={2} padding="43px 35px" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
		<VStack spacing="12px" width="100%">
			<CircularFundProgress amount={2000}/>
			<ButtonComponent primary standard leftIcon={<SatoshiIcon />} width="100%">Fund this project</ButtonComponent>
			<ButtonComponent standard leftIcon={<HiOutlineSpeakerphone fontSize="20px"/>} width="100%">Share with Friends</ButtonComponent>
		</VStack>

	</Box>
);
