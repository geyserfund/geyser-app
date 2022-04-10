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
import { ISponsor } from '../../../interfaces';

interface ISponsorBlock {
    sponsors: ISponsor[]
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
						sponsors.map((sponsor: ISponsor) => (
							<WrapItem key={sponsor.id} marginRight="20px">
								<Link href={sponsor.url} isExternal>
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

