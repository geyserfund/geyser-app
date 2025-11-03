import { forwardRef, HStack, StackProps, VStack } from '@chakra-ui/react'

import { Body } from '../../../../../../../shared/components/typography'

interface BodySectionLayoutProps extends StackProps {
  title: string
  rightComponent?: React.ReactNode
}

export const BodySectionLayout = forwardRef(
  ({ title, rightComponent, children, ...props }: BodySectionLayoutProps, ref) => {
    return (
      <VStack ref={ref} w="full" spacing={2} alignItems="start" {...props}>
        <HStack width="100%" justifyContent="space-between">
          <Body size="2xl" bold>
            {title}
          </Body>
          {rightComponent}
        </HStack>

        {children}
      </VStack>
    )
  },
)
