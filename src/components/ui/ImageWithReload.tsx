import { Box, Image, ImageProps, Skeleton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { ProjectEntryThumbnailPlaceholderUrl } from '../../constants'
import { useNotification } from '../../utils'

interface IImageWithReload extends ImageProps {
  noCacheId?: string
  defaultImage?: string
  grey?: boolean
  empty?: boolean
  showDefault?: boolean
  showError?: boolean
}

const MAX_RETRIES = 10
const BACKOFF = 1.2
const MILLISECONDS = 1_000

export const ImageWithReload = ({
  src,
  showError,
  defaultImage,
  grey,
  empty,
  noCacheId, // noCacheId allows us to prevent not retrying an image upload due to caching
  ...rest
}: IImageWithReload) => {
  const { toast } = useNotification()
  const componentRef = useRef<number>(0)

  const [hasValidSource, setHasValidSource] = useState(Boolean(src))
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    componentRef.current = 0
  }, [])

  useEffect(() => {
    setHasValidSource(Boolean(src))
  }, [noCacheId, src])

  const handleError = ({ currentTarget }: any) => {
    setLoading(true)

    if (
      componentRef.current !== null &&
      componentRef.current !== undefined &&
      componentRef.current < MAX_RETRIES
    ) {
      setTimeout(() => {
        currentTarget.onerror = null
        currentTarget.src = src
        componentRef.current += 1
      }, BACKOFF ** componentRef.current * MILLISECONDS)
    } else {
      setLoading(false)
      setHasValidSource(false)
      componentRef.current = 0
      if (showError) {
        toast({
          title: 'failed to load image',
          description: 'Please try again',
          status: 'error',
        })
      }
    }
  }

  const handleLoad = () => {
    componentRef.current = 0
    setLoading(false)
    setHasValidSource(true)
  }

  const renderDefaultImage = () => {
    if (grey) {
      return (
        <Box
          height="100%"
          width="100%"
          backgroundColor="neutral.200"
          {...rest}
        ></Box>
      )
    }

    return (
      <Image
        src={defaultImage || ProjectEntryThumbnailPlaceholderUrl}
        maxHeight="500px"
        height="222px"
        width="350px"
        {...rest}
      />
    )
  }

  const renderSkeletonImage = () => {
    return (
      <>
        <Skeleton
          height={'300px'}
          width={'500px'}
          maxHeight={'500px'}
          {...rest}
        />
      </>
    )
  }

  const renderSourceImage = () => {
    return (
      <Image
        display={loading || !hasValidSource ? 'none' : undefined}
        src={src}
        maxHeight="500px"
        objectFit="cover"
        onError={handleError}
        onLoad={handleLoad}
        {...rest}
      />
    )
  }

  if (empty && !hasValidSource) {
    return null
  }

  return (
    <>
      {hasValidSource ? loading && renderSkeletonImage() : renderDefaultImage()}
      {hasValidSource && renderSourceImage()}
    </>
  )
}
