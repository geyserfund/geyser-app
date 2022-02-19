import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { Box } from '@chakra-ui/layout';
import ImageGallery from 'react-image-gallery';
import { createUseStyles } from 'react-jss';

import 'react-image-gallery/styles/css/image-gallery.css';
import { CloseButton } from '@chakra-ui/close-button';

const useStyles = createUseStyles({
	scrollContainer: {
		height: '100%',
		overflowX: 'auto',
		display: '-webkit-box',
	},
	imageContainer: {
		height: '100%',
		borderRadius: '10px',
		overflow: 'hidden',
		margin: '0px 10px',
		borderWidth: '1px',
		borderColor: 'rgba(0,0,0,0)',
		'&:hover': {
			borderColor: 'rgba(0,0,0,0.5)',
			cursor: 'pointer',
		},
	},
	galleryContainer: {
		marginTop: '0px !important',
		position: 'fixed',
		left: '0px',
		top: '0px',
		width: '100%',
		height: '100%',
		zIndex: '99',
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	gallery: {
		height: '100%',
		'& .image-gallery-content': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			height: '100% !important',
			'& .image-gallery-slide-wrapper': {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			},
			'& .image-gallery-image': {
				maxHeight: 'calc(100vh - 200px)',
				borderRadius: '10px',

			},
			'& .image-gallery-thumbnail-image': {
				height: '100px',
				objectFit: 'contain',
			},
			'& button.image-gallery-thumbnail': {
				width: 'auto',
			},
		},
	},
});

interface IImageBar {
	images: {
		thumbnail: string;
		original: string;
	}[]
	imageIndex?: number
}

export const ImageBar = ({images, imageIndex}:IImageBar) => {
	const classes = useStyles();

	const [viewGallery, setViewGallery] = useState(false);
	const [startIndex, setStartIndex] = useState(0);

	const handlePictureClick = (index: number) => {
		setStartIndex(index);
		setViewGallery(true);
	};

	const handleGalleryClose = () => {
		setStartIndex(0);
		setViewGallery(false);
	};

	useEffect(() => {
		if (imageIndex) {
			setStartIndex(imageIndex);
			setViewGallery(true);
		} else {
			setStartIndex(0);
		}
	}, [imageIndex]);

	return (
		<>
			<Box
				height="150px"
				width="100%"
				overflow="hidden"
			>
				<Box className={classes.scrollContainer}>
					{
						images.map((val, index) => (
							<Box
								key={index}
								className={classes.imageContainer}
								onClick={() => handlePictureClick(index)}
							>
								<Image height="100%" src={val.thumbnail} objectFit="contain" />
							</Box>
						))
					}
				</Box>

			</Box>
			{viewGallery && (
				<Box
					className={classes.galleryContainer}
				// OnClick={handleGalleryClose}
				>
					<CloseButton
						size="lg"
						position="absolute"
						top="10px"
						right="10px"
						onClick={handleGalleryClose}
						color="white"
						zIndex="100"
					/>
					<ImageGallery
						onClick={event => event.stopPropagation()}
						items={images}
						thumbnailPosition="bottom"
						additionalClass={classes.gallery}
						startIndex={startIndex}
						useBrowserFullscreen
						stopPropagation
					/>
				</Box>
			)}
		</>
	);
};
