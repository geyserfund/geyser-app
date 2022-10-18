import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { API_SERVICE_ENDPOINT, GeyserAssetDomainUrl } from '../constants';
import { QUERY_GET_SIGNED_URL } from '../graphql/queries/entries';
import { testImage, useNotification } from '../utils';

type FileUploadURL = string;
type FileUploadFile = any;

export const useSignedUpload = ({
  onUpload,
}: {
  onUpload: (_: FileUploadURL, __?: FileUploadFile) => void;
}) => {
  const { toast } = useNotification();

  const [getSignedUrl, { data: urlData }] = useLazyQuery(QUERY_GET_SIGNED_URL);
  const [currentFile, setCurrentFile] = useState<any>();

  useEffect(() => {
    if (urlData && urlData.getSignedUploadUrl && currentFile) {
      handleFileUpload();
    }
  }, [urlData, currentFile]);

  const handleFileUpload = async () => {
    if (urlData && urlData.getSignedUploadUrl && currentFile) {
      console.log('URL Dta', urlData);

      try {
        await fetch(urlData.getSignedUploadUrl.uploadUrl, {
          method: 'PUT',
          body: currentFile,
          headers: {
            'Content-Type': currentFile.type,
          },
        });

        const imageUrl = `${GeyserAssetDomainUrl}${urlData.getSignedUploadUrl.distributionUrl}`;
        // await testImage(imageUrl);
        onUpload(imageUrl, currentFile);
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
    getSignedUrl({
      variables: { input: { name: file.name, type: file.type } },
    });
  };

  return uploadFile;
};

export const useSignedUploadAPI = async (file: any): Promise<string> => {
  // const data:any = {name: file.name, type: file.type};

  const response = await fetch(
    `${API_SERVICE_ENDPOINT}/upload_url?name=${file.name}&type=${file.type}`,
  ).then((response) => response.json());

  const uploadRes = await fetch(response.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  const newValue = `${GeyserAssetDomainUrl}${response.distributionUrl}`;

  const test = await testImage(newValue);
  console.log('checking urlData', test, uploadRes);
  // onUploadComplete(urlData.getSignedUploadUrl.distributionUrl);

  console.log('checking resopnse', response);
  return newValue;
};
