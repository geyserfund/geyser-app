import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import StarPng from '../../assets/star.png';
import CrownPng from '../../assets/crown.png';
import LighteningPng from '../../assets/lightening.png';
import MagnifyPng from '../../assets/magnify.png';
import MedalPng from '../../assets/medal.png';
import TrophyPng from '../../assets/trophy.png';
import HourglassPng from '../../assets/hourglass.png';
import SatoshiPng from '../../assets/satoshi.png';

export const SatoshiIcon = ({ scale = 1, wrapperClass, ...rest }: any) => (
	<Box padding="3px 0px" className={wrapperClass}>
		<Image height={`${26 * scale}px`} width={`${14 * scale}px`} src={SatoshiPng} alt="satoshi" {...rest} />
	</Box>
);

export const StarIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={StarPng} alt="star" />
	</Box>
);

export const MagnifyGlassIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={MagnifyPng} alt="magnify glass" />
	</Box>
);

export const MedalIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={MedalPng} alt="medal" />
	</Box>
);

export const LighteningIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={LighteningPng} alt="lightening" />
	</Box>
);

export const TrophyIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={TrophyPng} alt="trophy" />
	</Box>
);

export const CrownIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={CrownPng} alt="crown" />
	</Box>
);

export const HourglassIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={HourglassPng} alt="hourglass" />
	</Box>
);
