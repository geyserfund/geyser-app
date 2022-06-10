import React, { useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { QUERY_GRANTS } from '../../graphql';
import { ComingSoon } from './components/ComingSoon';
import BitcoinEducationImage from '../../assets/btcedu.svg';
import { isMobileMode, useNotification } from '../../utils';
import { IProject } from '../../interfaces';

export const GrantsLanding = () => {
	const isMobile = isMobileMode();
	const { toast } = useNotification();

	const { loading, error, data } = useQuery(QUERY_GRANTS, {
		variables: { where: { type: 'grant' }},
	});

	const grants = (data && data.projects.projects) || [];

	useEffect(() => {
		if (error) {
			toast({
				title: 'Could not load projects',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	return (
		<>

			<Box width={isMobile ? '75%' : '50%'} margin="0 auto" mt={5}>
				<Text fontSize="4xl" fontWeight="bold">Geyser Grants</Text>
				<Text>It’s not always easy for individuals and institutions to donate to single geyserfund campaigns. So, with Grants anyone can now contribute to a particular cause without having to look in detail into every specific project and verify the creator’s credentials. The Geyser Fund Board will look at and beyond geyserfund campaigns to select the most impactful projects that support these causes.</Text>
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center">
				<Box overflow="auto" w={isMobile ? '75%' : '50%'} display="flex">
					{(!loading && grants.length > 0) && grants.map((grant: IProject, index: number) => {
						if (!grant.active) {
							return;
						}

						return (<GrantCard key={grant.id} project={grant} number={`#00${index}`} />);
					})}
					<ComingSoon title="Bitcoin Gaming Grant" image={BitcoinEducationImage} number="#001" date="6/7/2022"/>
					<ComingSoon title="Bitcoin Gaming Grant" image={BitcoinEducationImage} number="#002" date="6/7/2022"/>

				</Box>
			</Box>

			<Footer/>

		</>
	);
};
