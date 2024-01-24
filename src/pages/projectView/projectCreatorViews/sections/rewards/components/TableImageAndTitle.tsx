import { Stack, Image } from '@chakra-ui/react'

export interface TableImageAndTitleProps {
    image: string | null | undefined
    title: string
}

export const TableImageAndTitle = ({image, title}: TableImageAndTitleProps) => {

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
