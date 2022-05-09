import { AddIcon } from '@chakra-ui/icons';
import { Avatar, Box, HStack, IconButton, Link, Text, useDisclosure, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { AddAmbassador, AddSponsor } from '../../../components/molecules';
import { Card, ImageBar, StatusBar, InfoTooltip } from '../../../components/ui';
import { ISponsor, IParticipant } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { useStyles } from './styles';

interface IOwnerSponsorCard {
    owner: IParticipant
    ambassadors: IParticipant[]
    sponsors: ISponsor[]
    ownerIntro: string
	problem: string
    idea: string
	images: string[]
}

export const OwnerSponsorCard = ({owner, ambassadors, sponsors, ownerIntro, images, problem, idea}: IOwnerSponsorCard) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	const {isOpen: ambassadorOpen, onOpen: onAmbassadorOpen, onClose: onAmbassadorClose} = useDisclosure();
	const {isOpen: sponsorOpen, onOpen: onSponsorOpen, onClose: onSponsorClose} = useDisclosure();

	const handleScroll = () => {
		const element = document.getElementById('aboutMe');

		if (element) {
			const scrollElement = document.getElementById('project-scoll-container');
			if (scrollElement) {
				const scrollValue = element.offsetTop - scrollElement.offsetTop;
				scrollElement?.scrollTo({ top: scrollValue, behavior: 'smooth' });
			}
		}
	};

	return (
		<>
			<Card className={classes.cardContainer}>
				<VStack spacing="15px" alignItems="flex-start">
					<VStack spacing="10px" >
						<ImageBar images={images} />
						{ problem && <StatusBar variant="problem" message={problem} />}
						<StatusBar variant="idea" message={idea} />
					</VStack>
					<Box>
						<HStack>
							<Text fontSize="10px" color="brand.textGrey">CREATOR</Text>
							<InfoTooltip
								title="Owner"
								description="Project creators have verified their Twitter accounts. Go check them out!"
								options={ { top: '-82px', left: '-80px' } }
							/>
						</HStack>
						<HStack spacing="30px" alignItems="flex-start">
							<Link href={`https://twitter.com/${owner.user.twitterHandle}`} isExternal>
								<Avatar width="75px" height="75px" name={owner.user.username} src={owner.user.imageUrl} />
							</Link>
							<VStack justifyContent="space-between" alignItems="flex-start">
								<Link href={`https://twitter.com/${owner.user.twitterHandle}`} isExternal>
									<Text fontSize="18px">
										{owner.user.username}
									</Text>
								</Link>
								<Text fontSize="12px" >
									{isMobile ? ownerIntro.slice(0, 84) : ownerIntro.slice(0, 180) }
									<span className={classes.readmore} onClick={handleScroll}>...read more</span>
								</Text>
							</VStack>
						</HStack>
					</Box>
					<VStack spacing="10px" alignItems="flex-start" >
						<HStack>
							<Text fontSize="10px" color="brand.textGrey">AMBASSADORS</Text>
							<InfoTooltip
								title="Ambassadors"
								description="Ambassadors are individuals who vouch for the project and give their go ahead."
								options={ { top: '-81px', left: '-80px' } }
							/>
						</HStack>
						<Wrap>
							{
								ambassadors.map((ambassador: IParticipant) => (
									ambassador.confirmed
										? <WrapItem key={ambassador.user.username} display="inline-block">
											<Link href={`https://twitter.com/${ambassador.user.twitterHandle}`} isExternal >
												<HStack className={classes.amabassadorBlock} spacing="5px">
													<Avatar
														width="24px" height="24px"
														name={ambassador.user.twitterHandle} src={ambassador.user.imageUrl}
													/>
													<Text fontSize="14px" >
														{`${ambassador.user.twitterHandle}`}
													</Text>
												</HStack>
											</Link>
										</WrapItem>
										: <></>
								))
							}
							<WrapItem>
								<IconButton aria-label="add-ambassador" icon={<AddIcon />} onClick={onAmbassadorOpen} />
							</WrapItem>
						</Wrap>

					</VStack>
					<VStack spacing="10px" alignItems="flex-start">
						<HStack>
							<Text fontSize="10px" color="brand.textGrey">SPONSORS</Text>
							<InfoTooltip
								title="Sponsors"
								description="Sponsors pledge an amount set by the creator in order to support the project. In turn they may be featured in different ways based on creator preferences."
								options={ { top: '-108px', left: isMobile ? '-50px' : '-80px' } }
							/>
						</HStack>
						<Wrap >
							{
								sponsors.map((sponsor: ISponsor) => (
									sponsor.confirmed
										? <WrapItem key={sponsor.id} display="inline-block">
											{ sponsor.user
												? <Link href={`https://twitter.com/${sponsor.user.twitterHandle}`} isExternal>
													<HStack spacing="5px" className={classes.amabassadorBlock}>
														<Avatar
															width="24px" height="24px"
															name={sponsor.user.twitterHandle}
															src={sponsor.user.imageUrl} />
														<Text fontSize="14px">
															{`${sponsor.user?.twitterHandle}`}
														</Text>
													</HStack>
												</Link>
												: <Link href={sponsor.url} isExternal>
													<HStack spacing="5px" className={classes.amabassadorBlock}>
														<Avatar
															width="24px" height="24px"
															name={sponsor.name}
															src={sponsor.image} />
														<Text fontSize="14px">
															{`${sponsor.name}`}
														</Text>
													</HStack>
												</Link>
											}
										</WrapItem>
										: <></>
								))
							}
							<WrapItem>
								<IconButton aria-label="add-sponsor" icon={<AddIcon />} onClick={onSponsorOpen} />
							</WrapItem>
						</Wrap>

					</VStack>
				</VStack>

			</Card>
			<AddAmbassador isOpen={ambassadorOpen} onClose={onAmbassadorClose}/>
			<AddSponsor isOpen={sponsorOpen} onClose={onSponsorClose}/>
		</>
	);
};
