import React, { useState } from 'react';
import { MemoizedClickableAvatar } from '../components';
import { ButtonComponent } from '../../../components/ui';
import { IAvatarBoardItem, IAvatarBoardProps } from '../interfaces';
import { createUseStyles } from 'react-jss';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Text, Link, Fade } from '@chakra-ui/react';

import Ellipse42 from '../../../assets/random-avatars/Ellipse42.svg';
import Ellipse43 from '../../../assets/random-avatars/Ellipse43.svg';
import Ellipse44 from '../../../assets/random-avatars/Ellipse44.svg';
import Ellipse45 from '../../../assets/random-avatars/Ellipse45.svg';
import Ellipse46 from '../../../assets/random-avatars/Ellipse46.svg';
import Ellipse47 from '../../../assets/random-avatars/Ellipse47.svg';
import Ellipse48 from '../../../assets/random-avatars/Ellipse48.svg';
import Ellipse49 from '../../../assets/random-avatars/Ellipse49.svg';
import Ellipse50 from '../../../assets/random-avatars/Ellipse50.svg';
import Ellipse51 from '../../../assets/random-avatars/Ellipse51.svg';
import Ellipse52 from '../../../assets/random-avatars/Ellipse52.svg';
import Ellipse53 from '../../../assets/random-avatars/Ellipse53.svg';
import Ellipse54 from '../../../assets/random-avatars/Ellipse54.svg';
import Ellipse55 from '../../../assets/random-avatars/Ellipse55.svg';
import Ellipse56 from '../../../assets/random-avatars/Ellipse56.svg';
import Ellipse57 from '../../../assets/random-avatars/Ellipse57.svg';
import Ellipse58 from '../../../assets/random-avatars/Ellipse58.svg';
import Ellipse59 from '../../../assets/random-avatars/Ellipse59.svg';
import Ellipse60 from '../../../assets/random-avatars/Ellipse60.svg';
import Ellipse61 from '../../../assets/random-avatars/Ellipse61.svg';
import Ellipse62 from '../../../assets/random-avatars/Ellipse62.svg';
import Ellipse63 from '../../../assets/random-avatars/Ellipse63.svg';
import Ellipse64 from '../../../assets/random-avatars/Ellipse64.svg';
import Ellipse65 from '../../../assets/random-avatars/Ellipse65.svg';

const useStyles = createUseStyles({
	becomeSponsor: {
		'&:hover': {
			textDecoration: 'none',
		},
	},
});

const CallToAction = ({ link, ctaText }: { link: string, ctaText: string }) => {
	const classes = useStyles();
	const [hoverSponsor, setHoverSponsor] = useState(false);

	return (
		<Link isExternal href={link} className={classes.becomeSponsor}>
			{hoverSponsor
				? <Fade in={hoverSponsor}>
					<ButtonComponent backgroundColor="brand-bgGrey2" leftIcon={<AddIcon />} mt={4} onMouseEnter={() => setHoverSponsor(true)} onMouseLeave={() => setHoverSponsor(false)}>{ctaText}</ButtonComponent>
				</Fade>
				: <Fade in={!hoverSponsor}><ButtonComponent backgroundColor="brand-bgGrey2" mt={4} onMouseEnter={() => setHoverSponsor(true)} onMouseLeave={() => setHoverSponsor(false)}><AddIcon/></ButtonComponent>
				</Fade>
			}
		</Link>
	);
};

const AvatarsBoard = ({ items, itemName, callToActionLink }: IAvatarBoardProps) => {
	const randomAvatars = [Ellipse42, Ellipse43, Ellipse44, Ellipse45, Ellipse46, Ellipse47, Ellipse48, Ellipse49, Ellipse50, Ellipse51, Ellipse52, Ellipse53, Ellipse54, Ellipse55, Ellipse56, Ellipse57, Ellipse58, Ellipse59, Ellipse60, Ellipse61, Ellipse62, Ellipse63, Ellipse64, Ellipse65];

	return (
		<>
			{ items.length === 0
				? <Text>No {`${itemName}s`} yet.</Text>
				: <Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
					<Text mb={2} fontSize="lg" fontWeight="bold">{`${itemName}`}</Text>
					<Box flexWrap="wrap" justifyContent="center" alignItems="center" margin="0 auto">
						{
							items.map(({ user, id, comment, amount }: IAvatarBoardItem) => (
								<MemoizedClickableAvatar
									amount={amount}
									comment={comment}
									key={id}
									url={user.twitterHandle === null ? 'https://bitcoin.org' : `https://twitter.com/${user.twitterHandle}`}
									imageUrl={user.username === 'anonymous' ? randomAvatars[Math.floor(Math.random() * 24)] : user.imageUrl}
								/>
							))
						}
					</Box>
					{ callToActionLink && <CallToAction link={callToActionLink} ctaText={`Become a ${itemName}`}/> }
				</Box>
			}
		</>
	);
};

export const MemoizedAvatarsBoard = React.memo(AvatarsBoard);
