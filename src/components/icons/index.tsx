import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { ImageProps } from '@chakra-ui/react'

import BoltSvg from '../../assets/bolt.svg'
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
  StarUrl,
  TrophyUrl,
} from '../../constants'

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
export * from './svg'
