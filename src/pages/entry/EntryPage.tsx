import { useLazyQuery, useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import Loader from '../../components/ui/Loader';
import { customHistory } from '../../config';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';
import { NotFound } from '../notFound';
import Activity from '../project/Activity/Activity';
import { useFundingFlow } from '../../hooks';
import { useAuthContext } from '../../context';
import { QUERY_GET_POST } from '../../graphql/queries/posts';
import { EntryContainer } from './EntryContainer';

export const EntryPage = () => {
	const { postId } = useParams<{ postId: string }>();
	const { state } = useLocation<{ loggedOut?: boolean }>();
	const history = useHistory();

	const {setNavTitle} = useAuthContext();

	const [detailOpen, setDetailOpen] = useState(true);
	const fundingFlow = useFundingFlow();
	const { setFundState } = fundingFlow;

	useEffect(() => {
		if (postId) {
			getEntry({variables: { id: postId }});
		}
	}, [postId]);

	const [getEntry, { loading: loadingPosts, error, data: entryData }] = useLazyQuery(QUERY_GET_POST,
		{
			onCompleted(data) {
				const {entry} = data;

				getProject({variables: { where: { id: entry.project.id } }});
			},
			onError(error) {
				history.push('/404');
			},
		},
	);

	const [getProject, { loading, error: projectError, data: projectData }] = useLazyQuery(QUERY_PROJECT_BY_NAME,
		{
			onCompleted(data) {
				setNavTitle(data.project.title);
			},
		},
	);

	if (loadingPosts || loading || !projectData) {
		return (
			<Loader />
		);
	}

	if (error || !entryData || !entryData.entry || projectError) {
		return <NotFound />;
	}

	const project = projectData && projectData.project;
	const entry = entryData && entryData.entry;

	console.log('checking project data', project);

	return (
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
				bg="brand.bgGrey4"
			>
				<EntryContainer entry={entry} {...{detailOpen, setDetailOpen, setFundState }}/>
				<Activity project={project} {...{detailOpen, setDetailOpen, fundingFlow }}
					resourceType="entry"
					resourceId={parseInt(postId, 10)}
				/>
			</Box>
		</Box>

	);
};
