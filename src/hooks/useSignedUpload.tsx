import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { QUERY_GET_SIGNED_URL } from '../graphql/queries/posts';
import { useNotification } from '../utils';

export const useSignedUpload = ({onUpload}:{onUpload: (url: string) => void}) => {
	const {toast} = useNotification();

	const [getSignedUrl, {data: urlData}] = useLazyQuery(QUERY_GET_SIGNED_URL);
	const [currentFile, setCurrentFile] = useState<any>();

	useEffect(() => {
		if (urlData && urlData.getSignedUploadUrl && currentFile) {
			handleFileUpload();
		}
	}, [urlData, currentFile]);

	const handleFileUpload = () => {
		if (urlData && urlData.getSignedUploadUrl && currentFile) {
			try {
				fetch(urlData.getSignedUploadUrl.uploadUrl, {
					method: 'PUT',
					body: currentFile,
					headers: {
						'Content-Type': currentFile.type,
					},
				}).then(() => onUpload(urlData.getSignedUploadUrl.distributionUrl));
				// console.log('checking urlData', urlData);
				// onUploadComplete(urlData.getSignedUploadUrl.distributionUrl);
			} catch (error) {
				console.log('checking error', error);
				toast({
					title: 'failed to upload image',
					description: 'Please try again',
					status: 'error',
				});
			}
		}
	};

	const uploadFile = (file: any) => {
		setCurrentFile(file);
		getSignedUrl({variables: {input: {name: file.name, type: file.type}}});
	};

	return uploadFile;
};
