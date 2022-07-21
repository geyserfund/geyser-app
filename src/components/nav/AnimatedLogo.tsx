import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { HStack } from '@chakra-ui/layout';
import { isMobileMode } from '../../utils';
import { useHistory } from 'react-router';
import LogoSecondHalf from '../../assets/logo-second-half.svg';
import LogoFirstLetter from '../../assets/logo-dark.svg';

export const AnimatedLogo = () => {
	const [fadeOut, setFadeOut] = useState(false);
	const history = useHistory();
	const isMobile = isMobileMode();

	const handleClick = () => {
		history.push('/');
	};

	useEffect(() => {
		setTimeout(() => {
			setFadeOut(true);
		}, 0);
	}, []);

	return (
		<HStack spacing="0px" mr={isMobile ? 0 : 5}>
			<Image src={LogoFirstLetter} alt="geyser logo" onClick={handleClick} height="40px" cursor="pointer" objectFit="contain" />
			<Image src={LogoSecondHalf} alt="geyser logo" opacity={fadeOut ? 0 : 1} alignSelf="end" height="28px" transition="opacity 3s ease-in-out" objectFit="contain" />
		</HStack>
	);
};
