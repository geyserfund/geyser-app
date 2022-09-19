import { useLazyQuery } from '@apollo/client';
import { Box, Button, Grid, GridItem, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useHistory, useLocation, useParams } from 'react-router';
import TitleWithProgressBar from '../../components/molecules/TitleWithProgressBar';
import { ButtonComponent, TextBox } from '../../components/ui';
import { useAuthContext } from '../../context';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { isMobileMode } from '../../utils';
import { Entries } from './Entries';
import { FundSettings } from './FundSettings';
import { ProjectSettings } from './ProjectSettings';

export type TDashboardTabs = 'entries' | 'fundingSettings' | 'projectSettings'

export const ProjectDashboard = () => {
	const isMobile = isMobileMode();
	const { projectId } = useParams<{ projectId: string }>();
	const { state } = useLocation<{ loggedOut?: boolean }>();
	const history = useHistory();

	const {user, setNav} = useAuthContext();

	const [view, setView] = useState<TDashboardTabs>('entries');

	useEffect(() => {
		try {
			getProject();
		} catch (_) {
			history.push('/not-found');
		}
	}, [state]);

	const [getProject, { loading, error, data }] = useLazyQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { where: { name: projectId } },
			onCompleted(data) {
				if (data.project.owners[0].user.id !== user.id) {
					history.push('/not-authorized');
				}

				setNav({title: data.project.title, path: `/projects/${data.project.name}`, projectOwnerId: data.project.owners[0].user.id});
			},
		},
	);

	const renderTabs = () => {
		switch (view) {
			case 'entries':
				return <Entries />;
			case 'fundingSettings':
				return <FundSettings />;
			case 'projectSettings':
				return <ProjectSettings />;
			default:
				return <Entries />;
		}
	};

	const handleBack = () => {
		history.push(`/projects/${projectId}`);
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
			<Grid
				width="100%"
				templateColumns={isLargerThan1280 ? 'repeat(6, 1fr)' : isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)' }
				padding={isMobile ? '10px' : '40px 40px 20px 40px'}
			>
				<GridItem colSpan={isLargerThan1280 ? 2 : 1} display="flex" justifyContent="flex-start">
					<ButtonComponent onClick={handleBack} leftIcon={<BiLeftArrowAlt style={{fontSize: '25px'}} />}>  Back</ButtonComponent>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
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
						<Box display="flex">
							<Box borderBottom="3px solid" borderColor={view === 'entries' ? 'brand.primary' : 'brand.neutral500'}>
								<Button borderRadius="4px" _hover={{backgroundColor: 'none'}} w="100%" rounded="none" bg="none" fontWeight={view === 'entries' ? 'bold' : 'normal'} fontSize="16px" marginTop="10px" onClick={() => setView('entries')}>
									Entries
								</Button>
							</Box>
							<Box borderBottom="3px solid" borderColor={view === 'fundingSettings' ? 'brand.primary' : 'brand.neutral500'}>
								<Button borderRadius="4px" _hover={{backgroundColor: 'none'}} w="100%" rounded="none" bg="none" fontWeight={view === 'fundingSettings' ? 'bold' : 'normal'} fontSize="16px" marginTop="10px" onClick={() => setView('fundingSettings')}>
									Funding Settings
								</Button>
							</Box>
							<Box borderBottom="3px solid" borderColor={view === 'projectSettings' ? 'brand.primary' : 'brand.neutral500'}>
								<Button borderRadius="4px" _hover={{backgroundColor: 'none'}} w="100%" rounded="none" bg="none" fontWeight={view === 'projectSettings' ? 'bold' : 'normal'} fontSize="16px" marginTop="10px" onClick={() => setView('projectSettings')}>
									Project Settings
								</Button>
							</Box>
						</Box>
						<Box width="100%" flex="1">
							{renderTabs()}
						</Box>

					</VStack>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack justifyContent="center" alignItems="flex-start" maxWidth="370px" spacing="10px">

					</VStack>
				</GridItem>
			</Grid>

		</Box>
	);
};
