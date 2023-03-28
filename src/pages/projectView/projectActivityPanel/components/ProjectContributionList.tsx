import { Divider, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { CardLayout } from '../../../../components/layouts'
import { ID } from '../../../../constants/components'
import { ScrollInvoke } from '../../../../helpers'
import { PaginationHookReturn } from '../../../../hooks/types'
import { FundingTxWithCount, useMobileMode } from '../../../../utils'
import { ContributionActivityItem } from '../../../landing/feed/components'

interface ProjectContributionListProps {
  fundingTxs: PaginationHookReturn<FundingTxWithCount>
}

export const ProjectContributionList = ({
  fundingTxs,
}: ProjectContributionListProps) => {
  const isMobile = useMobileMode()
  const id = ID.project.activity.contribution
  return (
    <CardLayout
      id={id}
      noborder
      width="100%"
      overflow="auto"
      height={'100%'}
      padding="0px"
    >
      <VStack spacing={'15px'} marginTop="20px" paddingRight="10px">
        {fundingTxs.data.map((fundingTx, index) => {
          return (
            <Fragment key={fundingTx.id}>
              <ContributionActivityItem
                fundingTx={fundingTx}
                count={fundingTx.count}
                dateTime={fundingTx.paidAt}
              />
              {index < fundingTxs.data.length - 1 && (
                <Divider
                  borderBottomWidth="2px"
                  maxWidth="500px"
                  borderColor="neutral.200"
                />
              )}
            </Fragment>
          )
        })}

        <ScrollInvoke
          elementId={!isMobile ? id : undefined}
          onScrollEnd={fundingTxs.fetchNext}
          isLoading={fundingTxs.isLoadingMore}
          noMoreItems={fundingTxs.noMoreItems}
        />
      </VStack>
    </CardLayout>
  )
}
