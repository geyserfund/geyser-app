import { Box } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { useSignedUpload } from '../../hooks'

type URL = string

interface IFileUpload {
  children: React.ReactNode
  onUploadComplete: (_: URL) => void
}

export const FileUpload = ({ children, onUploadComplete }: IFileUpload) => {
  const upload = useSignedUpload({ onUpload: onUploadComplete })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    upload(file)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
  })

  return (
    <Box {...getRootProps()} width="100%" _hover={{ cursor: 'pointer' }}>
      <input {...getInputProps()} />
      {children}
    </Box>
  )
}
