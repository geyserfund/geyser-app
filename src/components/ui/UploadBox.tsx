import { HStack, StackProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiUpload } from 'react-icons/pi'

import Loader from './Loader'

interface UploadBoxProps extends StackProps {
  loading?: boolean
  title?: string
}

export const UploadBox = ({ loading, title, ...rest }: UploadBoxProps) => {
  const { t } = useTranslation()
  return (
    <HStack
      borderRadius="8px"
      backgroundColor="neutral.100"
      width="100%"
      height="70px"
      justifyContent="center"
      alignItems="center"
      paddingX={3}
      _hover={{ backgroundColor: 'neutral.300' }}
      {...rest}
    >
      {loading ? (
        <Loader size="md" />
      ) : (
        <>
          <PiUpload />
          <Text>{title || t('Select an image')}</Text>
        </>
      )}
    </HStack>
  )
}
