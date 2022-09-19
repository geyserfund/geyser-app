import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useAuthContext } from '../../context';
import { QUERY_PROJECT_BY_NAME } from '../../graphql';

export const ProjectDashboard = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const { state } = useLocation<{ loggedOut?: boolean }>();
	const history = useHistory();

	const {user, setNav} = useAuthContext();

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
	return (
		<div>ProjectDashboard</div>
	);
};
