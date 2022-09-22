/* eslint-disable complexity */
import { useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery, VStack, Wrap, WrapItem, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsTwitter } from 'react-icons/bs';
import FountainLogo from '../../assets/fountain-logo-black-small.png';
import { createUseStyles } from 'react-jss';
import { useHistory, useParams } from 'react-router';
import { ContributionProjectCard, Footer, ProfileProjectCard } from '../../components/molecules';
import { USER_PROFILE_QUERY } from '../../graphql';
import { IProfileUser, IUserExternalAccount } from '../../interfaces';
import { isDarkMode, isMobileMode, getRandomOrb } from '../../utils';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { useAuthContext } from '../../context';
import { BsLightningChargeFill } from 'react-icons/bs';
import { defaultUser } from '../../defaults';
import { cookieOptions } from '../../constants';

const useStyles = createUseStyles({
	container: {
		width: '100%',
		position: 'relative',
	},
	containerMobile: {
		width: '100%',
		position: 'relative',
		'& .chakra-wrap__list': {
			margin: '0px',
		},
	},
});

const ProfileExternalAccount = ({account} : {account: IUserExternalAccount }) => {
	const { type, externalUsername } = account;

	switch (type) {
		case 'twitter':
			return (
				<Link href={`https://twitter.com/${externalUsername}`} isExternal style={{ textDecoration: 'none' }} mr={2} mb={2}>
					<Button leftIcon={<BsTwitter />} colorScheme="twitter" variant="ghost">
						{account.externalUsername}
					</Button>
				</Link>
			);
		case 'Fountain':
			return (
				<Link href={`https://www.fountain.fm/${account.externalUsername}`} isExternal style={{ textDecoration: 'none' }} mr={2} mb={2}>
					<Button leftIcon={<FountainLogo />} colorScheme="twitter" variant="ghost">
						{account.externalUsername}
					</Button>
				</Link>);
		case 'lnurl':
			return (
				<Button leftIcon={<BsLightningChargeFill />} variant="ghost" fontSize={14} cursor="default" mr={2} mb={2}>
					{account.externalUsername}
				</Button>
			);

		default:
			return null;
	}
};

export const Profile = () => {
	const isDark = isDarkMode();
	const isMobile = isMobileMode();
	const history = useHistory();
	const classes = useStyles();

	const {user, loginOnOpen} = useAuthContext();
	const [isLargerThan1080] = useMediaQuery('(min-width: 1080px)');

	const params = useParams<{userId: string}>();
	const [getUserData, { loading: profileLoading, error, data }] = useLazyQuery(USER_PROFILE_QUERY);
	const isMe = () => history.location.pathname === `/profile/${user.id}`;

	const [userProfile, setUserProfile] = useState<IProfileUser>({
		...defaultUser,
		contributions: [],
		ownerOf: [],
	});
	console.log('cookieOptions', cookieOptions);

	/*
	useEffect functions
	*/
	useEffect(() => {
		if (params.userId) {
			const variables = { where: {
				id: params.userId,
			},
			};
			getUserData({variables});
		}
	}, [params]);

	useEffect(() => {
		if (data && data.user) {
			const user = data.user as IProfileUser;
			setUserProfile(user);
		}
	}, [data]);

	useEffect(() => {
		if (isMe()) {
			setUserProfile({
				...userProfile,
				...user,
			});
		}
	}, [user]);

	if (error) {
		return (
			<Text> Error loading page, Please refresh</Text>
		);
	}

	const myProfile = user && `${user.id}` === params.userId;

	if (userProfile.id === 0 || profileLoading) {
		return (
			<ProjectSkeleton />
		);
	}

	const handleLaunchIdea = () => {
		history.push('/launch');
	};

	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1080px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				marginTop={isMobile ? '40px' : '80px'}
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<VStack width="100%">
					<HStack width="100%" justifyContent="space-between">
						<HStack spacing="20px">
							<Avatar height="50px" width="50px" name={userProfile.username} src={userProfile.imageUrl ? userProfile.imageUrl : getRandomOrb(userProfile.id)} />
							<Text fontWeight={600} fontSize="20px">{userProfile.username}</Text>
						</HStack>
						{myProfile
						&& <Menu>
							<MenuButton
								as={Button}
								rightIcon={<ChevronDownIcon />}
								borderRadius="4px"
								bgColor="brand.primary"
								_hover={{bgColor: 'brand.normalLightGreen'}}
								_focus={{bgColor: 'brand.normalLightGreen'}}
								_active={{bgColor: 'brand.normalLightGreen'}}
							>
								Create
							</MenuButton>
							<MenuList>
								<MenuItem onClick={handleLaunchIdea}>Launch idea</MenuItem>
								<MenuItem color="brand.gray300" pointerEvents="none">Write post</MenuItem>
							</MenuList>
						</Menu>
						}
					</HStack>
					<Box display="flex" alignItems="center" flexWrap="wrap" width="100%">
						{ userProfile
							&& userProfile.externalAccounts.map(account => {
								if (myProfile || account.public) {
									return <ProfileExternalAccount key={account.id} account={account}/>;
								}
							})
						}
						{ user.id && user.id === userProfile.id
							?	<IconButton
								size="sm"
								background={'none'}
								aria-label="connect"
								icon={<SettingsIcon fontSize="20px" />}
								border="1px solid lightgrey"
								onClick={loginOnOpen}
								mr={2}
								mb={2}
							/>
							: <></>
						}
					</Box>
				</VStack>
				<Box width="100%">
					<Tabs variant="line" colorScheme="brand.textGrey" defaultIndex={userProfile && userProfile.ownerOf.length === 0 ? 1 : 0}>
						<TabList>
							<Tab>
								<HStack minWidth={'40px'}>
									<Text fontWeight={500}>EntryCreateEdits</Text>
									<Text fontSize="12px" backgroundColor="brand.bgGrey3" padding="4px 8px" borderRadius="4px">{userProfile && userProfile.ownerOf.length}</Text>
								</HStack>
							</Tab>
							<Tab>
								<HStack minWidth={'40px'}>
									<Text fontWeight={500}>Contributions</Text>
									<Text fontSize="12px" backgroundColor="brand.bgGrey3" padding="4px 8px" borderRadius="4px">{userProfile && userProfile.contributions.length}</Text>
								</HStack>
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								{
									userProfile && userProfile.ownerOf && userProfile.ownerOf.length > 0
										? <Box className={isMobile ? classes.containerMobile : classes.container}>
											<Wrap paddingY="0px" width="100%" justify={ !isLargerThan1080 ? 'center' : 'flex-start'} spacing="30px" >
												{ userProfile && userProfile.ownerOf.map(owned => {
													const {project} = owned;
													return (
														<WrapItem key={project.id}>
															<ProfileProjectCard
																title={project.title}
																name={project.name}
																project={project}
																imgSrc={project.media[0]}
																marginLeft="0px !important"
																privateUser={myProfile}
															/>
														</WrapItem>
													);
												})
												}
											</Wrap>
										</Box>
										: <Box width="100%" display="flex" justifyContent="center">
											<Text >There are no items here.</Text>
										</Box>
								}
							</TabPanel>
							<TabPanel >
								{
									userProfile && userProfile.contributions && userProfile.contributions.length > 0
										? <Box className={isMobile ? classes.containerMobile : classes.container}>
											<Wrap paddingY="0px" width="100%" justify={ !isLargerThan1080 ? 'center' : 'flex-start'} spacing="30px" >
												{ userProfile && userProfile.contributions.map(contribute => (
													<WrapItem key={contribute.project.id}>
														<ContributionProjectCard
															marginLeft="0px !important"
															contribution={contribute}
														/>
													</WrapItem>
												))
												}
											</Wrap>
										</Box>
										: <Box width="100%" display="flex" justifyContent="center">
											<Text >There are no items here.</Text>
										</Box>
								}
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>

			</VStack>
			<Footer />
		</VStack>
	);
};

const ProjectSkeleton = () => {
	const isMobile = isMobileMode();
	const isDark = isDarkMode();

	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1080px"
				padding={isMobile ? '0px 10px' : '0px 40px'}
				marginBottom="40px"
				marginTop={isMobile ? '40px' : '80px'}
				display="flex"
				flexDirection="column"
				alignItems="flex-start"
			>
				<VStack width="100%" spacing="20px">
					<HStack width="100%" justifyContent="space-between">
						<HStack spacing="30px">
							<Skeleton height="50px" width="50px" borderRadius="50%"/>
							<Skeleton height="30px" width="200px" />
						</HStack>
						{/* <Button>Create</Button> */}
					</HStack>
					<HStack width="100%">
						<Skeleton height="30px" width="100px" />
					</HStack>
				</VStack>
				<VStack spacing="20px">
					<HStack width="100%">
						<Skeleton height="44px" width="120px"/>
						<Skeleton height="44px" width="120px"/>
					</HStack>
					<HStack>
						<Skeleton height="300px" width="300px" borderRadius="4px"/>
						<Skeleton height="300px" width="300px" borderRadius="4px"/>
						<Skeleton height="300px" width="300px" borderRadius="4px"/>
					</HStack>
				</VStack>
			</VStack>
		</VStack>
	);
};
