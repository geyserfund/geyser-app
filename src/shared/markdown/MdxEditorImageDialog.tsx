import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { closeImageDialog$, imageDialogState$, saveImage$, useCellValue, usePublisher } from '@mdxeditor/editor'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload.tsx'

import { MdxEditorImageUploadDropzone } from './MdxEditorImageUploadDropzone.tsx'

type ImageDialogValues = {
  src: string
  altText: string
  title: string
}

const EMPTY_VALUES: ImageDialogValues = {
  src: '',
  altText: '',
  title: '',
}

const normalizeOptionalText = (value: string): string | undefined => {
  const trimmedValue = value.trim()
  return trimmedValue || undefined
}

/** Project-styled image dialog that uses drag/drop auto-upload and metadata fields. */
export const MdxEditorImageDialog = () => {
  const dialogState = useCellValue(imageDialogState$)
  const closeImageDialog = usePublisher(closeImageDialog$)
  const saveImage = usePublisher(saveImage$)

  const [values, setValues] = useState<ImageDialogValues>(EMPTY_VALUES)
  const [isUploading, setIsUploading] = useState(false)

  const isOpen = dialogState.type !== 'inactive'
  const isEditing = dialogState.type === 'editing'
  const hasImageSource = Boolean(values.src.trim())

  useEffect(() => {
    if (dialogState.type === 'editing') {
      setValues({
        src: dialogState.initialValues.src ?? '',
        altText: dialogState.initialValues.altText ?? '',
        title: dialogState.initialValues.title ?? '',
      })
      return
    }

    if (dialogState.type === 'inactive') {
      setValues(EMPTY_VALUES)
      setIsUploading(false)
      return
    }

    setValues(EMPTY_VALUES)
  }, [dialogState])

  const onClose = useCallback(() => {
    if (isUploading) {
      return
    }

    setIsUploading(false)
    closeImageDialog()
  }, [closeImageDialog, isUploading])

  const onSave = useCallback(() => {
    if (!hasImageSource || isUploading || dialogState.type === 'inactive') {
      return
    }

    saveImage({
      src: values.src.trim(),
      altText: normalizeOptionalText(values.altText),
      title: normalizeOptionalText(values.title),
      width: dialogState.type === 'editing' ? dialogState.initialValues.width : undefined,
      height: dialogState.type === 'editing' ? dialogState.initialValues.height : undefined,
    })

    onClose()
  }, [dialogState, hasImageSource, isUploading, onClose, saveImage, values.altText, values.src, values.title])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={!isUploading} closeOnOverlayClick={!isUploading}>
      <ModalOverlay />
      <ModalContent backgroundColor="utils.pbg">
        <ModalHeader>{isEditing ? t('Edit image') : t('Upload an image')}</ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <MdxEditorImageUploadDropzone
              src={values.src}
              isDisabled={isUploading}
              onUploaded={(url) => {
                setValues((previousValues) => ({ ...previousValues, src: url }))
              }}
              onLoadingChange={setIsUploading}
            />

            {hasImageSource && (
              <Box borderWidth="1px" borderColor="neutral1.6" borderRadius="8px" overflow="hidden">
                <ImageWithReload src={values.src} w="full" maxHeight="220px" objectFit="cover" />
              </Box>
            )}

            <FormControl>
              <FormLabel>{t('Alt text')}</FormLabel>
              <Input
                value={values.altText}
                onChange={(event) => {
                  const { value } = event.target
                  setValues((previousValues) => ({ ...previousValues, altText: value }))
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t('Title')}</FormLabel>
              <Input
                value={values.title}
                onChange={(event) => {
                  const { value } = event.target
                  setValues((previousValues) => ({ ...previousValues, title: value }))
                }}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose} isDisabled={isUploading}>
            {t('Cancel')}
          </Button>
          <Button colorScheme="primary1" onClick={onSave} isLoading={isUploading} isDisabled={!hasImageSource}>
            {isEditing ? t('Update') : t('Insert')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
