/* eslint-disable capitalized-comments */
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { Box, Text, HStack, Link, Button, VStack, Show, Tooltip } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ContributeButton } from './components/ContributeButton';
import { RecipientButton } from './components/RecipientButton';
import { ClickableAvatar } from './components/ClickableAvatar';
import { Grantee } from './components/Grantee';
import { SatoshiIcon, ArrowDownIcon, ArrowUpIcon } from '../../components/icons';
import { Blob } from 'react-blob';
import AnimatedCursor from 'react-animated-cursor';

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
	const { owners, funders, sponsors, grantees } = project;
	const [sats, setSats] = useState(0);

	return (
		<>
			<AnimatedCursor
				innerSize={21}
				outerSize={21}
				color={hoverBubble ? '21, 213, 179' : '32, 236, 199'}
				outerAlpha={0.2}
				innerScale={0.7}
				outerScale={5}
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

							<Tooltip label={sats === 0 ? 'Contribute sats!' : `${sats} sat` } placement="top" bg="brand.primary" color="black" borderRadius="base" closeOnClick={false}>
								<Box border="1px solid lightgrey" borderRadius="full" p={[10, 50]} width={{base: '75%', md: '50%', xl: '100%'}} margin="0 auto" onMouseEnter={() => setHoverBubble(true)} onMouseLeave={() => {
									setHoverBubble(false);
									setSats(0);
								}}>
									<Blob id="blob" size="21vh" onMouseDown={() => setSats(sats + 1)}
										style={{
											backgroundColor: '#20ECC7',
											margin: '0 auto',
										}}
									/>
								</Box>
							</Tooltip>

							<Text fontSize="lg" fontWeight="bold" textAlign={isMedium ? 'center' : 'left'} color="brand.primary" mt={5}>Grant open</Text>
							<Box display="flex" justifyContent="center" alignItems="center">
								<Box display={isMobile ? 'block' : 'flex'} justifyContent="center" alignItems="center" my={4}>
									<HStack spacing="10px" mr={isMobile ? 0 : 10}>
										<SatoshiIcon/><Text fontSize="lg"><b>{project.balance}</b> received</Text>
									</HStack>
									<Text fontSize="lg" textAlign={isMobile ? 'right' : 'left'}><b>{project.funders.length}</b> donations</Text>
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
							<ContributeButton project={project} confettiEffects={setConfetti} />
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
						<HStack flexWrap="wrap" spacing={['0px', '15px']}>
							{
								funders.map(funder => (
									<ClickableAvatar
										key={funder.user.id}
										url={`https://twitter.com/${funder.user.twitterHandle}`}
										imageUrl={funder.user.imageUrl}
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
							<RecipientButton/>
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
