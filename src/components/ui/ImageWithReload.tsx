import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNotification } from '../../utils';
import GeyserTempImage from '../../assets/images/project-entry-thumbnail-placeholder.svg';

interface IImageWithReload extends ImageProps {
  noCacheId?: string;
}

const MAX_RETRIES = 5;
const BACKOFF = 1.2;
const MILLISECONDS = 1_000;

export const ImageWithReload = ({
  src,
  noCacheId, // noCacheId allows us to prevent not retrying an image upload due to caching
  ...rest
}: IImageWithReload) => {
  const { toast } = useNotification();
  const componentRef = useRef<number>();

  const [hasValidSource, setHasValidSource] = useState(Boolean(src));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    componentRef.current = 0;
  }, []);

  useEffect(() => {
    setHasValidSource(Boolean(src));
  }, [noCacheId]);

  const handleError = ({ currentTarget }: any) => {
    setLoading(true);

    if (
      componentRef.current !== null &&
      componentRef.current !== undefined &&
      componentRef.current < MAX_RETRIES
    ) {
      setTimeout(() => {
        currentTarget.onerror = null;
        currentTarget.src = src;
        componentRef.current! += 1;
      }, BACKOFF ** componentRef.current * MILLISECONDS);
    } else {
      setLoading(false);
      setHasValidSource(false);
      componentRef.current = 0;
      toast({
        title: 'failed to upload image',
        description: 'Please try again',
        status: 'error',
      });
    }
  };

  const handleLoad = () => {
    componentRef.current = 0;
    setLoading(false);
    setHasValidSource(true);
  };

  const renderDefaultImage = () => {
    return (
      <Image
        src={GeyserTempImage}
        maxHeight="500px"
        height="222px"
        width="350px"
      />
    );
  };

  const renderSkeletonImage = () => {
    return (
      <>
        <Skeleton
          height={rest.height || '300px'}
          width={rest.width || '500px'}
          maxHeight={rest.maxHeight || '500px'}
        />
      </>
    );
  };

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
    );
  };

  return (
    <>
      {!hasValidSource && renderDefaultImage()}
      {loading && renderSkeletonImage()}
      {renderSourceImage()}
    </>
  );
};
