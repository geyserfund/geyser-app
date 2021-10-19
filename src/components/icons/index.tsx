import Icon, { IconProps } from '@chakra-ui/icon';
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

export const SatoshiIcon = ({ fontSize, ...rest }: IconProps) => (
	<Icon fontSize={fontSize || '25px'} {...rest}>
		<text x="0" y="22" fill="black" fontSize={'25px'}>丰</text>
	</Icon>
);

export const StarIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={StarPng} alt="star icon" />
	</Box>
);

export const MagnifyGlassIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={MagnifyPng} alt="star icon" />
	</Box>
);

export const MedalIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={MedalPng} alt="star icon" />
	</Box>
);

export const LighteningIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={LighteningPng} alt="star icon" />
	</Box>
);

export const TrophyIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={TrophyPng} alt="star icon" />
	</Box>
);

export const CrownIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={CrownPng} alt="star icon" />
	</Box>
);

export const HourglassIcon = () => (
	<Box padding="3px 0px">
		<Image height="20px" width="20px" src={HourglassPng} alt="star icon" />
	</Box>
);
