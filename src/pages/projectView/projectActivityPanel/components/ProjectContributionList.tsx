import { Divider } from '@chakra-ui/react'
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
      spacing={'20px'}
      width="100%"
      overflow="auto"
      height={'100%'}
      padding="15px"
    >
      {fundingTxs.data.map((fundingTx, index) => {
        return (
          <Fragment key={fundingTx.id}>
            <ContributionActivityItem
              fundingTx={fundingTx}
              count={fundingTx.count}
            />
            {index < fundingTxs.data.length - 1 && (
              <Divider
                borderBottomWidth="2px"
                maxWidth="500px"
                color="brand.200"
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
    </CardLayout>
  )
}
