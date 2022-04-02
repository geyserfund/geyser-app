import React from 'react';
import { Box, Text } from '@chakra-ui/react';
// Import { BiError } from 'react-icons/bi';
// import { FaCheckDouble } from 'react-icons/fa';

interface IStatusBarProp {
	message: string;
	variant: 'problem' | 'solution';
}

export const StatusBar = ({ message, variant }: IStatusBarProp) => {
	const getLabel = () => {
		switch (variant) {
			case 'problem':
				return 'PROBLEM';
			case 'solution':
				return 'SOLUTION';
			default:
				return 'PROBLEM';
		}
	};

	// Const getIcon = () => {
	// 	switch (variant) {
	// 		case 'problem':
	// 			return <BiError fontSize={25} />;
	// 		case 'solution':
	// 			return <FaCheckDouble fontSize={20} />;
	// 		default:
	// 			return <BiError fontSize={25} />;
	// 	}
	// };

	const getBackground = () => {
		switch (variant) {
			case 'problem':
				return 'brand.bgStatusProblem';
			case 'solution':
				return 'brand.bgStatusSolution';
			default:
				return 'brand.bgStatusProblem';
		}
	};

	return (
		<Box width="100%" display="flex" backgroundColor={getBackground()} padding="8px 10px" borderRadius="8px" >
			{/* <Box padding="10px">
				{getIcon()}
			</Box> */}
			<Box flex={1} display="flex" flexDirection="column" alignItems={'flex-start'}>
				<Text fontSize="10px" color="brand.textGrey">{`${getLabel()}: `}</Text><Text>{message}</Text>
			</Box>

		</Box>
	);
};
