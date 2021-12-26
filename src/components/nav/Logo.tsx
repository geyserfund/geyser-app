import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import LogoLight from '../../assets/logo.png';
import LogoDark from '../../assets/logo-dark.png';
import LogoNameLight from '../../assets/logo-name.png';
import LogoNameDark from '../../assets/logo-name-dark.png';
import { useColorMode } from '@chakra-ui/color-mode';
import { useMediaQuery } from '@chakra-ui/media-query';
import { HTMLChakraProps } from '@chakra-ui/system';

interface ILogoP extends HTMLChakraProps<'div'> {
	className?: string;
	imageClassName?: string;
	full?: boolean;
}

export const Logo = ({ className, imageClassName, full, ...rest }: ILogoP) => {
	const { colorMode } = useColorMode();
	const [isLargerThan720] = useMediaQuery('(min-width: 900px)');

	const useFullOne = isLargerThan720 || full;

	const imageToUse = colorMode === 'light' ? useFullOne ? LogoNameLight : LogoLight : useFullOne ? LogoNameDark : LogoDark;

	return (
		<Box className={className} {...rest}>
			<Image className={imageClassName} height="40px" src={imageToUse} alt="geyser logo image" objectFit="contain" />
		</Box>
	);
};
