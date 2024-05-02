import { Image, VStack } from '@chakra-ui/react'

import { CardLayout } from '../../../../../../../../../../../components/layouts'
import { H2 } from '../../../../../../../../../../../components/typography'

export const ErrorLayout = ({
  url,
  title,
  body,
  children,
}: {
  url: string
  title: string
  body: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <VStack w="full" spacing="20px">
      <VStack w="full" alignItems="center">
        <Image src={url} width="160px" height="auto" objectFit="contain" />
        <H2 px="20px" color="secondary.orange">
          {title}
        </H2>
      </VStack>
      <CardLayout w="full">{body}</CardLayout>
      {children}
    </VStack>
  )
}
