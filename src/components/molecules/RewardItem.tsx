import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { IRewardCount, IProjectReward } from '../../interfaces';
import { SatoshiAmount } from '../ui';

const useStyles = createUseStyles({
	container: {
		backgroundColor: '#FDFDFD',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		padding: '10px',
		border: '2px solid',
		borderColor: colors.bgLightGrey,
		borderRadius: '12px',
		'&:hover': {
			borderColor: colors.gray300,
			// BoxShadow: `0 0 0 1px ${colors.gray300}`,
		},
	},
	focused: {
		borderColor: `${colors.normalLightGreen} !important`,
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

interface IRewardItemProps {
    item: IProjectReward
	updateCount: (_:IRewardCount)=> void
	count?: number
}

export const RewardItem = ({item, updateCount, count: initialCount}: IRewardItemProps) => {
	const classes = useStyles();

	const {cost, name, backers, description, currency } = item;

	const [count, setCount] = useState(initialCount || 0);
	const {isOpen: focus, onOpen: setFocus, onClose: setBlur} = useDisclosure();

	const handleAdd = () => {
		const newCount = count + 1;
		setCount(newCount);
		updateCount({id: item.id, count: newCount});
	};

	const handleRemove = () => {
		if (count > 0) {
			const newCount = count - 1;
			setCount(newCount);
			updateCount({id: item.id, count: newCount});
		}
	};

	// useEffect(() => {
	// 	updateCount({id: item.id, count});
	// }, [count]);

	const renderIcon = count ? <Text fontSize="20px">{count}</Text> : <AddIcon />;

	return (
		<Box tabIndex={-1} onFocus={setFocus} onBlur={setBlur} className={classNames(classes.container, {[classes.focused]: focus })} >
			<HStack className={classes.upperContainer} >
				<VStack spacing={0}>
					{ currency === 'usd'
						? <Text fontSize="14px" color="#1A1A1A" fontWeight="bold">{`$${cost}`}</Text>
						: <SatoshiAmount>{`${cost}`}</SatoshiAmount>
					}
					<Text fontSize="10px" color="#1A1A1A" fontWeight="bold">per item</Text>
				</VStack>
				<VStack alignItems="flex-start" flex={1} spacing="0px">
					<Text fontSize="14px">{name}</Text>
					<Box className={classes.backer}>{ backers === 1 ? `${backers} backer` : `${backers} backers` }</Box>
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
