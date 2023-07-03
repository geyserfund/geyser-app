import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { GeyserTermsAndConditionsURL } from '../../../constants'

export const ProjectCreateCompleted = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  return (
    <VStack w="100%" spacing={4}>
      <Text variant="body1" color="neutral.1000" mb={2}>
        {t(
          'Your project is almost live. You can now either launch the project and make it public or save it as draft. And you can always edit project at any time.',
        )}
      </Text>
      {children}
      <HStack w="100%" spacing={2} mt={2}>
        <Text textAlign="left" color="neutral.600">
          <Trans
            i18nKey={
              'By continuing, I agree with Geyser&apos;s <1>Terms & Conditions</1>'
            }
          >
            By continuing, I agree with Geyser&apos;s{' '}
            <Link
              href={GeyserTermsAndConditionsURL}
              isExternal
              textDecoration="underline"
            >
              Terms & Conditions
            </Link>
          </Trans>
        </Text>
      </HStack>
    </VStack>
  )
}
