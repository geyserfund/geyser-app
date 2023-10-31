import {
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  CardLayout,
  SkeletonLayout,
} from '../../../../../../components/layouts'
import { Body1, H3 } from '../../../../../../components/typography'
import { getPath } from '../../../../../../constants'
import { useProjectContext } from '../../../../../../context'
import {
  FundingTxForOverviewPageFragment,
  OrderByOptions,
  useFundingTxForOverviewPageLazyQuery,
} from '../../../../../../types'
import { useNotification } from '../../../../../../utils'
import { AvatarElement } from '../../../../projectMainBody/components'

type ContributorDisplayType = {
  user: FundingTxForOverviewPageFragment['funder']['user']
  amount: number
  comment: string
  noOfRewards: number
  imageUrl: string
}

const CONTRIBUTORS_TO_DISPLAY = 5

export const ContributorsComponent = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project } = useProjectContext()

  const [contributors, setContributors] = useState<ContributorDisplayType[]>([])

  const [getFundingTxForOverview, { loading }] =
    useFundingTxForOverviewPageLazyQuery({
      onError() {
        toast({
          title: 'Error fetching project stats',
          description: 'Please refresh the page and try again.',
          status: 'error',
        })
      },
      onCompleted(data) {
        const contributors = data.fundingTxsGet.map((fundingTx) => {
          let noOfRewards = 0
          const rewards = fundingTx.funder.rewards.filter((reward) =>
            project?.rewards.some(
              (projectRewards) => projectRewards.id === reward.projectReward.id,
            ),
          )
          if (rewards.length > 0) {
            rewards.map((reward) => {
              noOfRewards += reward.quantity
            })
          }

          const contributor: ContributorDisplayType = {
            user: fundingTx.funder.user,
            amount: fundingTx.amount,
            comment: fundingTx.comment || '',
            imageUrl: fundingTx.funder.user?.imageUrl || '',
            noOfRewards,
          }
          return contributor
        })
        setContributors(contributors)
      },
    })

  useEffect(() => {
    if (project?.id) {
      getFundingTxForOverview({
        variables: {
          input: {
            orderBy: {
              createdAt: OrderByOptions.Desc,
            },
            pagination: {
              take: CONTRIBUTORS_TO_DISPLAY,
            },
            where: {
              projectId: project.id,
              dateRange: {
                startDateTime: DateTime.now().minus({ days: 7 }).toMillis(),
                endDateTime: DateTime.now().toMillis(),
              },
            },
          },
        },
      })
    }
  }, [project?.id, getFundingTxForOverview])

  return (
    <CardLayout
      as={VStack}
      w="full"
      alignItems="start"
      spacing="10px"
      mobileDense
      padding={{ base: '0px', lg: '20px' }}
    >
      <HStack w="full" justifyContent="space-between">
        <H3>{t('Contributors')}</H3>

        <Button
          as={Link}
          to={getPath('projectContributors', project?.name)}
          variant="primaryLink"
          size="sm"
        >
          {t('View all')}
        </Button>
      </HStack>
      {loading ? (
        <SkeletonLayout height="250px" width="full" />
      ) : contributors.length === 0 ? (
        <Body1>{t('No data available')}</Body1>
      ) : (
        <CardLayout padding="10px" w="full">
          <TableContainer>
            <Table
              variant="unstyled"
              __css={{
                '& td,th': {
                  paddingY: '5px',
                  paddingX: '5px',
                },
              }}
            >
              <Thead>
                <Tr>
                  <Th>{t('Contributor')}</Th>
                  <Th>{t('Amount')}</Th>
                  <Th>{t('Comment')}</Th>
                  <Th>{t('Rewards')}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {contributors.map((contributor, index) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        <AvatarElement
                          noLink={!contributor?.user?.id}
                          user={contributor.user}
                        />
                      </Td>
                      <Td>{contributor.amount} sats</Td>
                      <Td isTruncated maxWidth="250px">
                        {contributor.comment}
                      </Td>
                      <Td>
                        {contributor.noOfRewards} {t('reward')}
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </CardLayout>
      )}
    </CardLayout>
  )
}
