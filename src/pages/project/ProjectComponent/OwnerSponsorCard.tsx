import { Avatar, Box, HStack, Link, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Card } from '../../../components/ui';
import { IProjectSponsor, IUser } from '../../../interfaces';
import { isMobileMode } from '../../../utils';
import { useStyles } from './styles';

interface IOwnerSponsorCard {
    owner: IUser
    ambassador: IUser
    sponsors: IProjectSponsor[]
    ownerIntro: string
}

export const OwnerSponsorCard = ({owner, ambassador, sponsors, ownerIntro}: IOwnerSponsorCard) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });
	const [readMore, setReadMore] = useState(false);

	const handleToggleReadMore = () => {
		setReadMore(!readMore);
	};

	return (
		<Card className={classes.cardContainer}>
			<VStack spacing="12px" alignItems="flex-start">
				<Box>
					<Text fontSize="10px" color="brand.textGrey">PROJECT OWNER</Text>
					<HStack spacing="30px" alignItems="flex-start">
						<Link href={`https://twitter.com/${owner.username}`} isExternal>
							<Avatar width="75px" height="75px" name={owner.username} src={owner.picture} />
						</Link>
						<VStack justifyContent="space-between" alignItems="flex-start">
							<Link href={`https://twitter.com/${owner.username}`} isExternal>
								<Text fontSize="18px">
									{owner.fullName}
								</Text>
							</Link>
							<Text fontSize="12px" >
								{readMore ? ownerIntro : isMobile ? ownerIntro.slice(0, 84) : ownerIntro.slice(0, 180) }
								{!readMore && <span className={classes.readmore} onClick={handleToggleReadMore}>...read more</span>}
							</Text>
						</VStack>
					</HStack>
				</Box>
				<Box >
					<Text fontSize="10px" color="brand.textGrey">AMBASSADOR</Text>
					<Link href={`https://twitter.com/${ambassador.username}`} isExternal>
						<HStack spacing="15px">
							<Avatar width="35px" height="35px" name={ambassador.username} src={ambassador.picture} />
							<Text fontSize="18px">
								{ambassador.username}
							</Text>
						</HStack>
					</Link>
				</Box>
				<Box width="100%" overflow="hidden">
					<Text fontSize="10px" color="brand.textGrey">SPONSORS</Text>
					<Wrap >
						{
							sponsors.map((sponsor: IProjectSponsor) => (
								<WrapItem key={sponsor.user.username} display="inline-block">
									<Link href={`https://twitter.com/${sponsor.user.username}`} isExternal>
										<HStack spacing="5px" marginRight="10px">
											<Avatar width="35px" height="35px" name={sponsor.user.username} src={sponsor.user.picture} />
											<Text fontSize="18px">
												{sponsor.user.username}
											</Text>
										</HStack>
									</Link>
								</WrapItem>
							))
						}
					</Wrap>

				</Box>
			</VStack>
		</Card>
	);
};
