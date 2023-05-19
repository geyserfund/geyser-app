import {
  Checkbox,
  Fade,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useEffect, useMemo, useState } from 'react'
import { CSVLink } from 'react-csv'
import { BiCheck, BiCopy, BiDownload } from 'react-icons/bi'

import { renderFunderBadges } from '../../components/molecules/projectActivity/renderFunderBadges'
import {
  AnonymousAvatar,
  ButtonComponent,
  LinkableAvatar,
  SatoshiAmount,
} from '../../components/ui'
import Loader from '../../components/ui/Loader'
import { useProjectContext } from '../../context'
import { QUERY_PROJECT_DASHBOARD_FUNDERS } from '../../graphql'
import { computeFunderBadges } from '../../helpers'
import { useQueryWithPagination } from '../../hooks'
import { Funder } from '../../types/generated/graphql'
import { toInt } from '../../utils'

type TableData = {
  header: string
  key: string | number
  render?: (val: any) => React.ReactNode
  value?: (val: any) => string | number
}

export const ProjectContributors = () => {
  const { project } = useProjectContext()

  const [selectedFunders, setSelectedFunders] = useState<Funder[]>([])
  const [csvData, setCsvData] = useState<(string | number)[][]>([])

  const [copied, setCopied] = useState(false)

  const funders = useQueryWithPagination<Funder>({
    queryName: 'getDashboardFunders',
    itemLimit: 100,
    options: {
      skip: !project,
    },
    query: QUERY_PROJECT_DASHBOARD_FUNDERS,
    where: { projectId: toInt(project?.id), confirmed: true },
    orderBy: {
      confirmedAt: 'desc',
    },
  })

  useEffect(() => {
    if (
      funders?.data &&
      !funders.isLoading &&
      !funders.isLoadingMore.current &&
      !funders.noMoreItems.current
    ) {
      funders.fetchNext()
    }
  }, [funders])

  const tableData: TableData[] = useMemo(
    () => [
      {
        header: 'Name',
        key: 'name',
        render(val: Funder) {
          const funderBadges = computeFunderBadges({
            creationDateStringOfFundedContent: project?.createdAt || '',
            funder: val,
          })
          const isFunderAnonymous = Boolean(val?.user) === false
          if (isFunderAnonymous) {
            return (
              <AnonymousAvatar
                seed={val.id}
                imageSize={'20px'}
                textColor="neutral.900"
              />
            )
          }

          return (
            <LinkableAvatar
              avatarUsername={val.user?.username || ''}
              userProfileID={val.user?.id}
              imageSrc={val.user?.imageUrl || ''}
              badgeNames={funderBadges.map((badge) => badge.badge)}
              badgeElements={renderFunderBadges(funderBadges)}
            />
          )
        },
      },
      {
        header: 'Contribution',
        key: 'amount',
        render: (val: Funder) => (
          <SatoshiAmount scale={0.7} fontSize="14px">
            {val.amountFunded}
          </SatoshiAmount>
        ),
      },
      {
        header: 'Reward',
        key: 'reward',
        value(val: Funder) {
          let value = ''
          val.rewards.map((reward) => {
            value = value
              ? `${value}, ${reward?.projectReward.name}(${reward?.quantity}x)`
              : `${reward?.projectReward.name}(${reward?.quantity}x)`
          })
          return value
        },
      },
      {
        header: 'Date',
        key: 'date',
        value(val: Funder) {
          const dateString = val.confirmedAt
            ? DateTime.fromMillis(toInt(val.confirmedAt)).toFormat(
                'yyyy / MM / dd',
              )
            : '-'
          return dateString
        },
      },
      {
        header: 'Email',
        key: 'email',
        value(val: Funder) {
          return val.rewards.length > 0
            ? val.fundingTxs?.find((val) => val.email)?.email || '-'
            : '-'
        },
      },
    ],
    [project],
  )

  const checkIfAllIsSelected = () => {
    return selectedFunders.length === funders.data.length
  }

  const checkIfSelected = (funderId?: string) => {
    return funderId
      ? selectedFunders.some((selectedFunder) => selectedFunder.id === funderId)
      : false
  }

  const handleCheckClicked = (event: any, funder: Funder) => {
    if (event.target.checked) {
      const newSelectedFunders = [...selectedFunders, funder]
      setSelectedFunders(newSelectedFunders)
    } else {
      const newSelectedFunders = selectedFunders.filter(
        (selectedFunder) => selectedFunder.id !== funder.id,
      )
      setSelectedFunders(newSelectedFunders)
    }
  }

  const handleAllCheckClicked = () => {
    const allIsSelected = checkIfAllIsSelected()
    if (allIsSelected) {
      setSelectedFunders([])
    } else {
      setSelectedFunders(funders.data as Funder[])
    }
  }

  const getCsvData = () => {
    const csvData: (string | number)[][] = []

    const headerData = tableData.map((column) => column.header)
    csvData.push(headerData)

    selectedFunders.map((funder) => {
      if (funder) {
        let rewardValue = ''
        funder.rewards.map((reward) => {
          rewardValue = rewardValue
            ? `${rewardValue}:${reward?.projectReward.name}(${reward?.quantity}x)`
            : `${reward?.projectReward.name}(${reward?.quantity}x)`
        })
        const dateString = funder.confirmedAt
          ? DateTime.fromMillis(parseInt(funder.confirmedAt, 10)).toFormat(
              'yyyy / mm / dd',
            )
          : '-'

        const funderData = [
          funder.user?.username || '-',
          funder.amountFunded || '-',
          rewardValue || '-',
          dateString || '-',
          funder.fundingTxs?.find((val) => val.email)?.email || '-',
        ]
        csvData.push(funderData)
      }
    })
    return csvData
  }

  const handleCopy = () => {
    const csvData = getCsvData()

    const textString = csvData
      .map((funderData) => {
        return funderData.join(',')
      })
      .join('\n')

    navigator.clipboard.writeText(textString)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleDownloadCSV = (_: any, done: any) => {
    if (selectedFunders.length === 0) {
      return
    }

    const csvData = getCsvData()
    setCsvData(csvData)
    done()
  }

  if (funders.isLoading) {
    return <Loader />
  }

  return (
    <Fade in>
      <HStack width="100%" justifyContent={'center'} paddingTop="20px">
        <VStack maxWidth="1200px" width="100%" alignItems="center">
          <HStack width="100%" justifyContent="space-between">
            <HStack>
              <Text fontSize={'16px'} fontWeight={600}>
                {project?.fundersCount} Contributors
              </Text>
              <Text fontSize={'14px'}>
                {selectedFunders.length > 0
                  ? `( ${selectedFunders.length} selected )`
                  : '( none selected )'}
              </Text>
            </HStack>

            <HStack>
              <ButtonComponent
                size="sm"
                primary={copied}
                onClick={handleCopy}
                leftIcon={
                  copied ? (
                    <BiCheck fontSize="20px" />
                  ) : (
                    <BiCopy fontSize="20px" />
                  )
                }
                isDisabled={selectedFunders.length === 0}
              >
                {copied ? 'Copied' : 'Copy'}
              </ButtonComponent>
              {selectedFunders.length === 0 ? (
                <ButtonComponent
                  size="sm"
                  leftIcon={<BiDownload fontSize="20px" />}
                  isDisabled
                >
                  Download CSV
                </ButtonComponent>
              ) : (
                <CSVLink
                  data={csvData}
                  asyncOnClick
                  onClick={handleDownloadCSV}
                >
                  <ButtonComponent
                    size="sm"
                    leftIcon={<BiDownload style={{ fontSize: '20px' }} />}
                  >
                    Download CSV
                  </ButtonComponent>
                </CSVLink>
              )}
            </HStack>
          </HStack>
          <TableContainer width="100%">
            <Table size="sm">
              <Thead backgroundColor={'primary.100'}>
                <Tr>
                  <Th maxWidth="30px">
                    <Checkbox
                      size="lg"
                      colorScheme="teal"
                      isChecked={checkIfAllIsSelected()}
                      onChange={handleAllCheckClicked}
                    />
                  </Th>
                  {tableData.map((row) => {
                    return (
                      <Th key={row.key} paddingY="10px">
                        <Text textTransform="capitalize">{row.header}</Text>
                      </Th>
                    )
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {funders.data.map((funder) => {
                  if (funder)
                    return (
                      <Tr key={funder.id}>
                        <Td maxWidth="30px">
                          <Checkbox
                            size="lg"
                            colorScheme="teal"
                            isChecked={checkIfSelected(funder.id)}
                            onChange={(event) =>
                              handleCheckClicked(event, funder)
                            }
                          />
                        </Td>
                        {tableData.map((row) => {
                          let value: any = ''
                          if (row.value) {
                            value = row.value(funder)
                          } else if (row.render) {
                            value = row.render(funder)
                          } else {
                            value = funder && funder[row.key as keyof Funder]
                          }

                          return (
                            <Td key={row.key} fontSize="14px">
                              {value}
                            </Td>
                          )
                        })}
                      </Tr>
                    )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </HStack>
    </Fade>
  )
}
