import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

/** Compact newsletter signup card for the news page. */
export const NewsNewsletterSection = () => {
  return (
    <CardLayout
      w="full"
      spacing={{ base: 4, lg: 6 }}
      flexDirection={{ base: 'column', lg: 'row' }}
      alignItems={{ base: 'stretch', lg: 'center' }}
      justifyContent="space-between"
      padding={{ base: 4, lg: 5 }}
    >
      <VStack alignItems="start" spacing={2} flex={1} maxW={{ base: 'full', lg: '560px' }}>
        <Body size="md" medium>
          {t('Keep up to date with Geyser news and project impact updates by joining our newsletter')}
        </Body>
      </VStack>

      <SubscribeForm
        w="full"
        flex={1}
        maxWidth={{ base: 'full', lg: '420px' }}
        inputProps={{
          placeholder: t('satoshi@gmx.com'),
          size: 'md',
        }}
        buttonProps={{
          children: t('Join'),
          size: 'lg',
          variant: 'solid',
          colorScheme: 'neutral1',
          minWidth: { base: '100%', sm: '120px' },
        }}
        flexDirection={{ base: 'column', sm: 'row' }}
        alignItems={{ base: 'stretch', sm: 'flex-start' }}
        spacing={3}
      />
    </CardLayout>
  )
}
