import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import LogoLight from '../../assets/logo-brand.svg';
import LogoDark from '../../assets/logo-dark.svg';
import LogoNameLight from '../../assets/logo-name-brand.svg';
import LogoNameDark from '../../assets/logo-name-dark.svg';
import { useColorMode } from '@chakra-ui/color-mode';
import { useMediaQuery } from '@chakra-ui/media-query';
import { HTMLChakraProps } from '@chakra-ui/system';
import { useHistory } from 'react-router';
import { createUseStyles } from 'react-jss';

interface ILogoP extends HTMLChakraProps<'div'> {
	className?: string;
	imageClassName?: string;
	full?: boolean;
}

const useStyles = createUseStyles({
	container: {
		'&:hover': {
			cursor: 'pointer',
		},
	},
});

export const Logo = ({ className, imageClassName, full, ...rest }: ILogoP) => {
	const classes = useStyles();
	const { colorMode } = useColorMode();
	const history = useHistory();
	const [isLargerThan720] = useMediaQuery('(min-width: 900px)');

	const useFullOne = isLargerThan720 || full;

	const imageToUse = colorMode === 'light' ? useFullOne ? LogoNameLight : LogoLight : useFullOne ? LogoNameDark : LogoDark;

	const handleClick = () => {
		history.push('/');
	};

	return (
		<Box className={`${classes.container} ${className}`} {...rest} onClick={handleClick}>
			<Image className={imageClassName} height="40px" src={imageToUse} alt="geyser logo image" objectFit="contain" />
		</Box>
	);
};
