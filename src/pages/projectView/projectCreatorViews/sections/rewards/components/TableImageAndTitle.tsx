import { Stack, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const TableImageAndTitle = ({image, title}) => {
  const { t } = useTranslation()

  return (
    <Stack direction='row' align={'center'} pb={3}>
      {image && <Image
        borderRadius={8}
        boxSize='32px'
        objectFit='cover'
        src={image}
        alt={title}
      />}
      <span>{title}</span>
    </Stack>
  )
}
