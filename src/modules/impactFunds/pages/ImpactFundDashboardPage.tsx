import { useQuery } from '@apollo/client'
import { Box, Button, Card, HStack, Image, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'
import { PiArrowUpRightBold } from 'react-icons/pi'
import { Link, useParams } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { NotAuthorized } from '@/modules/general/fallback'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import type { ImpactFundQuery } from '@/types'

import { QUERY_IMPACT_FUND, QUERY_IMPACT_FUND_DASHBOARD_APPLICATIONS } from '../graphql/queries/impactFundsQuery.ts'

const APPLICATIONS_PAGE_SIZE = 25

type ImpactFundDetails = ImpactFundQuery['impactFund'] & { canAccessDashboard: boolean }
type DashboardApplication = {
  applicationId: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED' | 'FUNDED' | 'ONGOING' | 'IN_REVIEW'
  fundingModel: 'DIRECT_GRANT' | 'MATCHING' | 'AON_COFUNDING'
  project: {
    id: string
    name: string
    title: string
    thumbnailImage?: string | null
    shortDescription?: string | null
  }
  creator?: {
    id: string
    username: string
    email?: string | null
  } | null
  projectPath: string
}
type ImpactFundDashboardApplicationsData = {
  impactFundDashboardApplications: {
    totalCount: number
    applications: DashboardApplication[]
  }
}

const applicationStatusLabels: Record<DashboardApplication['status'], string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CANCELED: 'Canceled',
  FUNDED: 'Funded',
  ONGOING: 'Ongoing',
  IN_REVIEW: 'In Review',
}

function buildDashboardApplicationsInput(impactFundId: number, cursorId?: string) {
  return {
    impactFundId,
    pagination: {
      take: APPLICATIONS_PAGE_SIZE,
      ...(cursorId ? { cursor: { id: cursorId } } : {}),
    },
  }
}

function getApplicationStatusLabel(status: DashboardApplication['status']) {
  return applicationStatusLabels[status] ?? status
}

function ApplicationsTable({ applications }: { applications: DashboardApplication[] }) {
  const [expandedApplicationId, setExpandedApplicationId] = useState<string | null>(null)

  if (applications.length === 0) {
    return (
      <Card p={8}>
        <Body>{t('No applications yet.')}</Body>
      </Card>
    )
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('Project title')}</Th>
            <Th w="320px" minW="320px" maxW="320px">
              {t('Short description')}
            </Th>
            <Th>{t('Creator Username')}</Th>
            <Th>{t('Creator Email')}</Th>
            <Th>{t('Application status')}</Th>
            <Th>{t('View Project')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {applications.map((application) => (
            <Tr
              key={application.applicationId}
              cursor="pointer"
              verticalAlign="top"
              onClick={() =>
                setExpandedApplicationId((current) =>
                  current === application.applicationId ? null : application.applicationId
                )
              }
            >
              <Td whiteSpace="nowrap" verticalAlign="top">
                <HStack align="start" spacing={3}>
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="md"
                    overflow="hidden"
                    bg="neutral1.100"
                    flexShrink={0}
                  >
                    {application.project.thumbnailImage ? (
                      <Image
                        src={application.project.thumbnailImage}
                        alt={application.project.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    ) : null}
                  </Box>
                  <Body size="sm" whiteSpace="nowrap">
                    {application.project.title}
                  </Body>
                </HStack>
              </Td>
              <Td w="320px" minW="320px" maxW="320px" verticalAlign="top">
                <Body
                  size="sm"
                  whiteSpace={expandedApplicationId === application.applicationId ? 'normal' : 'nowrap'}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {application.project.shortDescription || ' - '}
                </Body>
              </Td>
              <Td whiteSpace="nowrap" verticalAlign="top">
                {application.creator?.username || 'Unknown'}
              </Td>
              <Td whiteSpace="nowrap" verticalAlign="top">
                {application.creator?.email || ' - '}
              </Td>
              <Td whiteSpace="nowrap" verticalAlign="top">
                {getApplicationStatusLabel(application.status)}
              </Td>
              <Td verticalAlign="top">
                <Button
                  as={Link}
                  to={application.projectPath}
                  variant="link"
                  colorScheme="primary1"
                  onClick={(event) => event.stopPropagation()}
                  aria-label={t('View project')}
                >
                  <PiArrowUpRightBold />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export function ImpactFundDashboardPage() {
  const { impactFundName } = useParams<{ impactFundName: string }>()
  const decodedImpactFundName = impactFundName ? decodeURIComponent(impactFundName) : ''
  const [isLoadingMoreApplications, setIsLoadingMoreApplications] = useState(false)

  const { data, loading, error } = useQuery<{ impactFund: ImpactFundDetails }>(QUERY_IMPACT_FUND, {
    variables: { input: { where: { name: decodedImpactFundName } } },
    skip: !impactFundName,
  })

  const impactFund: ImpactFundDetails | undefined = data?.impactFund
  const canAccessDashboard = impactFund?.canAccessDashboard ?? false

  const {
    data: applicationsData,
    loading: applicationsLoading,
    error: applicationsError,
    fetchMore,
  } = useQuery<ImpactFundDashboardApplicationsData>(QUERY_IMPACT_FUND_DASHBOARD_APPLICATIONS, {
    skip: !impactFund?.id || !canAccessDashboard,
    variables: {
      input: buildDashboardApplicationsInput(impactFund?.id ?? 0),
    },
  })

  const applications = applicationsData?.impactFundDashboardApplications?.applications ?? []
  const totalCount = applicationsData?.impactFundDashboardApplications?.totalCount ?? 0
  const hasMoreApplications = applications.length < totalCount

  const loadMoreApplications = async () => {
    const lastApplicationId = applications.at(-1)?.applicationId

    if (!impactFund?.id || !lastApplicationId || isLoadingMoreApplications) {
      return
    }

    setIsLoadingMoreApplications(true)

    try {
      await fetchMore({
        variables: {
          input: buildDashboardApplicationsInput(impactFund.id, lastApplicationId),
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          if (!fetchMoreResult?.impactFundDashboardApplications) {
            return previousResult
          }

          return {
            impactFundDashboardApplications: {
              ...fetchMoreResult.impactFundDashboardApplications,
              applications: [
                ...previousResult.impactFundDashboardApplications.applications,
                ...fetchMoreResult.impactFundDashboardApplications.applications,
              ],
            },
          }
        },
      })
    } finally {
      setIsLoadingMoreApplications(false)
    }
  }

  if (loading) {
    return (
      <Card p={8}>
        <VStack py={8}>
          <Spinner />
        </VStack>
      </Card>
    )
  }

  if (error) {
    return (
      <Card p={8}>
        <Body>{t('Failed to load impact fund dashboard.')}</Body>
      </Card>
    )
  }

  if (!impactFund) {
    return null
  }

  if (!canAccessDashboard) {
    return <NotAuthorized />
  }

  return (
    <>
      <Head title={`${impactFund.title} Dashboard`} />
      <VStack align="stretch" spacing={6}>
        <Card p={{ base: 6, md: 8 }}>
          <VStack align="stretch" spacing={2}>
            <Body size="sm">{t('Impact Fund Dashboard')}</Body>
            <H2 size="2xl" bold>
              {impactFund.title}
            </H2>
            <Body color="neutral1.500">{t('Read-only view of all applications to this impact fund.')}</Body>
          </VStack>
        </Card>

        <Card p={{ base: 4, md: 6 }}>
          <VStack align="stretch" spacing={4}>
            <H2 size="lg" bold>
              {t('Applications')}
            </H2>
            {applicationsLoading ? (
              <VStack py={8}>
                <Spinner />
              </VStack>
            ) : applicationsError ? (
              <Body>{t('Failed to load impact fund applications.')}</Body>
            ) : (
              <ApplicationsTable applications={applications} />
            )}
            {hasMoreApplications && !applicationsLoading && !applicationsError && (
              <Button
                alignSelf="flex-start"
                onClick={loadMoreApplications}
                isLoading={isLoadingMoreApplications}
                colorScheme="primary1"
                variant="outline"
              >
                {t('Load more')}
              </Button>
            )}
          </VStack>
        </Card>
      </VStack>
    </>
  )
}
