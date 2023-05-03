import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'

import { API_SERVICE_ENDPOINT, GeyserAssetDomainUrl } from '../constants'
import { QUERY_SIGNED_UPLOAD_URL } from '../graphql/queries/entries'
import { testImage, useNotification } from '../utils'

type FileUploadURL = string
type FileUploadFile = any

export const useSignedUpload = ({
  onUpload,
}: {
  onUpload: (_: FileUploadURL, __?: FileUploadFile) => void
}) => {
  const { toast } = useNotification()

  const [getSignedUrl] = useLazyQuery(QUERY_SIGNED_UPLOAD_URL, {
    onError() {
      failedToast()
      setIsLoading(false)
    },
    onCompleted(data) {
      if (data?.getSignedUploadUrl && currentFile) {
        handleFileUpload(data.getSignedUploadUrl, currentFile)
      }
    },
  })
  const [currentFile, setCurrentFile] = useState<any>()

  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = async (getSignedUploadUrl: any, file: File) => {
    try {
      await fetch(getSignedUploadUrl.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      const imageUrl = `${GeyserAssetDomainUrl}${getSignedUploadUrl.distributionUrl}`
      onUpload(imageUrl, currentFile)
    } catch {
      failedToast()
    }

    setIsLoading(false)
  }

  const failedToast = () => {
    toast({
      title: 'failed to upload image',
      description: 'Please try again',
      status: 'error',
    })
  }

  const uploadFile = (file: any) => {
    setCurrentFile(file)
    try {
      setIsLoading(true)
      getSignedUrl({
        variables: { input: { name: file.name, type: file.type } },
      })
    } catch {
      setIsLoading(false)
    }
  }

  return { uploadFile, isLoading }
}

export const getSignedUploadAPI = async (file: any): Promise<string> => {
  const response = await fetch(
    `${API_SERVICE_ENDPOINT}/upload_url?name=${file.name}&type=${file.type}`,
  ).then((response) => response.json())

  await fetch(response.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  const newValue = `${GeyserAssetDomainUrl}${response.distributionUrl}`
  await testImage(newValue)
  return newValue
}
