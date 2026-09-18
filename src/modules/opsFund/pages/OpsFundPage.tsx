import { Box, Button, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { Body, H1, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'

export const OpsFundPage = () => (
  <Box w="full" minH="100vh" bg="utils.pbg">
    <Head
      title={t('Geyser Operations Fund')}
      description={t(
        'Support the people and infrastructure that make Circular Grants, Impact Funds, and Field Partners possible.',
      )}
      url={`https://geyser.fund${getPath('opsFund')}`}
    />
    <VStack
      w="full"
      maxW={dimensions.maxWidth}
      mx="auto"
      px={{ base: 5, md: 8 }}
      py={{ base: 12, lg: 20 }}
      spacing={10}
      align="start"
    >
      <VStack align="start" spacing={4} maxW="760px">
        <H1 size={{ base: '2xl', lg: '5xl' }} bold>
          {t('Geyser Operations Fund')}
        </H1>
        <Body size={{ base: 'lg', lg: 'xl' }} color="neutralAlpha.11">
          {t(
            'Geyser Ops keeps the platform, people, and trust systems running so local projects can access capital and communities can keep building.',
          )}
        </Body>
      </VStack>
      <Box maxW="800px">
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Help sustain the work behind the work.')}
        </H2>
        <Body mt={3} size="lg" color="neutralAlpha.11" lineHeight="1.7">
          {t(
            'Your donation supports the operations that connect Field Partners, Circular Grants, and Impact Funds with the communities they serve.',
          )}
        </Body>
      </Box>
      <Button as={Link} to={getPath('fundingStart', 'geyser')} colorScheme="primary1" size="lg">
        {t('Support Geyser')}
      </Button>
    </VStack>
  </Box>
)
