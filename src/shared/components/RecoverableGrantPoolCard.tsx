import { Button, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

type RecoverableGrantPoolCardProps = {
  onDonateClick: () => void
  outerBg?: string
  outerText?: string
  metricBg?: string
  metricText?: string
  metricMutedText?: string
}

/** Shared Recoverable Grant Pool card used by active-funds surfaces. */
export const RecoverableGrantPoolCard = ({
  onDonateClick,
  outerBg: outerBgProp,
  outerText: outerTextProp,
  metricBg: metricBgProp,
  metricText: metricTextProp,
  metricMutedText: metricMutedTextProp,
}: RecoverableGrantPoolCardProps): JSX.Element => {
  const defaultOuterBg = useColorModeValue('amber.9', 'amber.9')
  const defaultOuterText = useColorModeValue('neutral1.12', 'neutral1.1')
  const defaultMetricBg = useColorModeValue('neutral1.12', 'neutral1.2')
  const defaultMetricText = useColorModeValue('white', 'neutral1.12')
  const outerBg = outerBgProp ?? defaultOuterBg
  const outerText = outerTextProp ?? defaultOuterText
  const metricBg = metricBgProp ?? defaultMetricBg
  const metricText = metricTextProp ?? defaultMetricText
  const metricMutedText = metricMutedTextProp ?? metricText

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align={{ base: 'flex-start', md: 'center' }}
      gap={{ base: 6, md: 8 }}
      bg={outerBg}
      color={outerText}
      borderRadius="card"
      p={{ base: 5, lg: 7 }}
      minH={{ base: 'auto', lg: '220px' }}
    >
      <VStack align="flex-start" spacing={3} maxW="760px" display={{ base: 'contents', md: 'flex' }}>
        <Body size={{ base: '26px', lg: '33px' }} lineHeight={{ base: '32px', lg: '39px' }} bold color="inherit">
          {t('Recoverable Grant Pool')}
        </Body>
        <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '28px' }} color="inherit">
          {t(
            'Donate reusable capital for local projects. Help Field Partners deploy and recycle debt-free capital in their local communities.',
          )}
        </Body>
        <Flex
          order={{ base: 3, md: 'initial' }}
          direction="row"
          align="stretch"
          gap={3}
          w={{ base: 'full', md: 'auto' }}
        >
          <Button
            as={Link}
            to={getPath('discoveryRecoverableGrants')}
            h="48px"
            borderRadius="innerCard"
            variant="outline"
            borderColor={outerText}
            color={outerText}
            w={{ base: 'full', md: 'auto' }}
          >
            {t('Learn more')}
          </Button>
          <Button
            h="48px"
            borderRadius="innerCard"
            bg={metricBg}
            color={metricText}
            onClick={onDonateClick}
            w={{ base: 'full', md: 'auto' }}
            _hover={{ bg: metricBg, opacity: 0.92 }}
          >
            {t('Donate')}
          </Button>
        </Flex>
      </VStack>
      <VStack
        order={{ base: 2, md: 'initial' }}
        align="stretch"
        justify="center"
        spacing={2}
        bg={metricBg}
        borderRadius="innerCard"
        p={{ base: 4, lg: 5 }}
        w={{ base: 'full', md: '280px' }}
        minH={{ base: '140px', lg: '160px' }}
        flexShrink={0}
      >
        <Body size="sm" bold color={metricMutedText} letterSpacing="0.08em" textTransform="uppercase">
          {t('Geyser')}
        </Body>
        <Body size={{ base: '40px', lg: '48px' }} lineHeight={{ base: '46px', lg: '54px' }} bold color={metricText}>
          {t('3M sats')}
        </Body>
        <Body size="md" bold color={metricMutedText}>
          {t('Committed per quarter')}
        </Body>
      </VStack>
    </Flex>
  )
}
