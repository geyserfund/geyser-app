import { useLazyQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { customHistory } from '../../config';
import { QUERY_GET_PROJECT } from '../../graphql';
import { NotFound } from '../notFound';
import Activity from './Activity/Activity';
import Details from './Details';

export const Project = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const { state } = useLocation<{ loggedOut?: boolean }>();

	const [detailOpen, setDetailOpen] = useState(true);

	useEffect(() => {
		try {
			getProject();
		} catch (_) {
			customHistory.push('/not-found');
		}
	}, [state]);

	const [getProject, { loading, error, data }] = useLazyQuery(QUERY_GET_PROJECT,
		{
			variables: { name: projectId },
		},
	);

	if (loading) {
		return (
			<Loader />
		);
	}

	if (error || !data || !data.getProjectByName.success) {
		return <NotFound />;
	}

	const { project } = data && data.getProjectByName;
	const rewards = [
		{
			id: 1,
			price: 60,
			backers: 23,
			title: 'Bitcoin Board Game',
			Description: 'Get the Game',
		},
		{
			id: 2,
			price: 60,
			backers: 23,
			title: 'Bitcoin Board Game',
			Description: 'Get the Game',
		},
		{
			id: 3,
			price: 60,
			backers: 23,
			title: 'Bitcoin Board Game',
			Description: 'Get the Game',
		},
		{
			id: 4,
			price: 60,
			backers: 23,
			title: 'Bitcoin Board Game',
			Description: 'Get the Game',
		},
	];
	return (
		<>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				height="100%"
			>
				<Box
					width="100%"
					height="100%"
					display="flex"
					overflow="hidden"
					position="relative"

				>
					<Details project={{...project, rewards} } {...{detailOpen, setDetailOpen}}/>
					<Activity project={{...project, rewards}} {...{detailOpen, setDetailOpen}}/>
				</Box>
			</Box>
		</>
	);
};
