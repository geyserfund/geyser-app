import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { Icon, IconProps, ImageProps } from '@chakra-ui/react';
import StarPng from '../../assets/star.png';
import CrownPng from '../../assets/crown.png';
import LightningPng from '../../assets/lightning.png';
import MagnifyPng from '../../assets/magnify.png';
import MedalPng from '../../assets/medal.png';
import TrophyPng from '../../assets/trophy.png';
import HourglassPng from '../../assets/hourglass.png';
import GiftPng from '../../assets/gift.png';
import GifSvg from '../../assets/gif.svg';
import EnvelopePng from '../../assets/envelope.png';
import RopePng from '../../assets/rope.png';
import InfoSvg from '../../assets/i.svg';
import SatoshiPng from '../../assets/satoshi.png';
import SatoshiTilted from '../../assets/satoshi-tilted.svg';
import SatoshiTiltedDash from '../../assets/satoshi-tilted-dash.svg';
import QrSvg from '../../assets/qr.svg';
import BoltSvg from '../../assets/bolt.svg';
import ShareSvg from '../../assets/share.svg';
import AmbossSVG from '../../assets/amboss-short.svg';
import { FountainLogoUrl } from '../../constants';

export const SatoshiIcon = ({
  scale = 1,
  wrapperClass,
  isDark,
  color,
  ...rest
}: any) => {
  const getFilter = () => {
    if (color === 'brand.primary') {
      return 'invert(76%) sepia(48%) saturate(708%) hue-rotate(109deg) brightness(96%) contrast(92%)';
    }

    if (isDark) {
      return 'invert(100%)';
    }

    return undefined;
  };

  return (
    <Box padding="3px 0px" className={wrapperClass}>
      <Image
        filter={getFilter()}
        height={`${26 * scale}px`}
        minHeight={`${26 * scale}px`}
        width={`${14 * scale}px`}
        minWidth={`${14 * scale}px`}
        src={SatoshiPng}
        alt="satoshi"
        {...rest}
      />
    </Box>
  );
};

export const SatoshiIconTilted = ({
  scale = 1,
  wrapperClass,
  isDark,
  color,
  dash,
  ...rest
}: any) => {
  const getFilter = () => {
    if (isDark) {
      return 'invert(100%)';
    }

    switch (color) {
      case 'brand.primary':
        return 'invert(76%) sepia(48%) saturate(708%) hue-rotate(109deg) brightness(96%) contrast(92%)';
      case 'brand.primary600':
        return 'invert(50%) sepia(59%) saturate(5011%) hue-rotate(143deg) brightness(96%) contrast(98%)';
      case 'brand.primary800':
        return 'invert(31%) sepia(17%) saturate(2529%) hue-rotate(123deg) brightness(93%) contrast(102%)';
      default:
        return undefined;
    }
  };

  return (
    <Box padding="3px 0px" className={wrapperClass}>
      <Image
        filter={getFilter()}
        height={`${26 * scale}px`}
        minHeight={`${26 * scale}px`}
        width={`${26 * scale}px`}
        minWidth={`${26 * scale}px`}
        src={dash ? SatoshiTiltedDash : SatoshiTilted}
        alt="satoshi"
        {...rest}
      />
    </Box>
  );
};

export const StarIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={StarPng} alt="star" {...props} />
  </Box>
);

export const MagnifyGlassIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={MagnifyPng}
      alt="magnify glass"
      {...props}
    />
  </Box>
);

export const MedalIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={MedalPng} alt="medal" {...props} />
  </Box>
);

export const LightningIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={LightningPng}
      alt="lightning"
      {...props}
    />
  </Box>
);

export const TrophyIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={TrophyPng} alt="trophy" {...props} />
  </Box>
);

export const CrownIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={CrownPng} alt="crown" {...props} />
  </Box>
);

export const HourglassIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={HourglassPng}
      alt="hourglass"
      {...props}
    />
  </Box>
);

export const GiftIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={GiftPng} alt="gift" {...props} />
  </Box>
);

export const GifIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={GifSvg} alt="gif" {...props} />
  </Box>
);

export const EnvelopeIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={EnvelopePng}
      alt="envelope"
      {...props}
    />
  </Box>
);

export const RopeIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={RopePng} alt="rope" {...props} />
  </Box>
);

export const InfoIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="12px" width="12px" src={InfoSvg} alt="info" {...props} />
  </Box>
);

export const QrIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={QrSvg} alt="qr" {...props} />
  </Box>
);

export const BoltIcon = (props: ImageProps) => {
  const scale = props.scale as number;

  return (
    <Box padding="3px 0px">
      <Image
        height={scale ? (scale * 20).toString() + 'px' : '20px'}
        width={scale ? (scale * 20).toString() + 'px' : '20px'}
        src={BoltSvg}
        alt="bolt"
        {...props}
      />
    </Box>
  );
};

export const ShareIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image src={ShareSvg} alt="share" {...props} />
  </Box>
);

export const FountainIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={FountainLogoUrl}
      alt="Fountain Podcasts"
      {...props}
    />
  </Box>
);

export const AmbossIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={AmbossSVG} alt="Amboss" {...props} />
  </Box>
);

export const DescriptionIcon = (props: IconProps) => {
  return (
    <Icon width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
      <path
        d="M23.2083 5H5.79167C5.35444 5 5 5.44772 5 6V24C5 24.5523 5.35444 25 5.79167 25H23.2083C23.6456 25 24 24.5523 24 24V6C24 5.44772 23.6456 5 23.2083 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35352 11H19.6452"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35352 15H19.6452"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.35352 19H19.6452"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export const LeaderBoardIcon = (props: IconProps) => {
  return (
    <Icon width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
      <path
        d="M7.14062 6.82594V12.5146C7.14062 16.6134 10.4237 20.0101 14.5225 20.041C15.503 20.0478 16.4752 19.8606 17.383 19.4901C18.2909 19.1196 19.1164 18.5731 19.8122 17.8821C20.5079 17.1912 21.0601 16.3694 21.4369 15.4642C21.8136 14.5589 22.0076 13.5881 22.0076 12.6075V6.82594C22.0076 6.60689 21.9206 6.39681 21.7657 6.24191C21.6108 6.08702 21.4007 6 21.1817 6H7.96657C7.74751 6 7.53743 6.08702 7.38254 6.24191C7.22764 6.39681 7.14062 6.60689 7.14062 6.82594Z"
        stroke="currentColor"
        strokeWidth="1.76201"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2695 24.1699H17.8771"
        stroke="currentColor"
        strokeWidth="1.76201"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5742 20.041V24.1707"
        stroke="currentColor"
        strokeWidth="1.76201"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.8203 14.2601H22.8321C23.7083 14.2601 24.5486 13.912 25.1682 13.2925C25.7878 12.6729 26.1359 11.8326 26.1359 10.9563V9.30446C26.1359 9.0854 26.0488 8.87532 25.894 8.72043C25.7391 8.56553 25.529 8.47852 25.3099 8.47852H22.0061"
        stroke="currentColor"
        strokeWidth="1.76201"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.34652 14.2601H6.30377C5.42756 14.2601 4.58723 13.912 3.96765 13.2925C3.34807 12.6729 3 11.8326 3 10.9563V9.30446C3 9.0854 3.08702 8.87532 3.24191 8.72043C3.39681 8.56553 3.60689 8.47852 3.82594 8.47852H7.12971"
        stroke="currentColor"
        strokeWidth="1.76201"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
