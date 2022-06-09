import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { ComingSoon } from './components/ComingSoon';
import BitcoinEducationImage from '../../assets/btcedu.svg';
import { isMobileMode } from '../../utils';

export const GrantsLanding = () => {
	const isMobile = isMobileMode();

	return (
		<>

			<Box width={isMobile ? '75%' : '50%'} margin="0 auto" mt={5}>
				<Text fontSize="4xl" fontWeight="bold">Geyser Grants</Text>
				<Text>It’s not always easy for individuals and institutions to donate to single geyserfund campaigns. So, with Grants anyone can now contribute to a particular cause without having to look in detail into every specific project and verify the creator’s credentials. The Geyser Fund Board will look at and beyond geyserfund campaigns to select the most impactful projects that support these causes.</Text>
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center">
				<Box overflow="auto" w={isMobile ? '75%' : '50%'} display="flex">

					<GrantCard link="bitcoin-education-in-emerging-markets" number="#001" />
					<GrantCard link="bitcoin-education-in-emerging-markets" number="#001" />
					<GrantCard link="bitcoin-education-in-emerging-markets" number="#001" />
					<ComingSoon title="Bitcoin Gaming Grant" image={BitcoinEducationImage} number="#002" date="6/7/2022"/>
					<ComingSoon title="Bitcoin Gaming Grant" image={BitcoinEducationImage} number="#002" date="6/7/2022"/>
					<ComingSoon title="Bitcoin Gaming Grant" image={BitcoinEducationImage} number="#002" date="6/7/2022"/>

				</Box>
			</Box>

			<Footer/>

		</>
	);
};
