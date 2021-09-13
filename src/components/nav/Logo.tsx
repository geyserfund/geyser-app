import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import LogoLight from '../../assets/logo.png';
import LogoDark from '../../assets/logo-dark.png';
import LogoNameLight from '../../assets/logo-name.png';
import LogoNameDark from '../../assets/logo-name-dark.png';
import { useColorMode } from '@chakra-ui/color-mode';
import { useMediaQuery } from '@chakra-ui/media-query';

interface ILogoP {
	className?: string;
	imageClassName?: string;
}

export const Logo = ({className, imageClassName}: ILogoP) => {
	const { colorMode } = useColorMode();
	const [isLargerThan720] = useMediaQuery('(min-width: 720px)');

	const imageToUse = colorMode === 'light' ? isLargerThan720 ? LogoNameLight : LogoLight : isLargerThan720 ? LogoNameDark : LogoDark;

	return (
		<Box className={className}>
			<Image className={imageClassName} height="40px" src={imageToUse} alt="geyser logo image" objectFit="contain"/>
		</Box>
	);
};
