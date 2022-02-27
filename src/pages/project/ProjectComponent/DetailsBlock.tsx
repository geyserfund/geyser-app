import {
	Box,
	HStack,
	Image,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card, ImageBar, StatusBar } from '../../../components/ui';
import { IProjectBlock, IProjectDetail } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import ReactMarkdown from 'react-markdown';

type Labels = string

interface Istyles {
	isMobile?: boolean
}

const useStyles = createUseStyles<Labels, Istyles>({
	containers: {
		spacing: '5px',
		alignItems: 'flex-start',
		display: 'flex',
		width: '100%',
		'& img': {
			borderRadius: '5px',
		},
		'& a': {
			color: 'grey',
		},
	},
	texts: {
		textAlign: 'justify',
	},
	readmore: {
		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},
	cardContainer: ({ isMobile }: Istyles) => ({
		borderRadius: '6px',
		padding: isMobile ? '12px 10px' : '12px 20px',
		border: '2px solid #E9E9E9',
		background: 'white',
		height: 'fit-content',
	}),
});

interface IDetailsBlock {
    images: any
    projectDetails: IProjectDetail
}

export const DetailsBlock = ({images, projectDetails}: IDetailsBlock) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	const [imageIndex] = useState(0);

	const {blocks} = projectDetails;

	const renderImages = (images?: string[]) => {
		if (images && images.length > 0) {
			return (
				<HStack spacing="30px" overflowX="auto">
					{
						images.map((image: string) => (
							<Box key={image}>
								<Image src={image} />
							</Box>))
					}
				</HStack>
			);
		}
	};

	const renderParagraphList = (block: IProjectBlock) => (
		<VStack key={block.title} className={classes.containers} >
			<Text fontWeight={600} fontSize={'1.25em'}>{block.title}</Text>
			{
				block.body.map((block: string, index: number) => (
					<Text key={index} className={classes.texts}>
						<ReactMarkdown linkTarget="_blank">{block}</ReactMarkdown>
					</Text>
				))
			}{
				renderImages(block.images)
			}
		</VStack>
	);

	const renderUnorderedList = (block: IProjectBlock) => (
		<VStack key={block.title} className={classes.containers} >
			<Text fontWeight={600} fontSize={'1.25em'}>{block.title}</Text>
			<UnorderedList paddingLeft="18px">
				{
					block.body.map((block: string, index: number) => (
						<ListItem key={index} className={classes.texts}>
							<ReactMarkdown linkTarget="_blank">{block}</ReactMarkdown>
						</ListItem>
					))
				}
			</UnorderedList>
			{
				renderImages(block.images)
			}
		</VStack>
	);

	const renderOrderedList = (block: IProjectBlock) => (
		<VStack key={block.title} className={classes.containers} >
			<Text fontWeight={600} fontSize={'1.25em'}>{block.title}</Text>
			<OrderedList paddingLeft="18px">
				{
					block.body.map((block: string, index: number) => (
						<ListItem key={index} className={classes.texts}>
							<ReactMarkdown linkTarget="_blank">{block}</ReactMarkdown>
						</ListItem>
					))
				}
			</OrderedList>
			{
				renderImages(block.images)
			}
		</VStack>
	);

	const renderBlocks = () => blocks.map((block: IProjectBlock) => {
		switch (block.blockType) {
			case 'PL':
				return renderParagraphList(block);
			case 'UL':
				return renderUnorderedList(block);
			case 'OL':
				return renderOrderedList(block);
			default:
				return null;
		}
	});

	return (
		<Card className={classes.cardContainer}>
			<VStack className={classes.containers} spacing="20px">
				<VStack spacing="10px">
					<StatusBar variant="problem" message="Financial illiteracy among the youth in Nigeria, a country ravaged by double-digit inflation." />
					<StatusBar variant="solution" message="Teaching financial literacy to the youths of Nigeria with Bitcoin and lightning." />
					<ImageBar images={images} imageIndex={imageIndex}/>
				</VStack>
				{
					renderBlocks()
				}
				{/* <VStack className={classes.containers}>
					<Text fontWeight={600} fontSize={'1.25em'}>
								Who am I?
					</Text>
					<Text className={classes.texts}>
								I’m Apata Johnson. I’m a visionary, a dedicated entrepreneur, who loves technology. As a thinker, and someone who cherish technology I can say that Bitcoin is the next big thing, I have hope that with Bitcoin we change the way we view money in Nigeria and the world as a whole. And how, with Bitcoin, Nigeria will transform from an underdeveloped nation to a super developed nation. I’m just a freedom lover and I feel Nigeria needs bitcoin.
					</Text>
					<Text className={classes.texts}>
								I created Luminus Exchange to help educate Nigerians about Bitcoin. Read more about me and my work here:
						<Link href="https://drive.google.com/file/d/1IK80L-hNlh0RpSJCWQQFu3jG9r2W2U1C/view" isExternal>
							{' About Bitcoin'}
						</Link>
					</Text>
				</VStack>
				<VStack className={classes.containers}>
					<Box minWidth="280px" maxWidth={'400px'} onClick={() => setImageIndex(4)}>
						<Image src={images[4].original} />
					</Box>
				</VStack> */}
			</VStack>
		</Card>
	);
};
