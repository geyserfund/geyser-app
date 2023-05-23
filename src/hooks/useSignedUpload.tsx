import { useLazyQuery } from '@apollo/client'
import { useCallback, useState } from 'react'

import { API_SERVICE_ENDPOINT, GeyserAssetDomainUrl } from '../constants'
import { QUERY_SIGNED_UPLOAD_URL } from '../graphql/queries/entries'
import { testImage, useNotification } from '../utils'

type FileUploadURL = string
type FileUploadFile = any

export const useSignedUpload = ({
  onUpload,
}: {
  onUpload?: (_: FileUploadURL, __?: FileUploadFile) => void
} = {}) => {
  const { toast } = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const failedToast = useCallback(() => {
    toast({
      title: 'failed to upload image',
      description: 'Please try again',
      status: 'error',
    })
  }, [toast])

  const [getSignedUrl] = useLazyQuery(QUERY_SIGNED_UPLOAD_URL, {
    fetchPolicy: 'network-only',
    onError() {
      failedToast()
      setIsLoading(false)
    },
  })

  const uploadFile = useCallback(
    async (file: any): Promise<{ src: string; filename: string }> => {
      try {
        setIsLoading(true)
        const { data } = await getSignedUrl({
          variables: { input: { name: file.name, type: file.type } },
        })

        if (data?.getSignedUploadUrl) {
          const { getSignedUploadUrl } = data

          await fetch(getSignedUploadUrl.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          })

          const imageUrl = `${GeyserAssetDomainUrl}${getSignedUploadUrl.distributionUrl}`

          await testImage(imageUrl)

          onUpload?.(imageUrl, file)
          setIsLoading(false)

          return { src: imageUrl, filename: file.name }
        }

        throw new Error()
      } catch (e) {
        failedToast()
        setIsLoading(false)
        throw e
      }
    },
    [failedToast, getSignedUrl, onUpload],
  )

  return { uploadFile, isLoading }
}

export const getSignedUploadAPI = async (file: any): Promise<string> => {
  const URL = `${API_SERVICE_ENDPOINT}/upload_url?name=${file.name}&type=${file.type}`
  const response = await fetch(URL).then((response) => response.json())

  await fetch(response.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  })

  const distributionUrl = `${GeyserAssetDomainUrl}${response.distributionUrl}`

  try {
    await testImage(distributionUrl)
  } catch (e) {
    console.error(e)
  }

  return distributionUrl
}
