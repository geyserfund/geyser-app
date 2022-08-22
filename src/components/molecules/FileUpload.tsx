import { useLazyQuery } from '@apollo/client';
import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { QUERY_GET_SIGNED_URL } from '../../graphql/queries/posts';
import { useSignedUpload } from '../../hooks';
import { useNotification } from '../../utils';

interface IFileUpload {
	children: React.ReactNode,
	onUploadComplete: (url: string) => void
}

export const FileUpload = ({children, onUploadComplete}:IFileUpload) => {
	const upload = useSignedUpload({onUpload: onUploadComplete});

	const onDrop = useCallback(async acceptedFiles => {
		const file = acceptedFiles[0];
		upload(file);
	}, []);
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, maxFiles: 1, accept: {'image/*': []}});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
