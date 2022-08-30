import { Image, ImageProps, Skeleton } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GeyserSkeletonUrl } from '../../constants';

interface IImageWithReload extends ImageProps{

}

const RETRY_COUNT = 5;
const RETRY_DELAY = 1000;

export const ImageWithReload = ({src, ...rest}: IImageWithReload) => {
	const componentRef = useRef<number>();
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		componentRef.current = RETRY_COUNT;
	}, []);

	const handleError = useCallback(({ currentTarget }) => {
		setError(true);
		if (componentRef && componentRef.current && componentRef.current > 0) {
			setTimeout(() => {
				currentTarget.onerror = null;
				currentTarget.src = src;
				componentRef.current
			= componentRef && componentRef.current && componentRef.current - 1;
			}, RETRY_DELAY);
		}
	}, []);

	const handleLoad = useCallback(() => {
		setError(false);
	}, []);

	return (
		<>
			{
				error && <Skeleton height={rest.height || '300px'} width={rest.width || '500px'}/>
			}
			<Image
				display={error ? 'none' : undefined}
				src={src}
				maxHeight="500px"
				onError={handleError}
				onLoad={handleLoad}
				{...rest}
			/>
		</>

	);
};
