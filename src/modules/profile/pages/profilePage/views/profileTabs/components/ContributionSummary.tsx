import { Box, HStack, Image, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { SatsAmount, TransactionTime } from '../../../../../../../components/molecules'
import { Body2, H3 } from '../../../../../../../components/typography'
import { ImageWithReload } from '../../../../../../../components/ui'
import { getPath } from '../../../../../../../shared/constants'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { toSmallImageUrl } from '../../../../../../../utils'
import {
  FunderInsideUserContributionsFragment,
  ProjectInsideUserContributionsFragment,
} from '../hooks/useProfileContributions'

interface ContributionSummaryProps {
  funder: FunderInsideUserContributionsFragment
  project: ProjectInsideUserContributionsFragment
}

export const ContributionSummary = ({ funder, project }: ContributionSummaryProps) => {
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
          <H3 color="neutral.900">{project.title}</H3>
        </HStack>
        <SatsAmount color="neutral.900" fontSize="14px" fontWeight={700} iconProps={{ boxSize: '20px' }}>
          {funder?.amountFunded ?? 0}
        </SatsAmount>
      </HStack>
      {funder?.fundingTxs.map((tx, i) => {
        return (
          <CardLayout
            key={tx.paidAt}
            padding="10px"
            borderTopRightRadius="0px"
            borderTopLeftRadius="0px"
            borderX={'none'}
            borderBottom="none"
            borderColor="neutral.200"
            direction="row"
            alignItems="start"
            w="full"
          >
            <VStack flex={1} alignItems={'start'}>
              {tx.comment && <Body2 color="neutral.900">{tx.comment}</Body2>}
              {tx.media ? (
                <Box h={'178px'} bg={'gray.100'} pos={'relative'} borderRadius="8px">
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
              <TransactionTime onChain={tx.onChain} dateTime={tx.paidAt} />
            </VStack>
            <SatsAmount color="neutral.900" fontSize="14px" fontWeight={500} iconProps={{ boxSize: '14px' }}>
              {tx?.amountPaid ?? 0}
            </SatsAmount>
          </CardLayout>
        )
      })}
    </CardLayout>
  )
}
