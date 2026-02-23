import { HStack, Image, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ImpactFundApplicationFundingModel } from '@/types'

export type ProjectImpactFundRecipient = {
  impactFundId: string
  impactFundName: string
  impactFundTitle: string
  fundingModel: ImpactFundApplicationFundingModel
  amountAwardedInSats?: number | null
  awardedAt?: string | null
}

type ImpactFundRecipientBannerProps = {
  recipient?: ProjectImpactFundRecipient | null
}

export const ImpactFundRecipientBanner = ({ recipient }: ImpactFundRecipientBannerProps) => {
  const bg = useColorModeValue('white', 'utils.pbg')
  const borderColor = useColorModeValue('neutral1.6', 'neutral1.7')
  const textColor = useColorModeValue('neutral1.10', 'neutral1.10')
  const fundTitleColor = useColorModeValue('neutral1.11', 'neutral1.11')
  const linkColor = useColorModeValue('neutral1.10', 'neutral1.11')
  const awardImageSrc = useColorModeValue(
    '/icons/impact-fund-recipient-award.png',
    '/icons/impact-fund-recipient-award-dark.png',
  )

  if (!recipient) {
    return null
  }

  const impactFundTitle = recipient.impactFundTitle || recipient.impactFundName
  const impactFundPath = getPath('impactFunds', encodeURIComponent(recipient.impactFundName))

  return (
    <HStack
      w="full"
      alignItems="center"
      spacing={{ base: 3, lg: 5 }}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="8px"
      px={{ base: 3, lg: 5 }}
      py={{ base: 3, lg: 4 }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Image
        src={awardImageSrc}
        alt="Impact Fund Recipient award"
        maxW={{ base: '88px', md: '115px' }}
        h="auto"
        objectFit="contain"
        flexShrink={0}
      />

      <Body color={textColor} fontWeight={500} size={{ base: 'sm', lg: 'md' }} lineHeight={1.35}>
        {t('This project has been vetted and received funds from the')}{' '}
        <Body as="span" color={fundTitleColor} fontWeight={700} fontSize="inherit" lineHeight="inherit">
          {impactFundTitle}
        </Body>
        . {t('Learn more about Impact Funds')}{' '}
        <ChakraLink as={Link} to={impactFundPath} textDecoration="underline" color={linkColor}>
          {t('here')}
        </ChakraLink>
        .
      </Body>
    </HStack>
  )
}
