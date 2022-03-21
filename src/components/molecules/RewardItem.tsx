import { AddIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';

const useStyles = createUseStyles({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: '10px',
		border: '2px solid',
		borderColor: colors.bgLightGrey,
		borderRadius: '10px',
		'&:focus': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
		'&:hover': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
	},
	upperContainer: {
		borderBottom: `1px solid ${colors.bgLightGrey}`,
		paddingBottom: '10px',
	},
	backer: {
		padding: '3px 5px',
		backgroundColor: colors.bgLightGrey,
		fontSize: '10px',
		borderRadius: '5px',
	},
});

interface IRewardItem {
    price: number;
    title: string;
    backers: number;
    description: string;
}

interface IRewardItemProps {
    item: IRewardItem
}

export const RewardItem = ({item}: IRewardItemProps) => {
	const classes = useStyles();

	const {price, title, backers, description} = item;

	// Const [count, setCount] = useState(0);

	return (
		<Box tabIndex={-1} className={classes.container} >
			<HStack className={classes.upperContainer} >
				<VStack spacing={0}>
					<Text fontSize="16px" color={colors.normalLightGreen}>{`$${price}`}</Text>
					<Text fontSize="12px" color={colors.normalLightGreen}>per item</Text>
				</VStack>
				<VStack alignItems="flex-start" flex={1} spacing="0px">
					<Text fontSize="16px">{title}</Text>
					<Box className={classes.backer}>{`${backers} backers`}</Box>
				</VStack>
				<HStack>
					<IconButton aria-label="select-reward" icon={<AddIcon />} />
				</HStack>
			</HStack>
			<Text marginTop="10px">{description}</Text>

		</Box>
	);
};
