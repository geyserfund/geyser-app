import { Image, ImageProps, Skeleton } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useRef, useState } from 'react'

import { useNotification } from '../../../utils'
import { DefaultImage } from './DefaultImage'

interface IImageWithReload extends Omit<ImageProps, 'src'> {
  src?: string | null
  noCacheId?: string
  defaultImage?: string
  empty?: boolean
  showDefault?: boolean
  showError?: boolean
}

const MAX_RETRIES = 5
const BACKOFF = 1.2
const MILLISECONDS = 1_000

export const ImageWithReload = ({ src = '', showError, defaultImage, empty, ...rest }: IImageWithReload) => {
  const { toast } = useNotification()
  const componentRef = useRef<number>(0)

  const hasValidSource = Boolean(src)
  const [loading, setLoading] = useState<boolean>(true)
  const [failedLoading, setFailedLoading] = useState<boolean>(false)

  useEffect(() => {
    componentRef.current = 0
  }, [])

  const handleError = ({ currentTarget }: any) => {
    setLoading(true)

    if (componentRef.current !== null && componentRef.current !== undefined && componentRef.current < MAX_RETRIES) {
      setTimeout(() => {
        currentTarget.onerror = null
        currentTarget.src = src
        componentRef.current += 1
      }, BACKOFF ** componentRef.current * MILLISECONDS)
    } else {
      setLoading(false)
      setFailedLoading(true)
      componentRef.current = 0
      if (showError) {
        toast({
          title: t('Failed to load image'),
          description: t('Please try again'),
          status: 'error',
        })
      }
    }
  }

  const handleLoad = () => {
    componentRef.current = 0
    setLoading(false)
  }

  const renderSkeletonImage = () => {
    return (
      <>
        <Skeleton height={{ base: '150px', lg: '350px' }} width={'500px'} maxHeight={'500px'} {...rest} />
      </>
    )
  }

  const renderSourceImage = () => {
    if (failedLoading) {
      return <DefaultImage grey {...rest} />
    }

    return (
      <Image
        display={loading || !hasValidSource ? 'none' : undefined}
        src={src || ''}
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
      {hasValidSource ? loading && renderSkeletonImage() : <DefaultImage grey {...rest} />}
      {hasValidSource && renderSourceImage()}
    </>
  )
}
