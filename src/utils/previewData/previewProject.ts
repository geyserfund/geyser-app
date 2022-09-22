import { IProject } from '../../interfaces/project';
import { Craig } from '../../pages/project/ProjectCollection/Craig';

const previewProject: IProject = {
	id: 'preview--id',
	title: 'preview--title',
	name: Craig.projectName,
	description: Craig.projectDetails.idea,
	type: 'reward',
	balance: 0,
	fundingGoal: 0,
	createdAt: 'preview--createdAt',
	updatedAt: 'preview--updatedAt',
	expiresAt: 'preview--expiresAt',
	active: false,
	ownerConfirmed: 'preview--ownerConfirmed',
	fundsClaimed: 'preview--fundsClaimed',
	creationConfirmed: 'preview--creationConfirmed',
	media: [],
	owners: [
		{
			user: {
				id: 1,
				username: 'username',
				imageUrl: 'imageURL',
				email: undefined,
				externalAccounts: [],
			},
			confirmed: true,
		},
	],
	ambassadors: [],
	funders: [],
	sponsors: [],
	grantees: [],
	fundingTxs: [],
};

export default previewProject;
