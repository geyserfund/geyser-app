/* eslint-disable radix */

import React, { useEffect } from 'react';
import { Box, Text, HStack, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { SatoshiIcon } from '../../../components/icons';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';
import { useLazyQuery } from '@apollo/client';
import Loader from '../../../components/ui/Loader';
import { useNotification } from '../../../utils';
import { RecipientButton } from './RecipientButton';
import { isMobileMode } from '../../../utils';

interface GrantCardProps {
link: string,
number: string,
}

export const GrantCard = ({link, number}:GrantCardProps) => {
	const history = useHistory();
	const { toast } = useNotification();
	const isMobile = isMobileMode();

	const gotoGrant = () => {
		history.push(`/project/${link}`);
	};

	const [getProject, { loading, error, data }] = useLazyQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { where: { name: link } },
		},
	);

	useEffect(() => {
		try {
			getProject();
		} catch {
			if (error) {
				toast({
					title: 'Something went wrong',
					description: 'Please refresh the page',
					status: 'error',
				});
			}
		}
	}
	, []);

	let project = (data && data.project && data) || {};

	console.log(project);
	console.log('project.title:', project.active);

	project = {title: 'Bitcoin Education in Emerging Markets', description: 'Without the hard work of Bitcoin educators many of us today would not understand what is Bitcoin and why it’s important. With this grant we support people who are currently working on open source initiatives focused on Bitcoin education where it’s most needed: in emerging markets that are more often than not ravaged by inflation and depreciating savings. Yes, Bitcoin fixes this!', active: true, createdAt: Date.now(), sponsors: [{image: 'https://pbs.twimg.com/profile_images/1392218891322077192/16qp8f9S_400x400.jpg', id: 1}, {image: 'https://pbs.twimg.com/profile_images/1392218891322077192/16qp8f9S_400x400.jpg', id: 1}], media: ['https://storage.googleapis.com/geyser-projects-media/project/king/king_7.png']};

	const showCountdown = () => project.active && project.expiresAt;
	const daysLeft = Math.floor((parseInt(project.expiresAt) - Date.now()) / 86400000);
	const createdDate = new Date(parseInt(project.createdAt)).toLocaleDateString();

	return (

		<Box backgroundColor="white" p={2} boxShadow="lg" rounded="md" m={10}>

			<Box w={isMobile ? '275px' : '400px'}>
				{loading ? <Loader width="100%" h="800px"/>
					: <>
						<Box onClick={() => gotoGrant()} cursor="pointer">
							<Image w={isMobile ? '275px' : '400px'} h={isMobile ? '275px' : '400px'} objectFit="cover" src={project.media && project.media[0]} alt="grant" />

							<Text fontSize="xs" fontWeight="medium" color="#6E6E6E" my={2}>GRANT {number}: {createdDate}</Text>

							<Text fontWeight="bold" fontSize="3xl">{project.title}</Text>

							<Text>{project.description && project.description.length > 119 ? `${project.description.slice(0, 119)}...` : project.description}</Text>

							<HStack justifyContent="space-between" alignItems="center" my={3}>

								<Box>
									<HStack justifyContent="center">
										<SatoshiIcon scale={0.8}/><Text fontWeight="bold">{project.balance}</Text>
									</HStack>
									<Text fontSize="sm" color="#5B5B5B">COMMITTED</Text>
								</Box>

								<Box>
									<Text fontWeight="bold" textAlign="center">{project.grantees ? project.grantees.length : 0}</Text>
									<Text fontSize="sm" color="#5B5B5B" mt={1}>APPLICANTS</Text>
								</Box>

								<Box>
									<Box fontWeight="bold" textAlign="center">{showCountdown() ? daysLeft : 0}</Box>
									<Text fontSize="sm" color="#5B5B5B" mt={1}>DAYS LEFT</Text>
								</Box>

							</HStack>

							<Box>
								<Text fontSize="sm" color="#5B5B5B" textAlign="center">SPONSORED BY</Text>
								{project.sponsors
									? <HStack justifyContent="center">
										{project.sponsors.map((sponsor:any) => <Image src={sponsor.image} alt="sponsor" key={sponsor.id} w="25%"/>)}
									</HStack>
									: <Text textAlign="center">No sponsors yet.</Text>}
							</Box>
						</Box>
						<Box display="flex" justifyContent="center" w="100%" mt={2}>
							<RecipientButton title={`APPLICATIONS ${project.active ? 'OPEN' : 'CLOSED'}`} page="landing" active={project.active}/>
						</Box>
					</>
				}
			</Box>

		</Box>

	);
};
