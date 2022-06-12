import React, { useEffect } from 'react';
import { Box, Text, Link, VStack, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { ButtonComponent } from '../../components/ui';
import { Footer } from '../../components/molecules';
import { GrantCard } from './components/GrantCard';
import { QUERY_GRANTS } from '../../graphql';
import { ComingSoon } from './components/ComingSoon';
import BitcoinEducationImage from '../../assets/btcedu.svg';
import { isMobileMode, isMediumScreen, useNotification } from '../../utils';
import { IProject } from '../../interfaces';
import { SubscribeModal } from '../../components/nav/SubscribeModal';

export const GrantsLanding = () => {
	const isMobile = isMobileMode();
	const isMedium = isMediumScreen();
	const { toast } = useNotification();
	const {isOpen, onOpen, onClose} = useDisclosure();

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
			<Box pb={20} pt={isMobile ? 5 : 10}>
				<Box width={isMobile ? '90%' : isMedium ? '75%' : '60%'} margin="0 auto" my={5}>
					<Text fontSize="4xl" fontWeight="bold">Geyser Grants</Text>
					<Text fontSize="lg">Funds contributed to Geyser grants will be distributed monthly among the best applicants by the Grant Board based on a criteria focused around impact (read more <Link isExternal href="https://geyser.notion.site/Geyser-Grants-Applicants-fad8a130545d4597a3750a17a7ce301f" textDecoration="underline">here</Link>), while Geyser campaigns related to the Grant theme will be matched. Geyser will not charge any fees.</Text>
				</Box>

				<Box display="flex" justifyContent="center" alignItems="center" px={isMobile ? 0 : 20}>
					<Box overflow="auto" w={isMobile ? '95%' : '1376px'} display="flex" px={2}>
						{(!loading && grants.length > 0) && grants.map((grant: IProject) => {
							if (!grant.active) {
								return;
							}

							return (<GrantCard key={grant.id} project={grant} number="1" />);
						})}
						<ComingSoon title="Bitcoin Culture" image={BitcoinEducationImage} number="1" marginRight={true}/>
						<ComingSoon title="Bitcoin Developers" image={BitcoinEducationImage} number="1" />

					</Box>
				</Box>
				<Box display="flex" justifyContent="center">
					<VStack mt={10} w={isMobile ? '90%' : '404px'}>
						<Text fontWeight="bold" fontSize="2xl">Stay up to date with Geyser Grants</Text>
						<Text>Get news on new and upcoming Grants before anyone else.</Text>
						<ButtonComponent primary standard w="100%" onClick={onOpen}>Subscribe</ButtonComponent>
					</VStack>
				</Box>
				<SubscribeModal {...{isOpen, onClose}} />
			</Box>
			<Footer/>

		</>
	);
};
