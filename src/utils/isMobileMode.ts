import { useMediaQuery } from '@chakra-ui/media-query';

export const isMobileMode = () => {
	const [isLargerThan900] = useMediaQuery('(min-width: 900px)');

	return !isLargerThan900;
};

