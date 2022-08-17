import { useLazyQuery, useMutation } from '@apollo/client';
import { Image, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonComponent, TextBox } from '../../../components/ui';
import Loader from '../../../components/ui/Loader';
import { MUTATION_UPDATE_POST } from '../../../graphql/mutations/posts';
import { QUERY_GET_POST } from '../../../graphql/queries/posts';
import { isMobileMode, useNotification } from '../../../utils';
import { CreateNav } from '../postEditor/CreateNav';
import { IPost, TEntry } from '../postEditor/types';

export const PostPreview = () => {
	const params = useParams<{ postId: string }>();

	const isMobile = isMobileMode();
	const { toast } = useNotification();

	const [entry, setEntry] = useState<TEntry>();
	const [getPost, { loading: loadingPosts, error, data: entryData }] = useLazyQuery(QUERY_GET_POST);
	const [updatePost, {
		data: updateData, loading: updatePostLoading,
	}] = useMutation(MUTATION_UPDATE_POST);

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

	const handleUpdateEntry = async (params: TEntry) => {
		if (entry) {
			try {
				await updatePost({ variables: { input: params } });
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
			handleUpdateEntry(entry);
		}
	};

	if (loadingPosts) {
		return <Loader />;
	}

	return (
		<>
			<CreateNav isSaving={updatePostLoading} onSave={onSave} />
			<VStack
				background={'brand.bgGrey4'}
				position="relative"
				paddingTop={isMobile ? '61px' : '71px'}
				height="100%"
				justifyContent="space-between"
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
					<Text>Publish Post</Text>
					<VStack>
						<Text>Edit Social Preview </Text>
						<Image />
						<Text>geyser.fund/bellicosian</Text>
						<Text>I wrote a nice storuy</Text>
						<Text>Description</Text>
					</VStack>
					<VStack>
						<Text>Linked project</Text>
						<Text>Where should Satoshi donations go to?</Text>
						<TextBox />
					</VStack>
					<ButtonComponent primary>
						Publish
					</ButtonComponent>
				</VStack>
			</VStack >

		</>
	);
};
