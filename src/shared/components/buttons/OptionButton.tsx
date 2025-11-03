import { Button, ButtonProps, HStack, VStack } from '@chakra-ui/react'

import { Body, H2 } from '@/shared/components/typography'

interface OptionButtonProps {
  title: string
  subtitle?: string
  body: string
  buttonProps?: ButtonProps
}

/** Reusable button component with title, subtitle, and body content */
export const OptionButton = ({ title, subtitle, body, buttonProps }: OptionButtonProps) => {
  return (
    <Button variant="outline" colorScheme="neutral1" size="lg" w="full" {...buttonProps}>
      <VStack>
        <HStack>
          <H2 bold>{title}</H2>
          {subtitle && <Body>{subtitle}</Body>}
        </HStack>
        <Body>{body}</Body>
      </VStack>
    </Button>
  )
}
