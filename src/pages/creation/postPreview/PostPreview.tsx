import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Box, Image, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router';
import { ButtonComponent, TextBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { useAuthContext } from '../../../context';
import { QUERY_PROJECT_BY_NAME } from '../../../graphql';
import { MUTATION_PUBLISH_POST, MUTATION_UPDATE_POST } from '../../../graphql/mutations/posts';
import { QUERY_GET_POST } from '../../../graphql/queries/posts';
import { IPostUpdateInput } from '../../../interfaces/posts';
import { isMobileMode, useNotification } from '../../../utils';
import { defaultEntry } from '../postEditor';
import { CreateNav } from '../postEditor/CreateNav';
import { TEntry } from '../postEditor/types';

let isEdited = false;

export const PostPreview = () => {
	const params = useParams<{ postId: string, projectId: string }>();

	const isMobile = isMobileMode();
	const { toast } = useNotification();
	const history = useHistory();
	const {setNavTitle} = useAuthContext();

	const [isPublished, setIsPublished] = useState(false);

	const [entry, setEntry] = useState<TEntry>(defaultEntry);
	const [getPost, { loading: loadingPosts, error, data: entryData }] = useLazyQuery(QUERY_GET_POST);
	const [updatePost, {
		data: updateData, loading: updatePostLoading,
	}] = useMutation(MUTATION_UPDATE_POST);

	const [publishPost, publishData] = useMutation(MUTATION_PUBLISH_POST);

	const { loading, data: projectData } = useQuery(QUERY_PROJECT_BY_NAME,
		{
			variables: { where: { name: params.projectId } },
			onCompleted(data) {
				setNavTitle(data.project.title);
			},
			onError() {
				history.push('/404');
			},
		},
	);

	useEffect(() => {
		if (params && params.postId) {
			getPost({ variables: { id: params.postId } });
		}
	}, [params]);

	useEffect(() => {
		if (entryData && entryData.entry) {
			setEntry(entryData.entry);
		}
	}, [entryData]);

	const handleUpdateEntry = async () => {
		if (entry) {
			const { image, title, description, content, id } = entry;
			try {
				const input: IPostUpdateInput = {
					entryId: id,
					title,
					description,
					content,
					image,
				};
				await updatePost({ variables: { input } });
				isEdited = false;
			} catch (error) {
				toast({
					title: 'Post update failed',
					description: 'Please try again later',
					status: 'error',
				});
			}
		}
	};

	const onSave = () => {
		if (entry) {
			handleUpdateEntry();
		}
	};

	const onBack = () => {
		history.push(`/projects/${params.projectId}/posts/${params.postId}`);
	};

	const handleInput = (event: any) => {
		const { name, value } = event.target;
		if (name) {
			const newForm = { ...entry, [name]: value };
			console.log('checking handleContent handleInput Data', newForm);
			setEntry(newForm);
			isEdited = true;
		}
	};

	const handlePublish = async () => {
		try {
			if (isEdited) {
				await handleUpdateEntry();
			}

			await publishPost({variables: {id: entry.id}});
		} catch (error) {
			toast({
				title: 'Post publish failed',
				description: 'Please try again later',
				status: 'error',
			});
		}

		setIsPublished(true);
	};

	if (loadingPosts || loading) {
		return <Loader />;
	}

	return (
		<>
			<CreateNav isSaving={updatePostLoading} onSave={onSave} onBack={onBack} />
			<VStack
				background={'brand.bgGrey4'}
				position="relative"
				paddingTop={isMobile ? '150px' : '130px'}
				height="100%"
				alignItems="center"
				justifyContent="center"
			>
				<VStack
					spacing="20px"
					width="100%"
					// height="100%"
					maxWidth="400px"
					padding={'0px 10px'}
					display="flex"
					flexDirection="column"
					alignItems="flex-start"
					paddingBottom="80px"
				>
					<Text fontSize="33px" fontWeight={600} color="brand.gray500">{isPublished ? 'Share post' : 'Publish Post'}</Text>
					{
						isPublished && <VStack width="100%" alignItems="center">
							<Box borderRadius="50%" backgroundColor="brand.primary" padding="10px">
								<BsCheckLg />
							</Box>
							<Text>Your post is live!</Text>
						</VStack>
					}
					<VStack alignItems="flex-start">
						<Text color="brand.gray500">Edit Social Preview </Text>
						<Box height="220px" width="350px" overflow="hidden">
							<Image src={entry.image} height="350px" width="350px" objectFit="cover" />
						</Box>
						<Text fontSize="11px" color="brand.gray500">geyser.fund/bellicosian</Text>
						<Input
							border="none"
							_focus={{ border: 'none' }}
							placeholder="Title"
							color="brand.gray500"
							fontSize="28px"
							fontWeight={700}
							marginTop="20px"
							paddingX="0"
							name="title"
							value={entry.title}
							onChange={handleInput}
							disabled={isPublished}
						/>
						<Input
							border="none"
							_focus={{ border: 'none' }}
							placeholder="Title"
							color="brand.gray500"
							fontSize="16px"
							fontWeight={700}
							marginTop="0px"
							paddingX="0"
							name="description"
							value={entry.description}
							onChange={handleInput}
							disabled={isPublished}
						/>
					</VStack>
					{!isPublished && <VStack alignItems="flex-start" width="100%">
						<Text>Linked project</Text>
						<Text>Where should Satoshi donations go to?</Text>
						<TextBox
							isDisabled
							value={`${projectData.project.name}@geyser.fund`}
						/>
					</VStack>}
					{isPublished
						? <VStack width="100%">
							<ButtonComponent isFullWidth onClick={handlePublish}>Share on Twitter</ButtonComponent>
							<ButtonComponent primary isFullWidth onClick={handlePublish}>Go to Post</ButtonComponent>
						</VStack>
						: <ButtonComponent primary isFullWidth onClick={handlePublish}>
							Publish
						</ButtonComponent>
					}

				</VStack>
			</VStack >

		</>
	);
};
