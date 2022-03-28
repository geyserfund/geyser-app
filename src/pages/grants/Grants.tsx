/* eslint-disable capitalized-comments */
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import Confetti from 'react-confetti';
import { Box, Text, HStack, Link, Button, VStack, Show, Tooltip, Fade, CloseButton } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ContributeButton } from './components/ContributeButton';
import { RecipientButton } from './components/RecipientButton';

import { Grantee, MemoizedAvatarsBoard } from './components';
import { SatoshiIcon } from '../../components/icons';
import { Blob } from 'react-blob';
import AnimatedCursor from 'react-animated-cursor';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import { getDaysAgo, isMobileMode, isMediumScreen, getCountDown } from '../../utils';
import useWindowSize from 'react-use/lib/useWindowSize';
// import { QUERY_GET_PROJECT } from '../../graphql';
import { IProject } from '../../interfaces';

const Countdown = ({ endDate }: { endDate: string}) => {
	const [countDown, setCountDown] = useState('');
	const isMedium = isMediumScreen();

	const handleCountDown = () => {
		const countDown = getCountDown(endDate);
		setCountDown(countDown);
	};

	useEffect(() => {
		const interval = setInterval(handleCountDown, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Text textAlign={isMedium ? 'center' : 'left'} fontSize="lg" color="brand.darkerPrimary" fontWeight="bold">{`${countDown}`}</Text>
	);
};

const BlobComponent = ({ project, setConfetti }: {
	project: IProject,
	setConfetti: Dispatch<SetStateAction<boolean>>
 }) => {
	const [sats, setSats] = useState(0);
	const [wobble, makeWobble] = useState(false);
	const [clearCloseButton, setClearCloseButton] = useState(false);

	const incrementSats = (amount: number) => {
		setSats(sats + amount);
	};

	return (
		<>
			<Box display="flex" justifyContent="center" height="40px" alignItems="center" mb={3}>
				{ sats > 0
					&& <Fade in={sats > 0}>
						<HStack>
							<ContributeButton project={project} confettiEffects={setConfetti} buttonStyle="bubble" sats={sats} setSats={setSats} clearCloseButton={setClearCloseButton}/>
							{!clearCloseButton
							&& <CloseButton onClick={() => setSats(0)}/>}
						</HStack>
					</Fade>
				}
			</Box>
			<Tooltip label="Contribute sats!" placement="top" bg="brand.primary" color="black" borderRadius="base" hasArrow closeOnMouseDown={true} py={2} isDisabled={sats > 0}>
				<Box border="1px solid lightgrey" borderRadius="full" p={[10, 25, 25, 50]} width={{base: '75%', md: '50%', xl: '100%'}} margin="0 auto" onMouseEnter={() => makeWobble(!wobble)} onMouseLeave={() => makeWobble(!wobble)}>
					<Blob id="blob" size="21vh" onMouseDown={() => incrementSats(1000)}
						style={{
							backgroundImage: 'radial-gradient(ellipse at right, rgba(32, 236, 199), rgba(27, 213, 179), #E9E9E9)',
							margin: '0 auto',
							boxShadow: '0px 0px 30px 10px rgba(91, 91, 91, 0.25)',
						}}
					/>
				</Box>
			</Tooltip>
		</>
	);
};

const CustomCursor = () => (
	<AnimatedCursor
		innerSize={0}
		outerSize={21}
		color={'32, 236, 199'}
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
);

export const Grants = ({ project }: { project: IProject }) => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const [arrowChange, setArrowChange] = useState(false);
	const [confetti, setConfetti] = useState(false);
	const { width, height } = useWindowSize();
	const { owners, sponsors, grantees, fundingTxs } = project;

	return (
		<>

			{/* bubble cursor */}
			<CustomCursor />

			{/* confetti effects on invoice payment */}
			{confetti && <Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={1500}
				tweenDuration={80000}
				colors={['#1BD5B3', '#20ECC7', '#6BE7CE', '#FFFFFF', '#E9E9E9', '#5B5B5B', '#0F9078', '#F7931A']}
			/>}

			{/* hero section */}
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
						<Box mt={{base: 3, xl: 0}}>

							{/* bubble */}
							<BlobComponent project={project} setConfetti={setConfetti}/>

							{/* info section */}
							<Text fontSize="lg" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'} color="brand.darkerPrimary" mt={5}>Grant {project.active ? 'open' : 'closed'}</Text>
							<Countdown endDate={project.expiresAt}/>
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
							<Text color="brand.darkerPrimary" fontWeight="bold" fontSize="lg">Grant program to support hackathon events</Text>
							<Box flexWrap="wrap" display="flex" my={2}>
								<Text bg="brand.bgGrey" px={5} py={1} m={1} borderRadius="lg">#001</Text>
								<Text bg="brand.bgGrey" px={5} py={1} m={1} borderRadius="lg">Hackathons</Text>
								<Text bg="brand.bgGrey" px={5} py={1} m={1} borderRadius="lg">Building</Text>
							</Box>
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
												color="brand.darkerPrimary"
												fontWeight="bold"
											>@{ owner.user.twitterHandle } </Link>
										))
									}
								</Box>
							</HStack>
							<Text textAlign="justify">{project.description}</Text>
							<ContributeButton project={project} confettiEffects={setConfetti} buttonStyle="main" />
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
			<Box py={20} id="bottom">
				<VStack justifyContent="center" alignItems="center" spacing="50px">

					{/* recent donation */}
					<MemoizedAvatarsBoard
						items={fundingTxs.map(({ id, amount, funder, comment }) => ({ id, user: funder.user, comment, amount: Number(amount) }))}
						itemName="donation"
					/>

					{/* sponsors */}
					<MemoizedAvatarsBoard
						items={sponsors.map(({ user}) => ({ id: Number(user.id), user }))}
						itemName="sponsor"
						callToActionLink="https://airtable.com/shr8X1T7M8SuvHOjD"
					/>

					{/* grantees */}
					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">Potential recipients</Text>
						<Box flexWrap="wrap" display="flex" alignItems="center">
							<RecipientButton project={project}/>
							{
								grantees.map(grantee => <Grantee key={grantee.id} grantee={grantee}/>)
							}
						</Box>
					</Box>

					{/* more info */}
					<Box border="1px solid lightgrey" borderRadius="lg" boxShadow="md" width={['95%', '75%']} margin="0 auto" p={35}>
						<Text mb={2} fontSize="lg" fontWeight="bold">More info</Text>
						<Text>
						Support your favorite causes through Geyser Grants, and submit your suggested recipients. Once the Grant closes, the Board will select from the relevant initiatives and distribute the funds accordingly. All the data will be presented in an open source way. For more info about the Grants, read <Link isExternal href="https://geyser.notion.site/About-Us-2dd9468a27e84531bcbcbe89c24d7f09" textDecoration="underline">here</Link>.
						</Text>
					</Box>

				</VStack>
			</Box>

			{/* footer */}
			<Footer/>
		</>
	);
};
