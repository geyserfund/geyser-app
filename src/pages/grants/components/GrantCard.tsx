import React, { useEffect } from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { Blob } from 'react-blob';
import { SatoshiIcon } from '../../../components/icons';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';
import { useQuery } from '@apollo/client';
import Loader from '../../../components/ui/Loader';
import { useNotification } from '../../../utils';

interface GrantCardProps {
title: string,
link: string,
color1: string,
color2: string,
color3: string,
number: string,
status: string,
}

export const GrantCard = ({link, color1, color2, color3, number, status, title}:GrantCardProps) => {
	const history = useHistory();
	const { toast } = useNotification();

	const gotoGrant = () => {
		history.push(`/project/${link}`);
	};

	const { loading: projectsLoading, error, data } = useQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { name: link },
		},
	);

	const project = (data && data.getProjectByName && data.getProjectByName.project) || {};

	useEffect(() => {
		if (error) {
			toast({
				title: 'Something went wrong',
				description: 'Please refresh the page',
				status: 'error',
			});
		}
	}, [error]);

	return (

		<Box backgroundColor="white" p={10} boxShadow="lg" rounded="md" m={10} onClick={() => gotoGrant()} cursor="pointer">

			<Blob id="blob" size="8rem"
				style={{
					backgroundImage: `radial-gradient(ellipse at right, ${color1}, ${color2}, ${color3})`,
					margin: '0 auto',
					boxShadow: '0px 0px 30px 10px rgba(91, 91, 91, 0.25)',
				}}
			/>

			<HStack spacing="10px" mt={10}>
				<Text bg="brand.bgGrey" px={5} py={2} m={1} borderRadius="lg" fontWeight="bold">{number}</Text>
				<Text fontSize="lg" fontWeight="bold" color="brand.darkerPrimary">Grant {status}</Text>
			</HStack>

			<Text fontWeight="bold" fontSize="2xl">{title}</Text>

			{projectsLoading ? <Loader width="50%"/>
				: <>
					<HStack>
						<SatoshiIcon scale={0.8}/><Text fontWeight="bold">{`${project.balance}`}</Text>
						<Text>raised</Text>
					</HStack>

					<HStack>
						<Text fontWeight="bold">{project.fundingTxs.length}</Text>
						<Text>donations</Text>
					</HStack>
				</>
			}
		</Box>

	);
};
