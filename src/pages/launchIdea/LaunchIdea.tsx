import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { EnvelopeIcon, LighteningIcon, RopeIcon } from '../../components/icons';
import { ButtonComponent, Card, SectionTitle, TextArea, TextBox } from '../../components/ui';
import Loader from '../../components/ui/Loader';
import { isMobileMode } from '../../utils';

const useStyles = createUseStyles({
	iconContainer: {
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '55px',
		minWidth: '55px',
		boxShadow: '0px 0px 9.51722px rgba(0, 0, 0, 0.11)',
	},
	cardContainer: {
		width: '100%',
		maxWidth: '700px',
		padding: '40px 25px',
	},
});

export const LaunchIdea = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();

	const [form, setForm] = useState({email: '', description: ''});
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (event: any) => {
		const {name} = event.target;
		const {value} = event.target;
		if (name) {
			setForm({...form, [name]: value});
		}
	};

	const handleSubmitForm = () => {
		setSubmitting(true);
		setTimeout(() => {
			setSubmitted(true);
		}, 2000);
		setSubmitting(false);
	};

	const SuccesfullySubmitted = () => (
		<Card className={classes.cardContainer}>
			<VStack spacing="30px">
				<Text fontSize="33px" fontWeight={700}>Successful submission!</Text>
				<Text fontSize="18px">Thanks for submitting a crowdfunding project idea to Geyser. We received your project submission, and will get back to you soon to get you all set up. As we are still in our early product development we are currently adding the projects manually.
				</Text>
			</VStack>
		</Card>
	);

	const SubmitForm = () => (
		<Card className={classes.cardContainer}>
			<VStack spacing="30px">
				<Text fontSize="33px" fontWeight={700}>Submit project idea</Text>
				<VStack width="100%" alignItems="flex-start">
					<SectionTitle>Your email/contact</SectionTitle>
					<TextBox
						type="email"
						name="email"
						fontSize="14px"
						placeholder="satoshi@geyser.fund"
						value={form.email}
						onChange={handleChange}
					/>
				</VStack>
				<VStack width="100%" alignItems="flex-start">
					<SectionTitle>Your idea</SectionTitle>
					<TextArea
						pr={16}
						name="description"
						fontSize="14px"
						placeholder="Building a peer-to-peer electronic cash system."
						value={form.email}
						onChange={handleChange}
					/>
				</VStack>

				<ButtonComponent
					primary
					standard
					isFullWidth
					onClick={handleSubmitForm}
				>
                            Submit
				</ButtonComponent>
			</VStack>
		</Card>
	);

	const Loading = () => (
		<Card className={classes.cardContainer} height="400px" display="flex" alignItems="center" justifyContent="center">

			<Loader />

		</Card>
	);

	return (
		<Box margin={isMobile ? '10px' : '50px 60px'}>
			<VStack spacing="60px">
				<VStack width="100%" alignItems="flex-start" spacing="30px">
					<Text fontSize="44px" fontWeight={700}>Transform your ideas into reality</Text>
					<Text fontSize="18px">
                Are you a Bitcoin creator, creative or entrepreneur looking for the funds needed to realize your ideas? No matter where you are in the world, Geyser now makes it easy for you to create and commit to a time-bound crowdfund, and allow supporters to fund and keep track of your project. Get started by submitting an idea to crowdfund on Geyser below, and we will get back to you soon on how to proceed.
					</Text>
					<Stack direction={isMobile ? 'column' : 'row'} width="100%" justifyContent="space-between" spacing="15px">
						<HStack flex="1" spacing="18px">
							<Box className={classes.iconContainer}>
								<RopeIcon height="33px" width="33px"/>
							</Box>
							<Text fontSize="18px" overFlowWrap="break-word">
                                Create accountability by leveraging your network as ambassadors & sponsors.
							</Text>
						</HStack>
						<HStack flex="1" spacing="18px">
							<Box className={classes.iconContainer}>
								<LighteningIcon height="33px" width="33px"/>
							</Box>
							<Text fontSize="18px">
                                Give back to your funders with rewards and badges.
							</Text>
						</HStack>
						<HStack flex="1" spacing="18px">
							<Box className={classes.iconContainer}>
								<EnvelopeIcon height="33px" width="33px"/>
							</Box>
							<Text fontSize="18px">
                                Keep your backers in the loop with updates
							</Text>
						</HStack>

					</Stack>
				</VStack>
				{
					submitting
						? <Loading />
						: submitted
							? <SuccesfullySubmitted />
							: <SubmitForm />
				}

			</VStack>

		</Box>
	);
};

