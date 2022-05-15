import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	HStack,
	Image,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Card, TwitterComponent } from '../../../components/ui';
import { IProjectBlock, IProjectDetail } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import ReactMarkdown from 'react-markdown';
import { useStyles } from './styles';
import { YoutubeEmbed } from '../../../components/molecules/YoutubeEmbed';

interface IDetailsBlock {
    projectDetails: IProjectDetail
	media: string[]
}

export const DetailsBlock = ({ projectDetails, media}: IDetailsBlock) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	const {blocks} = projectDetails;

	const renderTweet = (tweet ?: string) => {
		if (tweet) {
			return (
				<Box width="100%" display="flex" justifyContent="center">
					<TwitterComponent id={tweet}/>
				</Box>
			);
		}
	};

	const renderImages = (imageIndex?: number[]) => {
		if (imageIndex && imageIndex.length > 0) {
			const images = imageIndex.map((val: number) => media[val]);
			return (
				<HStack spacing="30px" overflowX="auto">
					{
						images.map((image: string) => (
							<Box key={image} maxWidth="400px">
								<Image src={image} />
							</Box>))
					}
				</HStack>
			);
		}
	};

	const renderYoutube = (videoId ?: string) => {
		if (videoId) {
			return (
				<Box width="100%" display="flex" justifyContent="center">
					<YoutubeEmbed videoId={videoId}/>
				</Box>
			);
		}
	};

	const renderParagraphList = (block: IProjectBlock) => {
		if (block.body && block.body.length > 0) {
			return block.body.map((body: string) => (
				<Box key={body} id={block.key}>
					<ReactMarkdown className={classes.texts} linkTarget="_blank">{body}</ReactMarkdown>
				</Box>

			));
		}

		return null;
	};

	const renderUnorderedList = (block: IProjectBlock) => (
		<UnorderedList paddingLeft="18px">
			{
				block.body.map((body: string) => (
					<ListItem key={body} className={classes.texts}>
						<ReactMarkdown linkTarget="_blank">{body}</ReactMarkdown>
					</ListItem>
				))
			}
		</UnorderedList>
	);

	const renderOrderedList = (block: IProjectBlock) => (
		<OrderedList paddingLeft="18px">
			{
				block.body.map((body: string) => (
					<ListItem key={body} className={classes.texts}>
						<ReactMarkdown linkTarget="_blank">{body}</ReactMarkdown>
					</ListItem>
				))
			}
		</OrderedList>
	);

	const renderBlocks = () => blocks.map((block: IProjectBlock) => {
		const switchBlocks = () => {
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
		};

		return (
			<VStack key={block.title} className={classes.containers} space={10}>
				<Text fontWeight={600} fontSize={'1.25em'}>{block.title}</Text>
				{ switchBlocks() }
				{ renderImages(block.images) }
				{renderTweet(block.tweet) }
				{renderYoutube(block.youtube)}
			</VStack>

		);
	});

	return (
		<Card className={classes.cardContainer}>
			<Accordion allowMultiple defaultIndex={0} allowToggle>
				<AccordionItem border="none">
					<h2>
						<AccordionButton >
							<Box flex="1" textAlign="left">
								<Text fontSize="12px" color="brand.textGrey">DESCRIPTION</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} width="100%">
						<VStack alignItems="center" width="100%" spacing="15px">
							{renderBlocks()}
						</VStack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Card>
		// <Card className={classes.cardContainer}>
		// 	<VStack className={classes.containers} spacing="20px">
		// 		{
		// 			renderBlocks()
		// 		}
		// 	</VStack>
		// </Card>
	);
};
