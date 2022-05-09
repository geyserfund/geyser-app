import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	UnorderedList,
	ListItem,
	OrderedList,
	Box,
	HStack,
	Image,
	Text,
	VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Card, TwitterComponent } from '../../../components/ui';
import { IProjectUpdate } from '../../../interfaces';
import ReactMarkdown from 'react-markdown';
import { useStyles } from './styles';
import { getFormattedDate, isMobileMode } from '../../../utils';

interface IUpdatesBlock {
    projectUpdate: IProjectUpdate
	media: string[]
}

export const UpdatesBlock = ({projectUpdate, media}: IUpdatesBlock) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

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
							<Box key={image}>
								<Image src={image} />
							</Box>))
					}
				</HStack>
			);
		}
	};

	const renderParagraphList = (list: string[]) => (
		<>
			{
				list.map((block: string) => (
					<ReactMarkdown key={block} className={classes.texts} linkTarget="_blank">{block}</ReactMarkdown>
				))
			}
		</>
	);

	const renderUnorderedList = (list: string[]) => (
		<UnorderedList paddingLeft="18px">
			{
				list.map((block: string) => (
					<ListItem key={block} className={classes.texts}>
						<ReactMarkdown linkTarget="_blank">{block}</ReactMarkdown>
					</ListItem>
				))
			}
		</UnorderedList>
	);

	const renderOrderedList = (list: string[]) => (
		<OrderedList paddingLeft="18px">
			{
				list.map((block: string) => (
					<ListItem key={block} className={classes.texts}>
						<ReactMarkdown linkTarget="_blank">{block}</ReactMarkdown>
					</ListItem>
				))
			}
		</OrderedList>
	);

	const renderUpdateBody = () => {
		const { body, type, updateTitle, bodyTitle, images, tweet } = projectUpdate;
		const switchBlocks = () => {
			if (body && body.length > 0) {
				switch (type) {
					case 'PL':
						return renderParagraphList(body);
					case 'UL':
						return renderUnorderedList(body);
					case 'OL':
						return renderOrderedList(body);
					default:
						return null;
				}
			}
		};

		return (
			<VStack key={updateTitle} spacing="12px" alignItems="flex-start" textAlign="justify" width="100%">
				{bodyTitle && <Text fontSize="16px" fontWeight={500}>{bodyTitle}</Text>}
				{switchBlocks()}
				{renderImages(images)}
				{renderTweet(tweet)}
			</VStack>

		);
	};

	return (
		<Card className={classes.cardContainer}>
			<Accordion allowMultiple>
				<AccordionItem border="none">
					<h2>
						<AccordionButton >
							<Box flex="1" textAlign="left">
								<Text fontSize="12px" color="brand.textGrey">{projectUpdate.updateTitle}</Text>
								<Text fontSize="10px" color="brand.textGrey">{getFormattedDate(projectUpdate.date)}</Text>
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} display="flex" flexDirection="column" alignItems="center" width="100%">
						{renderUpdateBody()}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Card>

	);
};

