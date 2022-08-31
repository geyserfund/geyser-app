import { Box, Grid, GridItem, HStack, Text, useDisclosure, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ButtonComponent, Card, IconButtonComponent, ImageWithReload, SatoshiAmount } from '../../../components/ui';
import { isMobileMode, validateEmail } from '../../../utils';
import { TMilestone, TProjectDetails, TRewards } from './types';
import { BiCrosshair, BiLeftArrowAlt, BiPencil } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors } from '../../../constants';
import { useHistory } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { AddMilestones, defaultMilestone } from './components';
import { EditIcon } from '@chakra-ui/icons';
import { AddRewards } from './components/AddRewards';
import { CalendarButton } from '../../../components/molecules';
import { DateTime } from 'luxon';

const useStyles = createUseStyles({
	backIcon: {
		fontSize: '25px',
	},
});

export const MilestoneAndRewards = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();
	const history = useHistory();

	const [selectedButton, setSelectedButton] = useState('ongoing');
	const [selectedDate, setSelectedDate] = useState<Date>();

	const [finalDate, setFinalDate] = useState<string>('');

	const [milestones, setMilestones] = useState<TMilestone[]>([]);
	const [rewards, setRewards] = useState<TRewards[]>([]);
	const [selectedReward, setSelectedReward] = useState<TRewards>();

	const {isOpen: isMilestoneOpen, onClose: onMilestoneClose, onOpen: openMilestone} = useDisclosure();
	const {isOpen: isRewardOpen, onClose: onRewardClose, onOpen: openReward} = useDisclosure();
	const [isSatoshi, setIsSatoshi] = useState(true);

	const handleMilestoneSubmit = (milestones: TMilestone[]) => {
		setMilestones(milestones);
	};

	const handleRewardUpdate = (addReward: TRewards) => {
		const findReward = rewards.find(reward => reward.id === addReward.id);
		if (findReward) {
			const newRewards = rewards.map(reward => {
				if (reward.id === addReward.id) {
					return addReward;
				}

				return reward;
			});
			setRewards(newRewards);
		} else {
			setRewards([...rewards, addReward]);
		}
	};

	const handleNext = () => {

	};

	const handleBack = () => {
		history.push('/');
	};

	const handleRemoveReward = (id?: string) => {
		if (!id) {
			return;
		}

		const newRewards = rewards.filter(reward => reward.id !== id);
		setRewards(newRewards);
	};

	const handleDateChange = (value: Date) => {
		setSelectedButton('custom');
		setSelectedDate(value);
		setFinalDate(`${value.getTime()}`);
	};

	const handleMonthSelect = () => {
		setSelectedButton('month');
		const dateMonth = DateTime.now().plus({months: 1});
		setSelectedDate(undefined);
		setFinalDate(`${dateMonth.toJSDate().getTime()}`);
	};

	const handleOngoingSelect = () => {
		setSelectedButton('ongoing');
		setSelectedDate(undefined);
		setFinalDate('');
	};

	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

	return (
		<Box
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<Grid width="100%" templateColumns={isLargerThan1280 ? 'repeat(6, 1fr)' : isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)' } padding={isMobile ? '10px' : '40px 40px 20px 40px'} >
				<GridItem colSpan={ isLargerThan1280 ? 2 : 1} display="flex" justifyContent="flex-start">
					<ButtonComponent leftIcon={<BiLeftArrowAlt className={classes.backIcon} onClick={handleBack} />}>Back</ButtonComponent>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent={isMobile ? 'center' : 'flex-start'}>
					<VStack
						spacing="30px"
						width="100%"
						maxWidth="400px"
						minWidth="350px"
						marginBottom="40px"
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
					>
						<VStack width="100%" spacing="40px" alignItems="flex-start">
							<Text color="brand.gray500" fontSize="30px" fontWeight={700}> Create new Project</Text>
							<TitleWithProgressBar
								paddingBottom="20px"
								title="Milestones & Rewards"
								subTitle="Step 2 of 3"
								percentage={67}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start" spacing="40px">
							<VStack width="100%" alignItems="flex-start">
								<Text
									name="title"
								>
								Project Milestones
								</Text>
								<ButtonComponent isFullWidth onClick={openMilestone}>Add a milestone</ButtonComponent>
								<Text fontSize="12px">Milestones help you and your community keep track of your progress and set your expectations.</Text>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Fundraising deadline</Text>
								<HStack width="100%" justifyContent="space-around">
									<ButtonComponent
										primary={selectedButton === 'ongoing'}
										onClick={handleOngoingSelect}
									>
										Ongoing
									</ButtonComponent>
									<ButtonComponent
										primary={selectedButton === 'month'}
										onClick={handleMonthSelect}
									>
										1 Month
									</ButtonComponent>
									{/* <ButtonComponent
										primary={selectedButton === 'custom'}
										onClick={() => setSelectedButton('custom')}
									>
										Custom
									</ButtonComponent> */}
									<CalendarButton
										primary={selectedButton === 'custom'}
										value={selectedDate}
										onChange={handleDateChange}
									>
										Custom
									</CalendarButton>
								</HStack>
								<Text fontSize="12px">Add a deadline for your project if you have one, or just keep it as ongoing.</Text>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Rewards</Text>
								<ButtonComponent isFullWidth onClick={() => {
									setSelectedReward(undefined);
									openReward();
								}}>Add a reward</ButtonComponent>
								<Text fontSize="12px">Rewards are a powerful way of exchanging value with your community</Text>
							</VStack>
							<ButtonComponent primary isFullWidth onClick={handleNext}>Continue</ButtonComponent>
						</VStack>

					</VStack>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack alignItems="flex-start" maxWidth="370px" spacing="10px" width="100%">
						{milestones.length > 0
							&& <>
								<HStack justifyContent="space-between" width="100%">
									<Text fontSize="18px" fontWieght={500}>
										MILESTONES
									</Text>
									<IconButtonComponent aria-label="edit" onClick={openMilestone} ><EditIcon /></IconButtonComponent>
								</HStack>

								{
									milestones.map((milestone, index) => (
										<VStack
											key={index}
											width="100%"
											border="1px solid"
											borderColor={colors.gray300}
											borderRadius="4px"
											alignItems="flex-start"
											padding="10px"
										>
											<Text>{milestone.name}</Text>
											{
												isSatoshi ? <SatoshiAmount>{milestone.amount}</SatoshiAmount>
													: <Text>{`$ ${milestone.amount}`}</Text>
											}

										</VStack>
									))
								}
							</>
						}
						{rewards.length > 0
						&& <>
							<HStack justifyContent="space-between" width="100%">
								<Text fontSize="18px" fontWieght={500}>
									Rewards
								</Text>
							</HStack>
							<VStack width="100%">
								{
									rewards.map((reward, index) => (
										<Card
											key={index}
											width="100%"
											borderRadius="4px"
											alignItems="flex-start"
											padding="10px"
										>
											<VStack width="100%">
												<HStack width="100%" justifyContent={'space-between'} paddingX="4px">
													<HStack>
														<VStack spacing="0px">
															{
																isSatoshi
																	? <SatoshiAmount color="brand.primary">{reward.cost}</SatoshiAmount>
																	: <Text color="brand.primary">{`$ ${reward.cost}`}</Text>
															}
															<Text fontSize="12px" color="brand.primary">per item</Text>
														</VStack>
														<VStack spacing="0px">
															<Text fontWeight={500}>{reward.name}</Text>
															<Text><b>2</b> collected</Text>
														</VStack>
													</HStack>

													<HStack>
														<IconButtonComponent
															aria-label="edit-reward"
															size="sm"
															icon={<BiPencil />}
															onClick={() => {
																setSelectedReward(reward);
																openReward();
															}}
														/>
														<IconButtonComponent
															aria-label="edit-reward"
															size="sm"
															icon={<BiCrosshair />}
															backgroundColor="red.100"
															_hover={{backgroundColor: 'red.300'}}
															onClick={() => handleRemoveReward(reward.id)}
														/>
													</HStack>
												</HStack>
												<Box>
													<ImageWithReload borderRadius="4px" src={reward.image} width="335px" height="192px" objectFit="cover"/>
												</Box>

												<Text width="100%" paddingX="5px">{reward.description}</Text>
											</VStack>

										</Card>
									))
								}
							</VStack>

						</>
						}
					</VStack>

				</GridItem>
			</Grid>
			{isMilestoneOpen && <AddMilestones
				isOpen={isMilestoneOpen}
				onClose={onMilestoneClose}
				milestones={milestones.length > 0 ? milestones : [defaultMilestone] }
				onSubmit={handleMilestoneSubmit}
				isSatoshi={isSatoshi}
				setIsSatoshi={setIsSatoshi}
			/>}

			{isRewardOpen && <AddRewards
				isOpen={isRewardOpen}
				onClose={onRewardClose}
				rewards={selectedReward}
				onSubmit={handleRewardUpdate}
				isSatoshi={isSatoshi}
				setIsSatoshi={setIsSatoshi}
			/>}

		</Box>
	);
};
