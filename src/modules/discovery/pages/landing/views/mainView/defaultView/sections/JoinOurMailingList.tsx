import { useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'

export const JoinOurMailingList = () => {
  const backgroundColor = useColorModeValue('#fbfaf7', 'gray.800')
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')

  return (
    <VStack
      width="100%"
      spacing={5}
      padding={{ base: 6, lg: 8 }}
      borderRadius="32px"
      border="1px solid"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      align="center"
      textAlign="center"
    >
      <VStack spacing={3} maxW="620px">
        <H2 size={{ base: 'xl', lg: '2xl' }} dark bold>
          {t("Don't miss a thing")}
        </H2>
        <Body size={{ base: 'md', lg: 'lg' }} color="neutral1.10" lineHeight={1.7}>
          {t('Join our newsletter to stay close to the latest Bitcoin adoption stories, project launches, and impact updates.')}
        </Body>
      </VStack>

      <SubscribeForm
        width="100%"
        maxWidth="720px"
        inputProps={{
          size: 'lg',
          borderRadius: 'full',
          containerProps: { w: 'full' },
        }}
        buttonProps={{
          size: 'lg',
          borderRadius: 'full',
          colorScheme: 'primary1',
          variant: 'solid',
          children: t('Subscribe'),
        }}
      />
    </VStack>
  )
}
