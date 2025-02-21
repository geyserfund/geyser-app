import { Box, Image, Link, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'

type RenderSponsorImageProps = {
  url: string
  imageUrl: string
  imageUrlDark?: string
  height?: string
  backgroundColor?: string
  padding?: string
}

export const RenderSponsorImage: FC<RenderSponsorImageProps> = ({
  url,
  imageUrl,
  imageUrlDark,
  height = '40px',
  backgroundColor,
  padding,
}) => {
  const image = useColorModeValue(imageUrl, imageUrlDark || imageUrl)

  return (
    <Box backgroundColor={backgroundColor || 'utils.pbg'} borderRadius={'8px'} padding={padding} height={height}>
      <Link isExternal href={url}>
        <Image src={image} height="100%" />
      </Link>
    </Box>
  )
}
