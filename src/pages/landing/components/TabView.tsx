import { Button } from '@chakra-ui/react';
import React from 'react';

export type Props = {
  onClick: () => void;
  label: string;
  isActive: boolean;
};

const TabView: React.FC<Props> = ({
	label,
	isActive,
	onClick,
}: Props) => (
	<Button
		_hover={{backgroundColor: 'none'}}
		w="100%"
		rounded="none"
		bg="none"
		fontWeight={isActive ? 'bold' : 'normal'}
		fontSize="16px"
		marginTop="10px"
		onClick={onClick}
	>
		{label}
	</Button>
);

export default TabView;
