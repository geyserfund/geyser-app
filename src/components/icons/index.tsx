import { Image } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { ImageProps } from '@chakra-ui/react'

import { CrownUrl, FountainLogoUrl, MedalUrl, StarUrl, TrophyUrl } from '../../shared/constants'

export const StarIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={StarUrl} alt="star" {...props} />
  </Box>
)

export const MedalIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={MedalUrl} alt="medal" {...props} />
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

export const FountainIcon = (props: ImageProps) => (
  <Box padding="3px 0px">
    <Image height="20px" width="20px" src={FountainLogoUrl} alt="Fountain Podcasts" {...props} />
  </Box>
)

export * from './CustomSvgIcons'
export * from './svg'
