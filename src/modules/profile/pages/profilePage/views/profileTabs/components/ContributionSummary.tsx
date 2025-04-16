import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ImageWithReload } from '@/shared/components/display/ImageWithReload'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H3 } from '@/shared/components/typography'
import { ProjectAvatarFragment, UserProjectFunderFragment } from '@/types'

import { TransactionTime } from '../../../../../../../components/molecules'
import { getPath } from '../../../../../../../shared/constants'
import { commaFormatted, convertSatsToUsdFormatted, toSmallImageUrl } from '../../../../../../../utils'

interface ContributionSummaryProps {
  funder: UserProjectFunderFragment
  project: ProjectAvatarFragment
}

export const ContributionSummary = ({ funder, project }: ContributionSummaryProps) => {
  const contributions = funder?.contributions ? [...funder.contributions] : []
  const orderedContributions =
    contributions.length > 0 ? contributions.sort((a, b) => b.confirmedAt - a.confirmedAt) : []
  return (
    <CardLayout
      as={Link}
      to={getPath('project', project.name)}
      padding="0px"
      hover
      w="full"
      overflow={'visible'}
      spacing="0"
    >
      <HStack padding="10px" justifyContent="space-between">
        <HStack>
          <ImageWithReload
            width="50px"
            height="50px"
            objectFit="cover"
            src={toSmallImageUrl(project.thumbnailImage || '')}
            alt={`${project.title}-header-image`}
            borderRadius="8px"
          />
          <H3 size="lg" medium>
            {project.title}
          </H3>
        </HStack>
        <Body size="sm" dark medium wordBreak="keep-all">
          {commaFormatted(funder?.amountFunded) ?? 0}{' '}
          <Body as="span" light>
            sats
          </Body>
        </Body>
      </HStack>
      {orderedContributions.map((tx, i) => {
        return (
          <CardLayout
            key={tx.confirmedAt}
            padding="10px"
            borderTopRightRadius="0px"
            borderTopLeftRadius="0px"
            borderX={'none'}
            borderBottom="none"
            borderColor="neutral1.6"
            direction="row"
            alignItems="start"
            w="full"
          >
            <VStack flex={1} alignItems={'start'}>
              {tx.comment && <Body size="sm">{tx.comment}</Body>}
              {tx.media ? (
                <Box h={'178px'} bg={'neutral1.6'} pos={'relative'} borderRadius="8px">
                  <Image
                    src={tx.media}
                    alt={`tx-comment-${i}`}
                    objectFit={'cover'}
                    width="full"
                    height="full"
                    borderRadius="4px"
                  />
                </Box>
              ) : null}
              <TransactionTime dateTime={tx.confirmedAt} />
            </VStack>

            <Body size="sm" dark medium>
              {commaFormatted(tx?.amount) ?? 0}{' '}
              <Body as="span" light>
                {`sats (${convertSatsToUsdFormatted({ sats: tx?.amount, bitcoinQuote: tx.bitcoinQuote })})`}
              </Body>
            </Body>
          </CardLayout>
        )
      })}
    </CardLayout>
  )
}
