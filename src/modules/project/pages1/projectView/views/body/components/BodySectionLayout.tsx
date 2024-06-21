import { StackProps, VStack } from '@chakra-ui/react'

import { Body } from '../../../../../../../shared/components/typography'

interface BodySectionLayoutProps extends StackProps {
  title: string
}

export const BodySectionLayout = ({ title, children, ...props }: BodySectionLayoutProps) => {
  return (
    <VStack w="full" spacing={4} alignItems="start" {...props}>
      <Body size="2xl" bold>
        {title}
      </Body>
      {children}
    </VStack>
  )
}
