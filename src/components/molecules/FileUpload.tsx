import { Box, ChakraComponent } from '@chakra-ui/react';
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { useSignedUpload } from '../../hooks';
interface IFileUpload {
	children: React.ReactNode,
	onUploadComplete: (url: string) => void
}

export const FileUpload = ({children, onUploadComplete }:IFileUpload) => {
	const upload = useSignedUpload({onUpload: onUploadComplete});

	const onDrop = useCallback(async acceptedFiles => {
		const file = acceptedFiles[0];
		upload(file);
	}, []);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, maxFiles: 1, accept: {'image/*': []}});

	return (
		<Box {...getRootProps()} width="100%">
			<input {...getInputProps()} />
			{children}
		</Box>
	);
};
