import { Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { getCountDown } from '../../../utils';

export const Countdown = ({ endDate }: { endDate: string }) => {
	const [countDown, setCountDown] = useState('');
	const handleCountDown = () => {
		const countDown = getCountDown(endDate);
		setCountDown(countDown);
	};

	useEffect(() => {
		const interval = setInterval(handleCountDown, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [endDate]);

	return (
		<Text>{`${countDown}`}</Text>
	);
};
