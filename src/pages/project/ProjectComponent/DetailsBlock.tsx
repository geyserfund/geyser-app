import {
	Box,
	HStack,
	Image,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	VStack,
	Link,
} from '@chakra-ui/react';
import React from 'react';
import { TwitterComponent } from '../../../components/ui';
import { IProjectBlock, IProjectDetail } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import ReactMarkdown from 'react-markdown';
import { useStyles } from './styles';
import { YoutubeEmbed } from '../../../components/molecules/YoutubeEmbed';
interface IDetailsBlock {
	projectDetails: IProjectDetail
	media: string[]
}

export const DetailsBlock = ({ projectDetails, media }: IDetailsBlock) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	const { blocks } = projectDetails;

	const renderVimeoIFrame = (id?: string) => {
		if (id) {
			return (<Box width="100%" mt={10}>
				<iframe title="vimeo-player" src={`https://player.vimeo.com/video/${id}`} width="640" height="360"></iframe>
			</Box>);
		}
	};

	const renderTweet = (tweet?: string) => {
		if (tweet) {
			return (
				<Box width="100%" display="flex" justifyContent="center" justifyItems="center">
					<TwitterComponent id={tweet} />
				</Box>
			);
		}
	};

	const renderImages = (imageIndex?: number[]) => {
		if (imageIndex && imageIndex.length > 0) {
			const images = imageIndex.map((val: number) => media[val]);
			return (
				<HStack spacing="30px" overflowX="auto" w="100%">
					{
						images.map((image: string) => (
							<Box key={image} w="100%">
								<Image src={image} maxHeight="500px" />
							</Box>))
					}
				</HStack>
			);
		}
	};

	const renderYoutube = (videoId?: string) => {
		if (videoId) {
			return (
				<Box width="100%" display="flex" justifyContent="center">
					<YoutubeEmbed videoId={videoId} />
				</Box>
			);
		}
	};

	const renderLink = (block: IProjectBlock) => {
		if (block.link && block.link.length > 0) {
			return block.link.map((link: string) => (
				<Link isExternal href={link} key={Math.random()} fontWeight="bold">{link}</Link>
			));
		}

		return null;
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
				case 'LI':
					return renderLink(block);
				default:
					return null;
			}
		};

		return (
			<VStack key={block.title} className={classes.containers} space={10}>
				<Text fontWeight="bold" fontSize={'24px'}>{block.title}</Text>
				{switchBlocks()}
				{renderImages(block.images)}
				{renderTweet(block.tweet)}
				{renderYoutube(block.youtube)}
				{renderVimeoIFrame(block.vimeo)}
			</VStack>

		);
	});

	return (
		<VStack pb={4} alignItems="center" width="100%" spacing="15px">
			{renderBlocks()}
		</VStack>
	);
};
