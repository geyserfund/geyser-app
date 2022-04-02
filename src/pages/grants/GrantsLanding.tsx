import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Footer } from '../../components/molecules';
import { ComingSoon } from './components/ComingSoon';
import { GrantCard } from './components/GrantCard';

export const GrantsLanding = () => (
	<>

		<Box width="85%" margin="0 auto" mt={10}>
			<Text fontSize="4xl">Geyser Grants</Text>
			<Text>Grants makes it easy for anyone to contribute to a particular cause without having to look in detail at every project. The Geyser Fund Board will search within and beyond Geyser fund campaigns to select the most impactful projects.</Text>
		</Box>

		<Box display="flex" justifyContent="center" alignItems="center" backgroundColor="brand.bgGrey2" py={20} mt={12} mb={20} mx={[0, 20]} rounded="md">
			<Box flexWrap="wrap" display="flex" justifyContent="center" alignItems="center">

				<GrantCard title="Bitcoin Hackathons" link="bitcoin-hackathons" color1="rgba(32, 236, 199)" color2="rgba(27, 213, 179)" color3="#E9E9E9" number="#001" status="open" />
				<ComingSoon title="Bitcoin Education"/>
				<ComingSoon title="Bitcoin Nonprofits"/>
				<ComingSoon title="Bitcoin Culture"/>
				<ComingSoon title="Bitcoin Development"/>

			</Box>
		</Box>

		<Footer/>

	</>
);
