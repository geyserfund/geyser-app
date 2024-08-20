import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, IconButton, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { DonateIcon } from '@/components/icons/svg/DonateIcon'
import { TrophyIcon } from '@/components/icons/svg/TrophyIcon'
import { QUERY_GRANT_STATISTICS } from '@/graphqlBase/queries/grant'
import { Banner } from '@/shared/components/display/Banner'
import { Body } from '@/shared/components/typography'
import { getPath, GrantsPageBannerNoiseGifUrl } from '@/shared/constants'
import { GrantStatistics } from '@/types'
import { getShortAmountLabel, useMobileMode } from '@/utils'

const GEYSER_PROJECT_NAME = 'geyser'
const AIRTABLE_CREATE_GRANT_URL = 'https://airtable.com/appyM7XlNIWVypuP5/pagLMhHSSQVlKe0Dw/form'

const GrantsHeader = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const isMobile = useMobileMode()

  const [isCalloutOpen, setIsCalloutOpen] = useState(true)

  const { data, loading } = useQuery<{ grantStatistics: GrantStatistics }>(QUERY_GRANT_STATISTICS)

  const items = [
    {
      label: t('Granted'),
      value: getShortAmountLabel(data?.grantStatistics.grants?.amountFunded || 0),
      suffix: 'Sats',
    },
    {
      label: t('Distributed'),
      value: getShortAmountLabel(data?.grantStatistics.grants?.amountGranted || 0),
      suffix: 'Sats',
    },
  ]

  const handleDonateToGeyser = () => {
    navigate(getPath('projectFunding', GEYSER_PROJECT_NAME))
  }

  const handleCreateGrant = () => {
    window.open(AIRTABLE_CREATE_GRANT_URL, '_blank')
  }

  const Direction = isMobile ? VStack : HStack

  return (
    <VStack spacing={4} w="100%" alignItems="center">
      {isCalloutOpen && <Callout onClose={() => setIsCalloutOpen(false)} />}
      <Banner title={t('Geyser Grants - empowering bitcoin creators!')} items={items} loading={loading} reverse />
      <Direction
        justifyContent="space-between"
        w="100%"
        border="1px solid"
        borderColor="neutralAlpha.6"
        borderRadius="md"
        p={6}
      >
        <Button w="100%" size="lg" variant="primary" rightIcon={<DonateIcon />} onClick={handleDonateToGeyser}>
          {t('Donate to Geyser Grant')}
        </Button>
        <Button
          w="100%"
          size="lg"
          variant="primary"
          bg="yellow.9"
          rightIcon={<TrophyIcon />}
          onClick={handleCreateGrant}
        >
          {t('Create a grant')}
        </Button>
      </Direction>
    </VStack>
  )
}

export default GrantsHeader

const Callout = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation()

  return (
    <Box position="relative" w="100%">
      <Image
        src={GrantsPageBannerNoiseGifUrl}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        w="100%"
        h="100%"
        objectFit="cover"
        opacity={0.25}
        zIndex={1}
        borderRadius="8px"
      />
      <VStack
        w="100%"
        spacing={0}
        border="1px solid"
        borderColor="neutralAlpha.6"
        borderRadius="8px"
        bg={'primaryAlpha.10'}
        p={4}
      >
        <IconButton
          borderRadius="md"
          border="1px solid"
          borderColor="primaryAlpha.8"
          position="absolute"
          top={3}
          right={3}
          variant="ghost"
          aria-label="close"
          zIndex={2}
          icon={<CloseIcon width={'12px'} height={'12px'} />}
          color="primaryAlpha.11"
          _hover={{
            bg: 'transparent',
            borderColor: 'primaryAlpha.12',
            color: 'primaryAlpha.12',
          }}
          onClick={onClose}
        />
        <Body fontSize={{ base: '28px', lg: '36px' }} bold zIndex={2}>
          {t('Geyser Grants')}
        </Body>
        <Body fontSize={{ base: '20px', lg: '28px' }} medium zIndex={2}>
          {t('Empowering bitcoin creators!')}
        </Body>
        <VStack spacing={0}>
          <Body fontSize={{ base: '16px', lg: '20px' }} regular zIndex={2}>
            {t('Funding educators, creatives and builders doing Bitcoin-only projects on Geyser.')}
          </Body>
          <Body fontSize={{ base: '16px', lg: '20px' }} regular zIndex={2}>
            {t('Funded by bitcoiners who want to change the world.')}
          </Body>
        </VStack>
      </VStack>
    </Box>
  )
}
