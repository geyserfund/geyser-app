import React, { useEffect, useState } from 'react';
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react';

import { Editor } from './Editor';
import { debounce, isMobileMode } from '../../utils';
import { CreateNav } from './CreateNav';
import { BsImage } from 'react-icons/bs';
import { useAuthContext } from '../../context';
import { useMutation } from '@apollo/client';
import { MUTATION_CREATE_POST } from '../../graphql/mutations/posts';
import { IPostCreateInput, IPostUpdateInput } from '../../interfaces/posts';
import { TcreateEntry } from './types';

interface IPost {
	id?: string;
	title?: string;
	content?: string;
	description?: string;
	image?: string
}

export const Creation = () => {
	const isMobile = isMobileMode();

	const [form, setForm] = useState<IPost>({});

	const [createPost, {
		data: createData, loading: createPostLoading,
	}] = useMutation(MUTATION_CREATE_POST);

	const [updatePost, {
		data: updateData, loading: updatePostLoading,
	}] = useMutation(MUTATION_CREATE_POST);

	const projectId = 1;

	const handleCreateEntry = (params: TcreateEntry) => {
		const input: IPostCreateInput = {
			projectIds: [projectId],
			type: 'post',
			...params,
		};
		createPost({ variables: { input } });
	};

	const handleUpdateEntry = (params: TcreateEntry) => {
		const input: IPostUpdateInput = {
			entryId: createData.id,
			...params,
		};
		updatePost({ variables: { input } });
	};

	const handleContentUpdate = (name: string, value: string) => {
		setForm({ ...form, [name]: value });
	};

	const handleInput = (event: any) => {
		const { name, value } = event.target;
		if (name) {
			setForm({ ...form, [name]: value });
		}
	};

	useEffect(() => {
		if (!form.id) {
			if (form.content || form.title || form.description || form.image) {
				handleCreateEntry(form);
			}
		} else {
			debounce(() => handleUpdateEntry, 1000);
		}
	}, [form]);

	return (
		<>
			<CreateNav />
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
						<HStack marginTop="20px" width="100%" height="65px" borderRaidus="4px" backgroundColor="brand.bgGrey" justifyContent="center">
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
							onChange={handleInput}
						/>

						<Box flex={1} width="100%" >
							<Editor handleChange={handleContentUpdate} value={form.content} name="content" />
						</Box>
					</VStack>
				</Box>
			</VStack >

		</>

	);
};
