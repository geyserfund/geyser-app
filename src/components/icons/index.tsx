import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { ImageProps } from '@chakra-ui/react'

import BoltSvg from '../../assets/bolt.svg'
import SatoshiTilted from '../../assets/satoshi-tilted.svg'
import SatoshiTiltedDash from '../../assets/satoshi-tilted-dash.svg'
import ShareSvg from '../../assets/share.svg'
import {
  CrownUrl,
  EnvelopeUrl,
  FountainLogoUrl,
  GiftUrl,
  HourglassUrl,
  LightningUrl,
  MagnifyUrl,
  MedalUrl,
  RopeUrl,
  SatoshiUrl,
  StarUrl,
  TrophyUrl,
} from '../../constants'

interface SatoshiIconProps extends ImageProps {
  scale?: number
  wrapperClass?: string
  isDark?: boolean
}

export const SatoshiIcon = ({
  scale = 1,
  wrapperClass,
  isDark,
  color,
  ...rest
}: SatoshiIconProps) => {
  const getFilter = () => {
    if (color === 'brand.primary') {
      return 'invert(76%) sepia(48%) saturate(708%) hue-rotate(109deg) brightness(96%) contrast(92%)'
    }

    if (isDark) {
      return 'invert(100%)'
    }

    return undefined
  }

  return (
    <Box padding="3px 0px" className={wrapperClass}>
      <Image
        filter={getFilter()}
        height={`${26 * scale}px`}
        minHeight={`${26 * scale}px`}
        width={`${14 * scale}px`}
        minWidth={`${14 * scale}px`}
        src={SatoshiUrl}
        alt="satoshi"
        {...rest}
      />
    </Box>
  )
}

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
      return 'invert(100%)'
    }

    switch (color) {
      case 'brand.primary':
        return 'invert(76%) sepia(48%) saturate(708%) hue-rotate(109deg) brightness(96%) contrast(92%)'
      case 'brand.primary600':
        return 'invert(50%) sepia(59%) saturate(5011%) hue-rotate(143deg) brightness(96%) contrast(98%)'
      case 'brand.primary800':
        return 'invert(31%) sepia(17%) saturate(2529%) hue-rotate(123deg) brightness(93%) contrast(102%)'
      default:
        return undefined
    }
  }

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
  )
}

export const StarIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={StarUrl} alt="star" {...props} />
  </Box>
)

export const MagnifyGlassIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={MagnifyUrl}
      alt="magnify glass"
      {...props}
    />
  </Box>
)

export const MedalIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={MedalUrl} alt="medal" {...props} />
  </Box>
)

export const LightningIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={LightningUrl}
      alt="lightning"
      {...props}
    />
  </Box>
)

export const TrophyIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={TrophyUrl} alt="trophy" {...props} />
  </Box>
)

export const CrownIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={CrownUrl} alt="crown" {...props} />
  </Box>
)

export const HourglassIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={HourglassUrl}
      alt="hourglass"
      {...props}
    />
  </Box>
)

export const GiftIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={GiftUrl} alt="gift" {...props} />
  </Box>
)

export const EnvelopeIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image
      height="20px"
      width="20px"
      src={EnvelopeUrl}
      alt="envelope"
      {...props}
    />
  </Box>
)

export const RopeIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={RopeUrl} alt="rope" {...props} />
  </Box>
)

export const BoltIcon = (props: ImageProps) => {
  const scale = props.scale as number

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
  )
}

export const ShareIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image src={ShareSvg} alt="share" {...props} />
  </Box>
)

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
)

export * from './CustomSvgIcons'
