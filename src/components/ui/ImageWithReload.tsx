import { Box, Image, ImageProps, Skeleton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import GeyserTempImage from '../../assets/images/project-entry-thumbnail-placeholder.svg'
import { useNotification } from '../../utils'

interface IImageWithReload extends ImageProps {
  noCacheId?: string
  defaultImage?: string
  grey?: boolean
}

const MAX_RETRIES = 10
const BACKOFF = 1.2
const MILLISECONDS = 1_000

export const ImageWithReload = ({
  src,
  defaultImage,
  grey,
  noCacheId, // noCacheId allows us to prevent not retrying an image upload due to caching
  ...rest
}: IImageWithReload) => {
  const { toast } = useNotification()
  const componentRef = useRef<number>()

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
        componentRef.current! += 1
      }, BACKOFF ** componentRef.current * MILLISECONDS)
    } else {
      setLoading(false)
      setHasValidSource(false)
      componentRef.current = 0
      toast({
        title: 'failed to load image',
        description: 'Please try again',
        status: 'error',
      })
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
          backgroundColor="brand.neutral200"
        ></Box>
      )
    }

    return (
      <Image
        src={defaultImage || GeyserTempImage}
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
          height={rest.height || '300px'}
          width={rest.width || '500px'}
          maxHeight={rest.maxHeight || '500px'}
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

  return (
    <>
      {hasValidSource ? loading && renderSkeletonImage() : renderDefaultImage()}
      {hasValidSource && renderSourceImage()}
    </>
  )
}
