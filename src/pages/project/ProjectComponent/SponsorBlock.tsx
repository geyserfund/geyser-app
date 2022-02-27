import {
	Image,
	Text,
	VStack,
	Link,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import React from 'react';
import { Card } from '../../../components/ui';
import { useStyles } from './styles';
import { isMobileMode } from '../../../utils';
import { IProjectSponsor } from '../../../interfaces';

interface ISponsorBlock {
    sponsors: IProjectSponsor[]
}

export const SponsorBlock = ({sponsors}: ISponsorBlock) => {
	const isMobile = isMobileMode();
	const classes = useStyles({ isMobile });

	if (!(sponsors.length > 0)) {
		return null;
	}

	return (
		<Card className={classes.cardContainer}>
			<VStack marginBottom="10px">
				<Text alignSelf="flex-start" fontSize="10px" color="brand.textGrey">SPONSORS</Text>
				<Wrap display="flex" spacing="40px" align="center" width={'100%'}>
					{
						sponsors.map((sponsor: IProjectSponsor) => (
							<WrapItem key={sponsor.companyUrl} marginRight="20px">
								<Link href={sponsor.companyUrl} isExternal>
									<Image height="70px" src={sponsor.image} />
								</Link>
							</WrapItem>
						))
					}
				</Wrap>
			</VStack>
		</Card>

	);
};

