import { Icon, Spinner, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiImage } from 'react-icons/pi'

import { Body } from '@/shared/components/typography/Body.tsx'
import { FileUpload } from '@/shared/molecules/FileUpload.tsx'

type MdxEditorImageUploadDropzoneProps = {
  src?: string
  isDisabled?: boolean
  onLoadingChange: (isLoading: boolean) => void
  onUploaded: (url: string) => void
}

const UploadSurface = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <VStack
      w="full"
      h="120px"
      px={4}
      justifyContent="center"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="neutral1.6"
      borderRadius="8px"
      backgroundColor="neutral1.3"
      _hover={{ backgroundColor: 'neutral1.4' }}
      spacing={2}
    >
      {isLoading ? <Spinner size="sm" /> : <Icon as={PiImage} boxSize={5} color="neutral1.10" />}
      <Body size="sm" textAlign="center">
        {isLoading ? t('Uploading image') : t('Drag and drop an image here or click to select')}
      </Body>
    </VStack>
  )
}

/** Reusable MDX image-upload dropzone backed by the app's existing auto-upload flow. */
export const MdxEditorImageUploadDropzone = ({
  src,
  isDisabled,
  onLoadingChange,
  onUploaded,
}: MdxEditorImageUploadDropzoneProps) => {
  return (
    <FileUpload
      src={src}
      isDisabled={isDisabled}
      onUploadComplete={onUploaded}
      onLoading={onLoadingChange}
      containerProps={{ width: '100%' }}
      childrenOnLoading={<UploadSurface isLoading />}
    >
      <UploadSurface isLoading={false} />
    </FileUpload>
  )
}
