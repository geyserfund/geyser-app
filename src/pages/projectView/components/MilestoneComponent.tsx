import { Checkbox, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { SatoshiAmount } from '../../../components/ui';

interface IMilestoneComponent {
  name: string;
  description: string;
  amount: number;
  checked?: boolean;
}

export const MilestoneComponent = ({name, description, amount, checked}: IMilestoneComponent) => (
	<HStack>
		<Checkbox isChecked={checked} colorScheme="gray"><Text color="brand.neutral800">{`${name}: ${description} - `}</Text></Checkbox>
		<SatoshiAmount>{amount}</SatoshiAmount>
		<Text color="brand.neutral800"> to go.</Text>
	</HStack>
);
