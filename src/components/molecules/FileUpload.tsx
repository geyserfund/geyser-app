import { CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  IconButton,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { useModal, useSignedUpload } from '../../hooks'
import { ImageWithReload } from '../ui'
import { ImageCrop, ImageCropperModal } from './ImageCropperModal'

type URL = string

interface IFileUpload {
  showcase?: boolean
  caption?: string
  containerProps?: StackProps
  src?: string | null
  showcaseW?: string
  showcaseH?: string
  children: React.ReactNode
  childrenOnLoading?: React.ReactNode
  onDeleteClick?: () => void
  onLoading?: (isLoading: boolean) => void
  onUploadComplete: (_: URL) => void
  imageCrop?: ImageCrop
}

const noop = () => {}

export const FileUpload = ({
  children,
  caption,
  containerProps = {},
  childrenOnLoading,
  showcase = false,
  src = null,
  showcaseW = '40px',
  showcaseH = '40px',
  onUploadComplete,
  onDeleteClick,
  onLoading = noop,
  imageCrop,
}: IFileUpload) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(src)

  const [originalFile, setOriginalFile] = useState<File>()
  const cropModal = useModal()

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
      if (!file) return
      setOriginalFile(file)
      if (!imageCrop) {
        uploadFile(file)
      } else {
        cropModal.onOpen()
      }
    },
    [uploadFile, imageCrop, cropModal],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { 'image/*': [] },
  })

  return (
    <>
      <VStack {...containerProps}>
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
          <Text
            w="100%"
            textAlign="right"
            variant="caption"
            color="neutral.600"
          >
            {caption}
          </Text>
        )}
      </VStack>
      {imageCrop && (
        <ImageCropperModal
          {...cropModal}
          fileSrc={originalFile}
          aspectRatio={imageCrop === ImageCrop.Square ? 1 : 3}
          onCompleted={uploadFile}
        />
      )}
    </>
  )
}
