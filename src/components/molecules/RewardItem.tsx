import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { IRewardCount } from '../../interfaces';

const useStyles = createUseStyles({
	container: {

		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: '10px',
		border: '2px solid',
		borderColor: colors.bgLightGrey,
		borderRadius: '12px',
		'&:focus': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
		'&:hover': {
			borderColor: colors.normalLightGreen,
			boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
		},
	},
	focused: {
		borderColor: colors.normalLightGreen,
		boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
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
	extraIcons: {
		padding: '10px 5px',
		fontSize: '12px',
		height: '40px',
	},
});

interface IRewardItem {
	id: number;
    price: number;
    title: string;
    backers: number;
    description: string;
}

interface IRewardItemProps {
    item: IRewardItem
	updateCount: (_:IRewardCount)=> void
}

export const RewardItem = ({item, updateCount}: IRewardItemProps) => {
	const classes = useStyles();

	const {price, title, backers, description} = item;

	const [count, setCount] = useState(0);
	const {isOpen: focus, onOpen: setFocus, onClose: setBlur} = useDisclosure();

	const handleAdd = () => {
		setCount(count + 1);
	};

	const handleRemove = () => {
		if (count > 0) {
			setCount(count - 1);
		}
	};

	useEffect(() => {
		updateCount({id: item.id, count});
	}, [count]);

	const renderIcon = count ? <Text fontSize="20px">{count}</Text> : <AddIcon />;

	return (
		<Box tabIndex={-1} className={classNames(classes.container, {[classes.focused]: focus })} >
			<HStack className={classes.upperContainer} >
				<VStack spacing={0}>
					<Text fontSize="14px" color={colors.normalLightGreen}>{`$${price}`}</Text>
					<Text fontSize="10px" color={colors.normalLightGreen}>per item</Text>
				</VStack>
				<VStack alignItems="flex-start" flex={1} spacing="0px">
					<Text fontSize="14px">{title}</Text>
					<Box className={classes.backer}>{`${backers} backers`}</Box>
				</VStack>
				<HStack>
					{count
						&& <HStack spacing="2px">
							<IconButton onFocus={setFocus} onBlur={setBlur} size="xs" className={classes.extraIcons} aria-label="add-reward" icon={<MinusIcon />} onClick={handleRemove} />
							<IconButton onFocus={setFocus} onBlur={setBlur} size="xs" className={classes.extraIcons} aria-label="remove-reward" icon={<AddIcon />} onClick={handleAdd} />
						</HStack>
					}
					<IconButton onFocus={setFocus} onBlur={setBlur} backgroundColor={count ? colors.primary : undefined} aria-label="select-reward" icon={renderIcon} onClick={handleAdd} />
				</HStack>
			</HStack>
			<Text marginTop="5px">{description}</Text>

		</Box>
	);
};
