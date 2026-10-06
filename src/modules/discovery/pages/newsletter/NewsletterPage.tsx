import { Box } from '@chakra-ui/react'
import { t } from 'i18next'

import { Head } from '@/config/Head'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { standardPadding } from '@/shared/styles'

import { NewsletterHero } from './components/NewsletterHero.tsx'

const NEWSLETTER_DESCRIPTION = t(
  'Follow Circular Grants, Field Partner stories, and transparent progress from communities building with Bitcoin.',
)

/** Focused newsletter signup page for Circular Grant and Field Partner updates. */
export const NewsletterPage = () => {
  const pageBg = 'utils.pageBg'

  return (
    <>
      <Head
        title={t('Geyser Newsletter')}
        description={NEWSLETTER_DESCRIPTION}
        url={`https://geyser.fund${getPath('newsletter')}`}
      />

      <Box w="full" bg={pageBg} px={standardPadding} py={{ base: 10, md: 14, lg: 20 }}>
        <Box w="full" maxW="920px" mx="auto">
          <NewsletterHero />
        </Box>
      </Box>
    </>
  )
}
