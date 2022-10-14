import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { ImageProps } from '@chakra-ui/react';
import StarPng from '../../assets/star.png';
import CrownPng from '../../assets/crown.png';
import LighteningPng from '../../assets/lightening.png';
import MagnifyPng from '../../assets/magnify.png';
import MedalPng from '../../assets/medal.png';
import TrophyPng from '../../assets/trophy.png';
import HourglassPng from '../../assets/hourglass.png';
import FountainPNG from '../../assets/fountain-logo-black-small.png';
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
        width={`${14 * scale}px`}
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
    if (color === 'brand.primary') {
      return 'invert(76%) sepia(48%) saturate(708%) hue-rotate(109deg) brightness(96%) contrast(92%)';
    }

    if (color === 'brand.primary800') {
      return 'invert(31%) sepia(17%) saturate(2529%) hue-rotate(123deg) brightness(93%) contrast(102%)';
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
        width={`${26 * scale}px`}
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
      src={LighteningPng}
      alt="lightening"
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
      src={FountainPNG}
      alt="Fountain Podcasts"
      {...props}
    />
  </Box>
);
