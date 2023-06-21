import { Box, BoxProps, Image, ImageProps } from '@chakra-ui/react'

import { ProjectEntryThumbnailPlaceholderUrl } from '../../constants'

export const DefaultImage = ({
  grey,
  ...rest
}: { grey?: boolean } & BoxProps & ImageProps) => {
  if (grey) {
    return (
      <Box height="100%" width="100%" backgroundColor="neutral.200" {...rest} />
    )
  }

  return (
    <Image
      src={ProjectEntryThumbnailPlaceholderUrl}
      maxHeight="500px"
      height="222px"
      width="350px"
      {...rest}
    />
  )
}
