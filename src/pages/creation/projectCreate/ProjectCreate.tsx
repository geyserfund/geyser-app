import { Box, Grid, GridItem, HStack, Image, Input, InputGroup, InputRightAddon, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FileUpload } from '../../../components/molecules';
import { ButtonComponent, Card, ImageWithReload, TextArea, TextBox } from '../../../components/ui';
import { isMobileMode, isValidLighteningAddress, useNotification, validateEmail, validLighteningAddress } from '../../../utils';
import {AiOutlineUpload} from 'react-icons/ai';
import { TProjectDetails } from './types';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { createUseStyles } from 'react-jss';
import { colors, GeyserAssetDomainUrl, GeyserSkeletonUrl } from '../../../constants';
import { useHistory, useParams } from 'react-router';
import TitleWithProgressBar from '../../../components/molecules/TitleWithProgressBar';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MUTATION_CREATE_PROJECT, MUTATION_UPDATE_PROJECT } from '../../../graphql/mutations';
import { useAuthContext } from '../../../context';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';

const useStyles = createUseStyles({
	backIcon: {
		fontSize: '25px',
	},
});

export const ProjectCreate = () => {
	const isMobile = isMobileMode();
	const classes = useStyles();

	const params = useParams<{projectId: string}>();
	const isEdit = Boolean(params.projectId);

	const history = useHistory();
	const {toast} = useNotification();

	const {user} = useAuthContext();

	const [form, setForm] = useState<TProjectDetails>({title: '', description: '', image: '', email: '', name: ''});
	const [formError, setFormError] = useState<{[key: string]: string}>({});

	const [createProject, { loading: createLoading}] = useMutation(MUTATION_CREATE_PROJECT, {
		onCompleted(data) {
			history.push(`/launch/${data.createProject.id}/milestones`);
		},
		onError(error) {
			toast({
				title: 'project creation failed!',
				description: `${error}`,
				status: 'error',
			});
		},
	});

	const [updateProject, { loading: updateLoading}] = useMutation(MUTATION_UPDATE_PROJECT, {
		onCompleted() {
			history.push(`/launch/${params.projectId}/milestones`);
		},
		onError(error) {
			toast({
				title: 'project update failed!',
				description: `${error}`,
				status: 'error',
			});
		},
	});

	const [getProject, { loading: getProjectLoading }] = useLazyQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { where: { name: form.name } },
			onCompleted(data) {
				console.log('chekcing data', data);
				if (data && data.project && data.project.id) {
					setFormError({...formError, name: 'This lightening address is already taken.' });
				}
			},
		},
	);

	const [getProjectById, { loading }] = useLazyQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { where: { id: params.projectId } },
			onCompleted(data) {
				setForm({
					title: data.project.title,
					name: data.project.name,
					image: data.project.media[0],
					description: data.project.description,
					email: user.email || '',
				});
			},
		},
	);

	useEffect(() => {
		getProjectById();
	}, [params.projectId]);

	const handleChange = (event: any) => {
		if (event) {
			const {name, value} = event.target;

			const newForm = {...form, [name]: value || ''};
			console.log('checkign is edit', isEdit);
			if (name === 'title' && !isEdit) {
				const projectName: string = value.split(' ').join('').toLowerCase();
				const sanitizedName = projectName.replaceAll(validLighteningAddress, '');

				newForm.name = sanitizedName;
			}

			setForm(newForm);
			if (name === 'title' && value.length > 50) {
				setFormError({title: `max character allowed is 50/${value.length}`});
			} else if (name === 'description' && value.length > 280) {
				setFormError({description: `max character allowed is 280/${value.length}`});
			} else {
				setFormError({});
			}
		}
	};

	// const projectName = form.title.split(' ').join('').toLowerCase();

	const handleUpload = (url: string) => {
		setForm({...form, image: `${GeyserAssetDomainUrl}${url}`});
	};

	const handleNext = () => {
		const isValid = validateForm();

		const newForm = form;
		newForm.email = user.email || form.email;
		if (isValid) {
			if (isEdit) {
				updateProject({ variables: { input: {
					projectId: params.projectId,
					title: form.title,
					image: form.image,
					description: form.description,
				} } });
			} else {
				createProject({ variables: { input: form } });
			}
		}
	};

	const validateForm = () => {
		const errors: any = {};
		let isValid = true;
		if (!form.title) {
			errors.title = 'title is a required field';
			isValid = false;
		} else if (form.title.length < 5 || form.title.length > 50) {
			errors.title = 'title should be between 5 and 50 characters';
			isValid = false;
		}

		if (!form.description) {
			errors.description = 'Project objective is a required field';
			isValid = false;
		}

		if (!form.email && !user.email) {
			errors.email = 'Email address is a required field.';
			isValid = false;
		} else if (!user.email && !validateEmail(form.email)) {
			errors.email = 'Please enter a valid email address.';
			isValid = false;
		}

		if (!isValid) {
			setFormError(errors);
		}

		return isValid;
	};

	const handleBack = () => {
		history.push('/launch');
	};

	const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

	return (
		<Box
			background={'brand.bgGrey4'}
			position="relative"
			paddingTop="60px"
			height="100%"
			justifyContent="space-between"
		>
			<Grid width="100%" templateColumns={isLargerThan1280 ? 'repeat(6, 1fr)' : isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)' } padding={isMobile ? '10px' : '40px 40px 20px 40px'} >
				<GridItem colSpan={isLargerThan1280 ? 2 : 1} display="flex" justifyContent="flex-start">
					<ButtonComponent onClick={handleBack} leftIcon={<BiLeftArrowAlt className={classes.backIcon} />}>  Back</ButtonComponent>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack
						spacing="30px"
						width="100%"
						maxWidth="400px"
						minWidth="350px"
						marginBottom="40px"
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
					>
						<VStack width="100%" spacing="40px" alignItems="flex-start">
							<Text color="brand.gray500" fontSize="30px" fontWeight={700}> Create a new Project</Text>
							<TitleWithProgressBar
								paddingBottom="20px"
								title="Project details"
								subTitle="Step 1 of 3"
								percentage={33}
							/>
						</VStack>
						<VStack width="100%" alignItems="flex-start">
							<VStack width="100%" alignItems="flex-start">
								<Text>
								Project Title
								</Text>
								<TextBox
									name="title"
									onChange={handleChange}
									value={form.title}
									error={formError.title}
									onBlur={() => !isEdit && getProject()}
								/>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Lightening Address Preview</Text>
								<InputGroup size="md" borderRadius="4px">
									<Input
										name="name"
										onChange={handleChange}
										value={form.name}
										isInvalid={Boolean(formError.name)}
										focusBorderColor={colors.primary}
										disabled={isEdit}
										onBlur={() => !isEdit && getProject()}
									/>
									<InputRightAddon>@geyser.fund</InputRightAddon>
								</InputGroup>
								{formError.name && <Text color="brand.error" fontSize="12px">{formError.name}</Text>}
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Project Image</Text>
								<FileUpload onUploadComplete={handleUpload} >
									<HStack
										borderRadius="4px"
										backgroundColor="brand.bgGrey"
										width="100%"
										height="70px"
										justifyContent="center"
										alignItems="center"
										_hover={{backgroundColor: 'brand.gray300'}}
									>
										<AiOutlineUpload />
										<Text>Select a header image</Text>
									</HStack>
								</FileUpload>
							</VStack>
							<VStack width="100%" alignItems="flex-start">
								<Text>Main Objective</Text>
								<TextArea
									name="description"
									value={form.description}
									onChange={handleChange}
									error={formError.description}
								/>
							</VStack>

							<VStack width="100%" alignItems="flex-start">
								<Text>Project E-mail</Text>
								<TextBox
									name="email"
									value={user.email || form.email}
									onChange={handleChange}
									error={formError.email}
									isDisabled={Boolean(user.email)}
								/>
							</VStack>
							<ButtonComponent isLoading={loading} primary isFullWidth onClick={handleNext}>Next</ButtonComponent>
						</VStack>

					</VStack>
				</GridItem>
				<GridItem colSpan={2} display="flex" justifyContent="center">
					<VStack justifyContent="center" alignItems="flex-start" maxWidth="370px" spacing="10px">
						<Text>Preview</Text>
						<Card padding="16px 10px" overflow="hidden" width="100%">
							{
								form.image ? <ImageWithReload src={form.image} height="222px" width="350px"/>
									: <Image
										src={GeyserSkeletonUrl}
										maxHeight="500px"
										height="222px"
										width="350px"
									/>
							}
							<Text>geyser.fund/project</Text>
							<Text fontSize="28px" fontWeight={700} >{form.title || 'Project Title'}</Text>
							<Text fontSize="16px" color="brand.textGrey" wordBreak="break-word" isTruncated>{form.description || 'project description'}</Text>
						</Card>
					</VStack>
				</GridItem>
			</Grid>

		</Box>
	);
};
