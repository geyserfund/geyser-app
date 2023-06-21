import { CloseIcon } from '@chakra-ui/icons'
import { Box, HStack, IconButton, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useSignedUpload } from '../../hooks'
import { ImageWithReload } from '../ui'

type URL = string

interface IFileUpload {
  showcase?: boolean
  caption?: string
  src?: string | null
  showcaseW?: string
  showcaseH?: string
  children: React.ReactNode
  childrenOnLoading?: React.ReactNode
  onDeleteClick?: () => void
  onLoading?: (isLoading: boolean) => void
  onUploadComplete: (_: URL) => void
}

const noop = () => {}

export const FileUpload = ({
  children,
  caption,
  childrenOnLoading,
  showcase = false,
  src = null,
  showcaseW = '40px',
  showcaseH = '40px',
  onUploadComplete,
  onDeleteClick,
  onLoading = noop,
}: IFileUpload) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(src)

  const onUpload = useCallback(
    (url: string) => {
      const onload = function () {
        setUploadedImage(url)
        onUploadComplete(url)
      }

      const img = new Image()
      img.onload = onload
      img.src = url

      onload()
    },
    [onUploadComplete],
  )

  const { uploadFile, isLoading } = useSignedUpload({
    onUpload,
  })

  useEffect(() => {
    onLoading(isLoading)
  }, [isLoading, onLoading])

  useEffect(() => {
    setUploadedImage(src)
  }, [src])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      uploadFile(file)
    },
    [uploadFile],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
  })

  return (
    <>
      <HStack w="100%">
        {showcase && uploadedImage ? (
          <HStack>
            <ImageWithReload
              alt="uploaded image"
              h={showcaseH}
              w={showcaseW}
              objectFit="cover"
              src={uploadedImage}
            />
            {onDeleteClick ? (
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="remove image"
                onClick={onDeleteClick}
              >
                <CloseIcon fontSize="xs" />
              </IconButton>
            ) : null}
          </HStack>
        ) : null}
        <Box flexGrow={1} {...getRootProps()} _hover={{ cursor: 'pointer' }}>
          <input {...getInputProps()} />
          {isLoading && childrenOnLoading ? childrenOnLoading : children}
        </Box>
      </HStack>

      {caption && (
        <Text w="100%" textAlign="right" variant="caption" color="neutral.600">
          {caption}
        </Text>
      )}
    </>
  )
}
