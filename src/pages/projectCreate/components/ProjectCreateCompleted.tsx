import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { GeyserTermsAndConditionsURL } from '../../../constants'

export const ProjectCreateCompleted = ({ children }: PropsWithChildren) => {
  return (
    <VStack w="100%" spacing={4}>
      <Text variant="body1" color="neutral.1000" mb={2}>
        Your project is almost live. You can now either{' '}
        <b>launch the project</b> and make it public or <b>save it as draft</b>.
        And you can always <b>edit project</b> at any time during your project.
      </Text>
      {children}
      <HStack w="100%" spacing={2} mt={2}>
        <Text textAlign="left" color="neutral.600">
          By continuing, I agree with Geyser&apos;s{' '}
          <Link
            href={GeyserTermsAndConditionsURL}
            isExternal
            textDecoration="underline"
          >
            Terms & Conditions
          </Link>
        </Text>
      </HStack>
    </VStack>
  )
}
