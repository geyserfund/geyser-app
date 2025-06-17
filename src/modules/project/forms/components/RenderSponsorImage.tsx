import { Box, Image, Link, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'

type RenderSponsorImageProps = {
  url: string
  imageUrl: string
  imageUrlDark?: string
  height?: string
  backgroundColor?: string
  padding?: string
  alt?: string
}

export const RenderSponsorImage: FC<RenderSponsorImageProps> = ({
  url,
  imageUrl,
  imageUrlDark,
  height = '40px',
  backgroundColor,
  padding,
  alt,
}) => {
  const image = useColorModeValue(imageUrl, imageUrlDark || imageUrl)

  return (
    <Box backgroundColor={backgroundColor || 'utils.pbg'} borderRadius={'8px'} padding={padding} height={height}>
      <Link isExternal href={url}>
        <Image src={image} alt={alt || `${url} sponsor image`} height="100%" />
      </Link>
    </Box>
  )
}
