/* eslint-disable capitalized-comments */
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { Box, Text, HStack, Link, Button, VStack, Show, Tooltip, Fade } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ContributeButton } from './components/ContributeButton';
import { RecipientButton } from './components/RecipientButton';
import { ClickableAvatar } from './components/ClickableAvatar';
import { Grantee } from './components/Grantee';
import { SatoshiIcon, ArrowDownIcon, ArrowUpIcon } from '../../components/icons';
import { Blob } from 'react-blob';
import AnimatedCursor from 'react-animated-cursor';

import Ellipse42 from '../../assets/random-avatars/Ellipse42.svg';
import Ellipse43 from '../../assets/random-avatars/Ellipse43.svg';
import Ellipse44 from '../../assets/random-avatars/Ellipse44.svg';
import Ellipse45 from '../../assets/random-avatars/Ellipse45.svg';
import Ellipse46 from '../../assets/random-avatars/Ellipse46.svg';
import Ellipse47 from '../../assets/random-avatars/Ellipse47.svg';
import Ellipse48 from '../../assets/random-avatars/Ellipse48.svg';
import Ellipse49 from '../../assets/random-avatars/Ellipse49.svg';
import Ellipse50 from '../../assets/random-avatars/Ellipse50.svg';
import Ellipse51 from '../../assets/random-avatars/Ellipse51.svg';
import Ellipse52 from '../../assets/random-avatars/Ellipse52.svg';
import Ellipse53 from '../../assets/random-avatars/Ellipse53.svg';
import Ellipse54 from '../../assets/random-avatars/Ellipse54.svg';
import Ellipse55 from '../../assets/random-avatars/Ellipse55.svg';
import Ellipse56 from '../../assets/random-avatars/Ellipse56.svg';
import Ellipse57 from '../../assets/random-avatars/Ellipse57.svg';
import Ellipse58 from '../../assets/random-avatars/Ellipse58.svg';
import Ellipse59 from '../../assets/random-avatars/Ellipse59.svg';
import Ellipse60 from '../../assets/random-avatars/Ellipse60.svg';
import Ellipse61 from '../../assets/random-avatars/Ellipse61.svg';
import Ellipse62 from '../../assets/random-avatars/Ellipse62.svg';
import Ellipse63 from '../../assets/random-avatars/Ellipse63.svg';
import Ellipse64 from '../../assets/random-avatars/Ellipse64.svg';
import Ellipse65 from '../../assets/random-avatars/Ellipse65.svg';

import { getDaysAgo, isMobileMode, isMediumScreen } from '../../utils';
import useWindowSize from 'react-use/lib/useWindowSize';
// import { QUERY_GET_PROJECT } from '../../graphql';
import { IProject } from '../../interfaces';

export const Grants = ({ project }: { project: IProject }) => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const [arrowChange, setArrowChange] = useState(false);
	const [confetti, setConfetti] = useState(false);
	const [hoverBubble, setHoverBubble] = useState(false);
	const { width, height } = useWindowSize();
	const { owners, sponsors, grantees, fundingTxs } = project;
	const [sats, setSats] = useState(0);

	const randomAvatars = [Ellipse42, Ellipse43, Ellipse44, Ellipse45, Ellipse46, Ellipse47, Ellipse48, Ellipse49, Ellipse50, Ellipse51, Ellipse52, Ellipse53, Ellipse54, Ellipse55, Ellipse56, Ellipse57, Ellipse58, Ellipse59, Ellipse60, Ellipse61, Ellipse62, Ellipse63, Ellipse64, Ellipse65];

	return (
		<>
			<AnimatedCursor
				innerSize={0}
				outerSize={21}
				color={hoverBubble ? '21, 213, 179' : '32, 236, 199'}
				outerAlpha={0.7}
				innerScale={0}
				outerScale={2.1}
				trailingSpeed={1}
				clickables={[
					'a',
					'input[type="text"]',
					'input[type="email"]',
					'input[type="number"]',
					'input[type="submit"]',
					'input[type="image"]',
					'label[for]',
					'select',
					'textarea',
					'button',
					'.link',
					'img',
					'#blob',
				]}
			/>

			{confetti && <Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={1500}
				tweenDuration={80000}
				colors={['#1BD5B3', '#20ECC7', '#6BE7CE', '#FFFFFF', '#E9E9E9', '#5B5B5B', '#0F9078', '#F7931A']}
			/>}

			<Box id="top">
				<Box display="flex" justifyContent="center" alignItems="center" height={{xl: '85vh'}}>
					<Box
						display={isMedium ? 'block' : 'flex'}
						justifyContent="space-between"
						alignItems="center"
						width={isMobile ? '100%' : '75%'}
						margin="0 auto"
						px={[2, 100]}
					>

						{/* bubble section */}
						<Box mt={{base: 10, xl: 0}}>

							<Tooltip label="Contribute sats!" placement="top" bg="brand.primary" color="black" borderRadius="base">
								<Box border="1px solid lightgrey" borderRadius="full" p={[10, 25, 25, 50]} width={{base: '75%', md: '50%', xl: '100%'}} margin="0 auto" onMouseEnter={() => setHoverBubble(true)} onMouseLeave={() => {
									setHoverBubble(false);
								}}>
									<Blob id="blob" size="21vh" onMouseDown={() => setSats(sats + 1000)}
										style={{
											backgroundImage: 'radial-gradient(ellipse at right, rgba(32, 236, 199), rgba(27, 213, 179), #E9E9E9)',
											margin: '0 auto',
											boxShadow: '0px 0px 30px 10px rgba(91, 91, 91, 0.25)',
										}}
									/>
								</Box>
							</Tooltip>

							{sats > 0
							&& <Box display="flex" justifyContent="center" alignItems="center" m={4}>
								<Fade in={sats > 0}>
									<ContributeButton project={project} confettiEffects={setConfetti} buttonStyle="bubble" sats={sats} setSats={setSats} />
								</Fade>
							</Box>}

							<Text fontSize="lg" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'} color="brand.primary" mt={5}>Grant open</Text>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Box display={isMobile ? 'block' : 'flex'} justifyContent="center" alignItems="center" my={4}>
									<HStack spacing="10px" mr={isMobile ? 0 : 10}>
										<SatoshiIcon/><Text fontSize="lg"><b>{project.balance}</b> received</Text>
									</HStack>
									<Text fontSize="lg" textAlign={isMobile ? 'right' : 'left'}><b>{project.fundingTxs.length}</b> donations</Text>
								</Box>
							</Box>

						</Box>

						{/* grant info */}
						<Box width={{xl: '40%'}}>
							<Text fontSize="4xl" fontWeight="bold">{project.title}</Text>
							<Text color="brand.primary" fontWeight="bold" fontSize="lg">Supporting Bitcoin hackathons focused on on-chain and lightning applications.</Text>
							<HStack my={2} spacing="10px">
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">#001</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Hackathons</Text>
								<Text bg="brand.bgGrey" px={5} py={1} borderRadius="lg">Building</Text>
							</HStack>
							<Text>Created <b>{`${getDaysAgo(project.createdAt)} ago`}</b></Text>
							<HStack my={1} flexWrap="wrap">
								<Text>The Board:</Text>
								<Box>
									{
										owners.map(owner => (
											<Link
												key={owner.user.id}
												href={`https://twitter.com/${owner.user.twitterHandle}`}
												isExternal
												fontSize="sm"
												color="brand.primary"
												fontWeight="bold"
											>@{ owner.user.twitterHandle } </Link>
										))
									}
								</Box>
							</HStack>
							<Text>{project.description}</Text>
							<ContributeButton project={project} confettiEffects={setConfetti} buttonStyle="main" sats={sats} setSats={setSats} />
						</Box>
					</Box>
				</Box>
			</Box>

			{/* arrow icon */}
			<Show above="xl">
				<Box display="flex" justifyContent="center">
					<Link href={arrowChange ? '#bottom' : '#top'}>
						<Button bg="none" border="1px solid lightgrey" onClick={() => setArrowChange(!arrowChange)}>
							{ arrowChange ? <ArrowUpIcon/> : <ArrowDownIcon/> }
						</Button>
					</Link>
				</Box>
			</Show>

			{/* donation, sponsor, recipient sections */}
			<Box id="bottom"></Box>
			<Box py={20}>
				<VStack justifyContent="center" alignItems="center" spacing="50px">

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Most recent donations</Text>
						<HStack flexWrap="wrap" justifyContent="center" alignItems="center" margin="0 auto">
							{
								fundingTxs.map(tx => (
									<ClickableAvatar
										key={tx.id}
										url={`https://twitter.com/${tx.funder.user.twitterHandle}`}
										imageUrl={tx.funder.user.username === 'anonymous' ? randomAvatars[Math.floor(Math.random() * 25)] : tx.funder.user.imageUrl}
									/>
								))
							}
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Sponsors</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							{
								sponsors.map(sponsor => (
									<ClickableAvatar
										key={sponsor.user.id}
										url={`https://twitter.com/${sponsor.user.twitterHandle}`}
										imageUrl={sponsor.user.imageUrl}
									/>
								))
							}
						</HStack>
					</Box>

					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Potential recipients</Text>
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							<RecipientButton project={project}/>
							{
								grantees.map(grantee => <Grantee key={grantee.id} grantee={grantee}/>)
							}
						</HStack>
					</Box>

				</VStack>
			</Box>

			{/* footer */}
			<Footer/>
		</>
	);
};
