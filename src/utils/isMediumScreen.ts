import { useMediaQuery } from '@chakra-ui/media-query';

export const isMediumScreen = () => {
	const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');

	return !isLargerThan1300;
};
