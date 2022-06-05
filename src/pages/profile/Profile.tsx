import { useLazyQuery } from '@apollo/client';
import { Avatar, Box, Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer, ProfileProjectCard } from '../../components/molecules';
import Loader from '../../components/ui/Loader';
import { useAuthContext } from '../../context';
import { USER_PROFILE_QUERY } from '../../graphql';
import { IProfileUser } from '../../interfaces';
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

export const Profile = () => {
	const isDark = isDarkMode();
	const isMobile = isMobileMode();
	const classes = useStyles();

	const {user, loading } = useAuthContext();

	const [getUserData, { loading: profileLoading, error, data }] = useLazyQuery(USER_PROFILE_QUERY);

	useEffect(() => {
		if (!user || !user.id) {
			return;
		}

		getUserData();
	}, [user]);

	if (error) {
		return (
			<Text> Error loading page, Please refresh</Text>
		);
	}

	if (loading || profileLoading) {
		return (
			<Box>
				<Loader />
			</Box>
		);
	}

	console.log('checking profile data', data);
	const userProfile: IProfileUser = data && data.user;
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
							<Avatar height="50px" width="50px" name={user.username} src={user.imageUrl} />
							<Text fontWeight={600} fontSize="20px">{user.username}</Text>
						</HStack>
						<Button>Create</Button>
					</HStack>
				</VStack>
				<Box>
					<Tabs variant="line" colorScheme="brand.textGrey">
						<TabList>
							<Tab>Projects</Tab>
							<Tab>Contributions</Tab>
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
								<p>two!</p>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>

			</VStack>
			<Footer />
		</VStack>
	);
};
