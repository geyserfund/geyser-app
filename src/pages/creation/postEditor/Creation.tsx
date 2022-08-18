import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react';

import { Editor } from './Editor';
import { isMobileMode, useNotification } from '../../../utils';
import { CreateNav } from './CreateNav';
import { BsImage } from 'react-icons/bs';
import { useLazyQuery, useMutation } from '@apollo/client';
import { MUTATION_CREATE_POST, MUTATION_UPDATE_POST } from '../../../graphql/mutations/posts';
import { IPostCreateInput, IPostUpdateInput } from '../../../interfaces/posts';
import { IPost, TcreateEntry, TEntry } from './types';
import { useDebounce } from '../../../hooks';
import { useHistory, useParams } from 'react-router';
import { QUERY_GET_POST } from '../../../graphql/queries/posts';

export const defaultEntry = { id: 0, title: '', description: '', image: '', content: '', published: false, type: 'article' };

export const Creation = () => {
	const isMobile = isMobileMode();
	const { toast } = useNotification();
	const history = useHistory();
	const params = useParams<{ postId: string }>();

	const [_form, _setForm] = useState<TEntry>(defaultEntry);
	const form = useRef(_form);
	const setForm = (value: TEntry) => {
		form.current = value;
		_setForm(value);
	};

	const debouncedUpdateEntry = useDebounce(form.current, 1000);

	const [createPost, {
		data: createData, loading: createPostLoading,
	}] = useMutation(MUTATION_CREATE_POST);

	const [updatePost, {
		data: updateData, loading: updatePostLoading,
	}] = useMutation(MUTATION_UPDATE_POST);

	const [getPost, { loading: loadingPosts, error, data: entryData }] = useLazyQuery(QUERY_GET_POST);

	useEffect(() => {
		if (params && params.postId) {
			try {
				getPost({ variables: { id: parseInt(params.postId, 10) } });
			} catch (error) {
				history.push('/404');
			}
		}
	}, [params]);

	useEffect(() => {
		if (entryData && entryData.entry) {
			console.log('checking entry Data', entryData);
			setForm(entryData.entry);
		}
	}, [entryData]);

	useEffect(() => {
		if (createData && createData.createEntry) {
			console.log('checking createdata Data', createData.createEntry);
			setForm(createData.createEntry);
		}
	}, [createData]);

	useEffect(() => {
		if (debouncedUpdateEntry && debouncedUpdateEntry.id) {
			handleUpdateEntry(debouncedUpdateEntry);
		}
	}, [debouncedUpdateEntry]);

	const projectId = 1;

	const handleCreateEntry = async (params: TcreateEntry) => {
		if (!form.current || !form.current.id) {
			if (form.current.content || form.current.title || form.current.description || form.current.image) {
				const input: IPostCreateInput = {
					projectIds: [projectId],
					type: 'article',
					...params,
				};
				try {
					await createPost({ variables: { input } });
				} catch (error) {
					toast({
						title: 'Post creation failed',
						description: 'Please try again later',
						status: 'error',
					});
				}
			}
		}
	};

	const handleUpdateEntry = async (params: TcreateEntry) => {
		const { image, title, description, content } = params;
		if (form) {
			const input: IPostUpdateInput = {
				entryId: form.current.id,
				title,
				description,
				content,
				image,
			};
			try {
				await updatePost({ variables: { input } });
			} catch (error) {
				toast({
					title: 'Post update failed',
					description: 'Please try again later',
					status: 'error',
				});
			}
		}
	};

	const handleContentUpdate = (name: string, value: string) => {
		const newForm = { ...form.current, [name]: value };
		console.log('checking handleContent update Data', newForm);
		setForm(newForm);
		handleCreateEntry(newForm);
	};

	const handleInput = (event: any) => {
		const { name, value } = event.target;
		if (name) {
			const newForm = { ...form.current, [name]: value };
			console.log('checking handleContent handleInput Data', newForm);
			setForm(newForm);
			handleCreateEntry(newForm);
		}
	};

	const onSave = () => {
		handleUpdateEntry(form.current);
	};

	const onPreview = () => {
		if (form.current && form.current.id) {
			history.push(`/create/${form.current.id}/preview`);
		} else {
			toast({
				title: 'Cannot preview',
				description: 'Please edit your content before preview',
				status: 'info',
			});
		}
	};

	console.log('checking form', form);
	return (
		<>
			<CreateNav isSaving={createPostLoading || updatePostLoading} onSave={onSave} onPreview={onPreview} />
			<VStack
				background={'brand.bgGrey4'}
				position="relative"
				paddingTop={isMobile ? '61px' : '71px'}
				height="100%"
				justifyContent="space-between"
			>
				<Box
					width="100%"
					height="100%"
					display="flex"
					justifyContent="center"
					overflowY="auto"
				>
					<VStack
						spacing="20px"
						width="100%"
						height="100%"
						maxWidth="1080px"
						padding={isMobile ? '0px 10px' : '0px 40px'}
						display="flex"
						flexDirection="column"
						alignItems="flex-start"
						paddingBottom="80px"
					>
						<HStack marginTop="20px" width="100%" minHeight="65px" borderRadius="4px" backgroundColor="brand.bgGrey" justifyContent="center">
							<BsImage />
							<Text> Select a header image</Text>
						</HStack>
						<Input
							border="none"
							_focus={{ border: 'none' }}
							placeholder="Title"
							color="brand.gray500"
							fontSize="40px"
							fontWeight={700}
							marginTop="20px"
							name="title"
							value={form.current.title}
							onChange={handleInput}
						/>
						<Input
							border="none"
							_focus={{ border: 'none' }}
							placeholder="Summary of your project idea"
							color="brand.gray500"
							fontSize="26px"
							fontWeight={600}
							name="description"
							value={form.current.description}
							onChange={handleInput}
						/>

						<Box flex={1} width="100%" >
							<Editor handleChange={handleContentUpdate} value={form.current.content} name="content" />
						</Box>
					</VStack>
				</Box>
			</VStack >

		</>

	);
};
