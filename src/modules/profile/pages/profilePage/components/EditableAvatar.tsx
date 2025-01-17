import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { FileUpload } from '@/shared/molecules'

import { AddPictureIcon } from '../../../../../components/icons/svg/AddPictureIcon'
import Loader from '../../../../../components/ui/Loader'
import { getRandomOrb } from '../../../../../utils'

interface Props {
  onUploadImage(url: string): void
  imageUrl: string
  userId: number
}

export const EditableAvatar = ({ onUploadImage, imageUrl, userId }: Props) => {
  const [isImageLoading, setImageLoading] = useState(false)

  const src = imageUrl || getRandomOrb(userId)

  return (
    <FileUpload onUploadComplete={onUploadImage} onLoading={setImageLoading}>
      <Box
        width="100px"
        height="100px"
        borderRadius="50%"
        border="2px solid"
        borderColor="neutral.200 !important"
        overflow="hidden"
        position="relative"
        cursor="pointer"
      >
        <ImageWithReload src={src} height="100%" width="100%" />
        <Box
          position="absolute"
          top="0"
          h="100px"
          w="100px"
          borderRadius="50%"
          backgroundColor="neutral.900"
          opacity={0.3}
        />
        <Box position="absolute" left="39px" top="40px" color="neutral.0">
          {isImageLoading ? <Loader size="md" /> : <AddPictureIcon w="22px" h="20px" />}
        </Box>
      </Box>
    </FileUpload>
  )
}
