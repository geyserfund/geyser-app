import {
  Box,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { HTMLChakraProps } from '@chakra-ui/system'

import { computeFunderBadges, getAvatarMetadata } from '../../../helpers'
import { fonts } from '../../../styles'
import {
  FundingTxForUserContributionFragment,
  Project,
} from '../../../types/generated/graphql'
import { getDaysAgo } from '../../../utils'
import { commaFormatted } from '../../../utils/formatData/helperFunctions'
import { LightningIcon, SatoshiIconTilted } from '../../icons'
import { AnonymousAvatar, LinkableAvatar, ProjectAvatarLink } from '../../ui'
import { ExternalAccountLinkIcon } from './ExternalAccountLinkIcon'
import { renderFunderBadges } from './renderFunderBadges'

type Props = HTMLChakraProps<'div'> & {
  fundingTx: FundingTxForUserContributionFragment
  showsProjectLink?: boolean
  linkedProject?: Project
  count?: number
}

export const ProjectFundingContributionsFeedItem = ({
  fundingTx,
  linkedProject,
  count,
  ...rest
}: Props) => {
  const { funder } = fundingTx

  const isFunderAnonymous = Boolean(funder?.user) === false
  const timeAgo = getDaysAgo(fundingTx?.paidAt || '')
  const wasMadeOnChain = fundingTx.onChain

  const avatarMetadata = getAvatarMetadata({
    funder,
    source: fundingTx.source,
  })

  const funderBadges = computeFunderBadges({
    creationDateStringOfFundedContent:
      fundingTx.sourceResource?.createdAt || '',
    funder,
  })

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderWidth="2px"
      borderColor={'neutral.100'}
      _hover={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.08)' }}
      rounded={'md'}
      px={'26px'}
      py={'10px'}
      {...rest}
    >
      <VStack flexDirection="column" spacing={'6px'} overflow={'hidden'}>
        {/* Funding Stats Header */}

        <Box display="flex" justifyContent="space-between" width={'full'}>
          {/* Funder Avatar */}
          <HStack>
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
                imageSrc={funder.user?.imageUrl || ''}
                avatarUsername={funder.user?.username || ''}
                userProfileID={funder.user?.id}
                fontSize={'14px'}
                imageSize={'20px'}
                textColor="neutral.900"
                badgeNames={funderBadges.map((badge) => badge.badge)}
                badgeElements={renderFunderBadges(funderBadges)}
              />
            )}
            {count && count > 1 && (
              <HStack
                backgroundColor="brand.gray100"
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
                  STREAMS
                </Text>
              </HStack>
            )}
          </HStack>

          {/* Funding Amount */}
          <Box display="flex" alignItems="center">
            <SatoshiIconTilted scale={0.7} />
            <Text>{`${commaFormatted(fundingTx.amount)}`} </Text>
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

          <HStack color="neutral.700" spacing={2}>
            <Text fontSize={'xs'} noOfLines={1}>
              {`${wasMadeOnChain ? '⛓' : '⚡️'}`}
              {timeAgo ? `${timeAgo} ago` : 'Some time ago'}
            </Text>

            <ExternalAccountLinkIcon fundingTx={fundingTx} />

            {linkedProject ? (
              <>
                <Text>▶</Text>
                <ProjectAvatarLink project={linkedProject} />
              </>
            ) : null}
          </HStack>
        </Stack>
      </VStack>
    </Box>
  )
}
