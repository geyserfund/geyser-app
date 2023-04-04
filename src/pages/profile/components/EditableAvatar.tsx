import { Avatar, Box } from '@chakra-ui/react'
import { useState } from 'react'

import { AddPictureIcon } from '../../../components/icons/svg/AddPictureIcon'
import { FileUpload } from '../../../components/molecules'
import Loader from '../../../components/ui/Loader'
import { getRandomOrb } from '../../../utils'

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
        borderRadius="50%"
        width="100px"
        position="relative"
        cursor="pointer"
      >
        <Avatar
          src={src}
          h="100px"
          w="100px"
          border="2px solid"
          borderColor="neutral.200 !important"
        />
        <Box
          position="absolute"
          top="0"
          h="100px"
          w="100px"
          borderRadius="50%"
          backgroundColor="neutral.900"
          opacity={0.3}
        />
        <Box position="absolute" left="39px" top="40px" color="white">
          {isImageLoading ? (
            <Loader size="md" />
          ) : (
            <AddPictureIcon w="22px" h="20px" />
          )}
        </Box>
      </Box>
    </FileUpload>
  )
}
