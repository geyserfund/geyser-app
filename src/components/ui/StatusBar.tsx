import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { BiError } from 'react-icons/bi';
import { GiWaveCrest } from 'react-icons/gi';

interface IStatusBarProp {
    message: string;
    variant: 'problem' | 'solution';
}

export const StatusBar = ({message, variant}: IStatusBarProp) => {
	const getLabel = () => {
		switch (variant) {
			case 'problem':
				return 'Problem';
			case 'solution':
				return 'Solution';
			default:
				return 'Problem';
		}
	};

	const getIcon = () => {
		switch (variant) {
			case 'problem':
				return <BiError fontSize={25}/>;
			case 'solution':
				return <GiWaveCrest fontSize={25}/>;
			default:
				return <BiError fontSize={25}/>;
		}
	};

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

	const getFlexDitection = () => {
		switch (variant) {
			case 'problem':
				return 'row';
			case 'solution':
				return 'column';
			default:
				return 'column';
		}
	};

	return (
		<Box width="100%" display="flex" backgroundColor={getBackground()} padding="8px 5px" borderRadius="8px" >
			<Box padding="10px">
				{ getIcon()}
			</Box>
			<Box flex={1} display="flex" flexDirection={getFlexDitection()} alignItems={variant === 'solution' ? 'flex-start' : 'center'}>
				<Text fontWeight={600}>{`${getLabel()}: `}</Text><Text>{message}</Text>
			</Box>

		</Box>
	);
};
