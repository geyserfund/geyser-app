import { useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, HStack, Link, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BsTwitter } from 'react-icons/bs';
import FountainLogo from '../../assets/fountain-logo-black-small.png';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { ContributionProjectCard, Footer, ProfileProjectCard } from '../../components/molecules';
import Loader from '../../components/ui/Loader';
import { USER_PROFILE_QUERY } from '../../graphql';
import { IProfileUser, IUserExternalAccount } from '../../interfaces';
import { isDarkMode, isMobileMode } from '../../utils';

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
	const { type, username } = account;

	switch (type) {
		case 'twitter':
			return <Link href={`https://twitter.com/${username}`} isExternal>
				<Button leftIcon={<BsTwitter />} colorScheme="twitter" variant="ghost"/>
			</Link>;
		case 'Fountain':
			return <Button leftIcon={<FountainLogo />} colorScheme="twitter" variant="ghost"/>;
		default:
			return <Button colorScheme="twitter" variant="ghost"/>;
	}
};

export const Profile = () => {
	const isDark = isDarkMode();
	const isMobile = isMobileMode();
	const classes = useStyles();

	const params = useParams<{userId: string}>();
	const [getUserData, { loading: profileLoading, error, data }] = useLazyQuery(USER_PROFILE_QUERY);
	console.log('checing params', params);

	useEffect(() => {
		if (params.userId) {
			const variables = { where: {
				id: params.userId,
			},
			};
			getUserData({variables});
		}
	}, [params]);

	if (error) {
		return (
			<Text> Error loading page, Please refresh</Text>
		);
	}

	const userProfile: IProfileUser = data && data.user;

	if (!userProfile || profileLoading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}

	console.log('checking profile data', data);
	return (
		<VStack
			background={isDark ? 'brand.bgHeavyDarkMode' : 'brand.bgGrey4'}
			position="relative"
			padding="0px 0px"
			height="100%"
			justifyContent="space-between"
		>
			<VStack
				spacing="40px"
				width="100%"
				maxWidth="1200px"
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
							<Avatar height="50px" width="50px" name={userProfile.username} src={userProfile.imageUrl} />
							<Text fontWeight={600} fontSize="20px">{userProfile.username}</Text>
						</HStack>
						{/* <Button>Create</Button> */}
					</HStack>
					<HStack width="100%">
						{ userProfile
							&& userProfile.externalAccounts.map(account => <ProfileExternalAccount key={account.id} account={account}/>)
						}
					</HStack>
				</VStack>
				<Box>
					<Tabs variant="line" colorScheme="brand.textGrey">
						<TabList>
							<Tab>
								<HStack minWidth={'40px'}>
									<Text fontWeight={500}>Projects</Text>
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
								<Box className={isMobile ? classes.containerMobile : classes.container}>
									<Wrap paddingY="0px" width="100%" justify={ isMobile ? 'center' : 'flex-start'} spacing="30px" >
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
													/>
												</WrapItem>
											);
										})
										}
									</Wrap>
								</Box>
							</TabPanel>
							<TabPanel>
								<Box className={isMobile ? classes.containerMobile : classes.container}>
									<Wrap paddingY="0px" width="100%" justify={ isMobile ? 'center' : 'flex-start'} spacing="30px" >
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
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>

			</VStack>
			<Footer />
		</VStack>
	);
};
