import { HStack, StackProps } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiImage } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { BodyProps } from '@/shared/components/typography/Body'

import Loader from './Loader'

interface UploadBoxProps extends StackProps {
  loading?: boolean
  title?: string
  titleProps?: BodyProps
}

export const UploadBox = ({ loading, title, titleProps, ...rest }: UploadBoxProps) => {
  const { t } = useTranslation()
  return (
    <HStack
      borderRadius="8px"
      backgroundColor="neutral1.3"
      width="100%"
      height="70px"
      justifyContent="center"
      alignItems="center"
      paddingX={3}
      _hover={{ backgroundColor: 'neutral1.4' }}
      spacing={3}
      {...rest}
    >
      {loading ? (
        <Loader size="md" />
      ) : (
        <>
          <Body {...titleProps}>{title || t('Select an image')}</Body>
          <PiImage fontSize="20px" />
        </>
      )}
    </HStack>
  )
}
