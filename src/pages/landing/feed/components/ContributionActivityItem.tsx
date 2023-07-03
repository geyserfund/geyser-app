import { Box, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'
import { useTranslation } from 'react-i18next'

import { LightningIcon, SatoshiIconTilted } from '../../../../components/icons'
import { SkeletonLayout } from '../../../../components/layouts'
import { ExternalAccountLinkIcon } from '../../../../components/molecules'
import { renderFunderBadges } from '../../../../components/molecules/projectActivity/renderFunderBadges'
import { Caption, MonoBody1 } from '../../../../components/typography'
import {
  AnonymousAvatar,
  AvatarLink,
  LinkableAvatar,
} from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { computeFunderBadges, getAvatarMetadata } from '../../../../helpers'
import { fonts } from '../../../../styles'
import {
  FundingTxForLandingPageFragment,
  FundingTxFragment,
} from '../../../../types'
import {
  commaFormatted,
  GetDaysAgo,
  getRandomOrb,
  toSmallImageUrl,
} from '../../../../utils'

type Props = HTMLChakraProps<'div'> & {
  fundingTx: FundingTxFragment | FundingTxForLandingPageFragment
  dateTime?: string
  showsProjectLink?: boolean
  count?: number
}
export const ContributionActivityItem = ({
  fundingTx,
  dateTime,
  count,
  showsProjectLink,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const { funder } = fundingTx

  const isFunderAnonymous = !funder?.user
  const timeAgo = GetDaysAgo(dateTime || fundingTx.paidAt)
  const wasMadeOnChain = fundingTx.onChain

  const avatarMetadata = getAvatarMetadata({
    funder,
    source: fundingTx.source,
  })

  const funderBadges = computeFunderBadges({
    creationDateStringOfFundedContent:
      'sourceResource' in fundingTx && fundingTx.sourceResource?.createdAt
        ? fundingTx.sourceResource.createdAt
        : '',
    funder,
  })

  const renderResource = () => {
    if (!('sourceResource' in fundingTx)) {
      return null
    }

    const resource = fundingTx.sourceResource
    switch (resource?.__typename) {
      case 'Project':
        return (
          <AvatarLink
            title={resource.title}
            path={getPath('project', resource.name)}
            imageSrc={toSmallImageUrl(`${resource.thumbnailImage}`)}
          />
        )
      case 'Entry':
        return (
          <AvatarLink
            title={resource.title}
            path={getPath('entry', resource.id)}
            imageSrc={toSmallImageUrl(`${resource.image}`)}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box w="full" bg="neutral.0" {...rest}>
      <VStack flexDirection="column" spacing={'6px'} overflow={'hidden'}>
        {/* Funding Stats Header */}

        <Box display="flex" justifyContent="space-between" width={'full'}>
          {/* Funder Avatar */}
          <HStack w="100%">
            {isFunderAnonymous ? (
              <HStack spacing={2}>
                <AnonymousAvatar
                  seed={funder.id}
                  image={avatarMetadata.image}
                  imageSize={'20px'}
                  textColor="neutral.900"
                />
              </HStack>
            ) : (
              <LinkableAvatar
                imageSrc={funder.user?.imageUrl || getRandomOrb(funder.id)}
                avatarUsername={funder.user?.username || ''}
                userProfileID={funder.user?.id}
                imageSize={'24px'}
                textColor="neutral.600"
                badgeNames={funderBadges.map((badge) => badge.badge)}
                badgeElements={renderFunderBadges(funderBadges)}
              />
            )}
            {count && count > 1 && (
              <HStack
                backgroundColor="neutral.200"
                px="3px"
                borderRadius="sm"
                spacing="2px"
              >
                <Text
                  fontFamily={fonts.inter}
                  fontSize="12px"
                  fontWeight={500}
                >{`${count}x`}</Text>
                <LightningIcon height="15px" width="10px" />
                <Text fontFamily={fonts.inter} fontSize="12px" fontWeight={500}>
                  {t('STREAMS')}
                </Text>
              </HStack>
            )}
          </HStack>

          {/* Funding Amount */}
          <Box display="flex" alignItems="center">
            <SatoshiIconTilted scale={0.7} />
            <MonoBody1 fontFamily={fonts.mono}>
              {commaFormatted(fundingTx.amount)}
            </MonoBody1>
          </Box>
        </Box>

        <Stack marginTop="6px" width="100%" spacing={'6px'}>
          {/* Funding Comment */}

          {fundingTx.comment ? <Text>{fundingTx.comment}</Text> : null}

          {/* Funding Media Attachment */}

          {fundingTx.media ? (
            <Box h={'178px'} bg={'gray.100'} pos={'relative'}>
              <Image
                src={fundingTx.media}
                alt="Contribution media attachment"
                objectFit={'cover'}
                width="full"
                height="full"
                borderRadius="4px"
              />
            </Box>
          ) : null}

          {/* Timestamp and Funded-Project Info */}

          <HStack w="full" color="neutral.700" spacing={2}>
            <Caption whiteSpace="nowrap">
              {`${wasMadeOnChain ? '⛓' : '⚡️'}`}
              {timeAgo ? `${timeAgo} ${t('ago')}` : t('Some time ago')}
            </Caption>

            <ExternalAccountLinkIcon fundingTx={fundingTx} />

            {showsProjectLink && 'sourceResource' in fundingTx && (
              <HStack
                overflow="hidden"
                backgroundColor="neutral.100"
                padding="2px 10px"
                borderRadius="8px"
              >
                <Text>▶</Text>
                {renderResource()}
              </HStack>
            )}
          </HStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export const ContributionActivityItemSkeleton = () => {
  return (
    <VStack w="full" maxWidth="500px">
      <HStack w="full" justifyContent="space-between">
        <SkeletonLayout width="20%" />
        <SkeletonLayout width="10%" />
      </HStack>
      <SkeletonLayout height="80px" />
      <HStack w="full">
        <SkeletonLayout width="10%" />
        <SkeletonLayout width="10%" />
      </HStack>
    </VStack>
  )
}
