import { Box, Image, VStack } from '@chakra-ui/react'

import { H2 } from '@/shared/components/typography'

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
        <Box padding={5}>
          <Image src={url} width="150px" height="auto" objectFit="contain" alt={`${title} error image`} />
        </Box>
        <H2 size="xl" medium color="error.11">
          {title}
        </H2>
      </VStack>
      {body}
      {children}
    </VStack>
  )
}
