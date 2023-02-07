import { HStack, StackProps, Text } from '@chakra-ui/react'
import { AiOutlineUpload } from 'react-icons/ai'

import Loader from './Loader'

interface UploadBoxProps extends StackProps {
  loading?: boolean
  title?: string
}

export const UploadBox = ({ loading, title, ...rest }: UploadBoxProps) => {
  return (
    <HStack
      borderRadius="4px"
      backgroundColor="brand.bgGrey"
      width="100%"
      height="70px"
      justifyContent="center"
      alignItems="center"
      _hover={{ backgroundColor: 'brand.gray300' }}
      {...rest}
    >
      {loading ? (
        <Loader size="md" />
      ) : (
        <>
          <AiOutlineUpload />
          <Text>{title || 'Select an image'}</Text>
        </>
      )}
    </HStack>
  )
}
