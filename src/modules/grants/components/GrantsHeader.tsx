import { Box, Button, HStack, Image, Link as ChakraLink, Skeleton, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiCoins, PiTrophy } from 'react-icons/pi'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography'
import { __production__, __staging__ } from '@/shared/constants'
import { getPath, GrantsFAQUrl, GrantsPageBannerNoiseGifUrl } from '@/shared/constants'
import { useGrantStatisticsQuery } from '@/types'
import { getShortAmountLabel, useMobileMode } from '@/utils'

// TODO: Change to geyser grants project name before pushing to production
const GEYSER_PROJECT_NAME = __staging__ ? 'geyser2' : __production__ ? 'geyser' : 'geyser-dev'
const AIRTABLE_CREATE_GRANT_URL = 'https://airtable.com/appyM7XlNIWVypuP5/pagLMhHSSQVlKe0Dw/form'

export const GrantsHeader = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const isMobile = useMobileMode()

  const { data, loading } = useGrantStatisticsQuery()

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

  const Direction = isMobile ? VStack : HStack
  const Column = isMobile ? VStack : HStack

  return (
    <>
      <Box position="relative" w="100%">
        <VStack
          w="100%"
          spacing={0}
          border="1px solid"
          borderColor="neutralAlpha.6"
          borderTopRightRadius="8px"
          borderTopLeftRadius="8px"
          bg={'primaryAlpha.10'}
          p={4}
        >
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
            draggable={false}
            borderTopRadius="8px"
          />
          <Body size={{ base: '3xl', lg: '4xl' }} bold zIndex={2}>
            {t('Geyser Grants')}
          </Body>
          <VStack spacing={0}>
            <Body size={{ base: 'md', lg: 'xl' }} regular zIndex={2} textAlign="center">
              {t('Funding educators, creatives and builders doing Bitcoin-only projects on Geyser.')}
            </Body>
            <Body size={{ base: 'md', lg: 'xl' }} regular zIndex={2} textAlign="center">
              {t('Funded by bitcoiners who want to change the world.')}
            </Body>
          </VStack>
        </VStack>
      </Box>
      <Box position="relative" w="100%">
        <VStack
          width="full"
          border="1px solid"
          justifyContent="center"
          borderColor="neutralAlpha.6"
          p={6}
          borderBottomRadius="8px"
          mt={-0.25}
          borderTop={'none'}
          zIndex={0}
        >
          <Box width="100%" justifyContent="center">
            {items && (
              <Column
                w={{ base: '100%', lg: 'auto' }}
                spacing={{ base: 2, lg: 6 }}
                alignItems="center"
                justifyContent="center"
              >
                {items.map((item, index) => (
                  <BannerItem
                    key={index}
                    label={item.label}
                    value={item.value}
                    suffix={item.suffix}
                    loading={loading}
                  />
                ))}
              </Column>
            )}
          </Box>
          <HStack w="100%" justifyContent="center">
            <Link to={GrantsFAQUrl} target="_blank">
              <Body
                fontSize={{ base: 'md', lg: 'lg' }}
                medium
                color="primaryAlpha.11"
                style={{ textDecoration: 'underline' }}
              >
                {t('Learn more about Geyser Grants')}
              </Body>
            </Link>
          </HStack>
          <Direction mt={3} justifyContent="space-between" w="100%">
            <Button
              w="100%"
              size="lg"
              variant="solid"
              colorScheme="primary1"
              rightIcon={<PiCoins size={18} />}
              onClick={handleDonateToGeyser}
            >
              {t('Donate to Geyser Grants')}
            </Button>
            <Button
              as={ChakraLink}
              href={AIRTABLE_CREATE_GRANT_URL}
              isExternal
              w="100%"
              size="lg"
              variant="solid"
              colorScheme="primary1"
              bg="yellow.9"
              rightIcon={<PiTrophy size={18} />}
            >
              {t('Create a grant')}
            </Button>
          </Direction>
        </VStack>
      </Box>
    </>
  )
}

const BannerItem = ({
  label,
  value,
  loading,
  suffix,
}: {
  label: string
  value: string
  loading: boolean
  suffix?: string
}) => {
  return (
    <HStack>
      <Body fontSize={{ base: 'xl', lg: '3xl' }} muted medium>
        {label}:
      </Body>
      <Body fontSize={{ base: 'xl', lg: '3xl' }} color="neutral1.12" bold>
        {loading ? <Skeleton height="20px" width="40px" /> : value}
      </Body>
      {suffix && (
        <Body fontSize={{ base: 'xl', lg: '3xl' }} muted medium>
          {suffix}
        </Body>
      )}
    </HStack>
  )
}
