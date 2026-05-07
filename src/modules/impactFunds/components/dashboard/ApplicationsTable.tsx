import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { type ComponentProps } from 'react'
import { PiArrowsDownUpBold, PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi'

import { Tooltip } from '@/components/ui/Tooltip'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter'
import {
  type ImpactFundDashboardApplicationsQuery,
  ImpactFundDashboardApplicationsSort,
  ProjectFundingStrategy,
} from '@/types'

import { type DashboardAction, ApplicationActionsMenu } from './ApplicationActionsMenu'
import { ApplicationStatusTag } from './ApplicationStatusTag'
import { NOT_PROVIDED_PLACEHOLDER, projectFundingStrategyLabels } from './dashboardConstants'
import { formatDate, formatEnumLabel, formatSatsCompact } from './dashboardFormatters'
import { FundingModelTag } from './FundingModelTag'
import { IdentityVerifiedBadge } from './IdentityVerifiedBadge'

type DashboardApplication =
  ImpactFundDashboardApplicationsQuery['impactFundDashboardApplications']['applications'][number]

type ApplicationsTableProps = {
  applications: DashboardApplication[]
  sort: ImpactFundDashboardApplicationsSort
  onSortChange: (sort: ImpactFundDashboardApplicationsSort) => void
  onOpenApplication: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  selectedApplicationId?: string | null
}

const stickyLeft = {
  position: 'sticky' as const,
  left: 0,
  zIndex: 1,
  bg: 'utils.pbg',
}

const stickyRight = {
  position: 'sticky' as const,
  right: 0,
  zIndex: 1,
  bg: 'utils.pbg',
}

const headerCellSx = {
  fontSize: '11px',
  color: 'neutral1.11',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  borderColor: 'neutral1.6',
  bg: 'neutral1.2',
  position: 'sticky' as const,
  top: 0,
  zIndex: 2,
}

export function ApplicationsTable({
  applications,
  sort,
  onSortChange,
  onOpenApplication,
  onAction,
  selectedApplicationId,
}: ApplicationsTableProps) {
  return (
    <TableContainer borderWidth="1px" borderColor="neutral1.6" borderRadius="md" maxH="70vh" overflowY="auto">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th {...headerCellSx} {...stickyLeft} zIndex={3}>
              {t('Project')}
            </Th>
            <Th {...headerCellSx}>{t('Country')}</Th>
            <Th {...headerCellSx}>{t('Category')}</Th>
            <Th {...headerCellSx}>{t('Creator')}</Th>
            <SortableHeader
              label="Applied"
              sortValues={{
                asc: ImpactFundDashboardApplicationsSort.Oldest,
                desc: ImpactFundDashboardApplicationsSort.Latest,
                default: ImpactFundDashboardApplicationsSort.Latest,
              }}
              currentSort={sort}
              onSortChange={onSortChange}
            />
            <SortableHeader
              label="Status"
              sortValues={{
                asc: ImpactFundDashboardApplicationsSort.StatusAsc,
                desc: ImpactFundDashboardApplicationsSort.StatusDesc,
                default: ImpactFundDashboardApplicationsSort.StatusAsc,
              }}
              currentSort={sort}
              onSortChange={onSortChange}
            />
            <SortableHeader
              label="Funded"
              sortValues={{
                asc: ImpactFundDashboardApplicationsSort.AmountAwardedAsc,
                desc: ImpactFundDashboardApplicationsSort.AmountAwardedDesc,
                default: ImpactFundDashboardApplicationsSort.AmountAwardedDesc,
              }}
              currentSort={sort}
              onSortChange={onSortChange}
              isNumeric
            />
            <Th {...headerCellSx}>{t('Modality')}</Th>
            <Th {...headerCellSx} {...stickyRight} zIndex={3} textAlign="right">
              {t('Actions')}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {applications.map((application) => (
            <ApplicationRow
              key={application.applicationId}
              application={application}
              onOpenApplication={onOpenApplication}
              onAction={onAction}
              isSelected={String(application.applicationId) === selectedApplicationId}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

type ApplicationRowProps = {
  application: DashboardApplication
  onOpenApplication: (applicationId: string) => void
  onAction: (action: DashboardAction, application: DashboardApplication) => void
  isSelected: boolean
}

function ApplicationRow({ application, onOpenApplication, onAction, isSelected }: ApplicationRowProps) {
  const { formatUsdAmount } = useCurrencyFormatter()
  const handleOpen = () => onOpenApplication(String(application.applicationId))

  const aonTarget =
    application.project.fundingStrategy === ProjectFundingStrategy.AllOrNothing
      ? formatSatsCompact(application.project.aonGoalAmount)
      : null

  const rowBg = isSelected ? 'primary1.2' : 'utils.pbg'
  const hoverBg = isSelected ? 'primary1.3' : 'neutral1.3'

  return (
    <Tr
      role="button"
      tabIndex={0}
      cursor="pointer"
      verticalAlign="middle"
      sx={{
        '& > td': { bg: rowBg, transition: 'background-color 120ms' },
        '&:hover > td': { bg: hoverBg },
        '&:focus-visible': { outline: '2px solid', outlineColor: 'primary1.9', outlineOffset: '-2px' },
      }}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleOpen()
        }
      }}
      aria-label={t('Open application for {{title}}', { title: application.project.title })}
    >
      <Td {...stickyLeft} maxW="280px">
        <HStack align="center" spacing={3}>
          <Box w="36px" h="36px" borderRadius="md" overflow="hidden" bg="neutral1.3" flexShrink={0}>
            {application.project.thumbnailImage ? (
              <Image
                src={application.project.thumbnailImage}
                alt=""
                w="full"
                h="full"
                objectFit="cover"
                loading="lazy"
              />
            ) : null}
          </Box>
          <VStack align="start" spacing={0} minW={0}>
            <Tooltip content={application.project.title}>
              <Body size="sm" bold noOfLines={1} maxW="200px">
                {application.project.title}
              </Body>
            </Tooltip>
            <Body size="xs" color="neutral1.9" noOfLines={1} maxW="200px">
              {t(
                projectFundingStrategyLabels[application.project.fundingStrategy] ||
                  application.project.fundingStrategy,
              )}
              {aonTarget ? ` · ${aonTarget}` : ''}
            </Body>
          </VStack>
        </HStack>
      </Td>
      <Td maxW="120px">
        <Body size="sm" noOfLines={1}>
          {application.project.country || NOT_PROVIDED_PLACEHOLDER}
        </Body>
      </Td>
      <Td maxW="160px">
        <Body size="sm" noOfLines={1}>
          {application.project.category ? t(formatEnumLabel(application.project.category)) : NOT_PROVIDED_PLACEHOLDER}
        </Body>
      </Td>
      <Td maxW="200px">
        {application.creator ? (
          <VStack align="start" spacing={0} minW={0}>
            <HStack spacing={1} minW={0}>
              <Body size="sm" noOfLines={1}>
                {application.creator.username}
              </Body>
              <IdentityVerifiedBadge isVerified={application.creator.isIdentityVerified} />
            </HStack>
            {application.creator.email ? (
              <Tooltip content={application.creator.email}>
                <Body size="xs" color="neutral1.9" noOfLines={1} maxW="180px">
                  {application.creator.email}
                </Body>
              </Tooltip>
            ) : null}
          </VStack>
        ) : (
          <Body size="sm" color="neutral1.9">
            {t('Unknown')}
          </Body>
        )}
      </Td>
      <Td>
        <Body size="sm">{formatDate(application.createdAt)}</Body>
      </Td>
      <Td>
        <ApplicationStatusTag status={application.status} />
      </Td>
      <Td isNumeric>
        {application.amountAwardedInSats ? (
          <VStack align="end" spacing={0}>
            <Body size="sm" bold>
              {formatSatsCompact(application.amountAwardedInSats)}
            </Body>
            <Body size="xs" color="neutral1.9">
              {formatUsdAmount(application.amountAwardedInSats)}
            </Body>
          </VStack>
        ) : (
          <Body size="sm" color="neutral1.9">
            {NOT_PROVIDED_PLACEHOLDER}
          </Body>
        )}
      </Td>
      <Td>
        <FundingModelTag fundingModel={application.fundingModel} />
      </Td>
      <Td {...stickyRight} textAlign="right" onClick={(event) => event.stopPropagation()}>
        <ApplicationActionsMenu
          onAction={(action) => onAction(action, application)}
          projectPath={application.projectPath}
        />
      </Td>
    </Tr>
  )
}

type SortableHeaderProps = {
  label: string
  sortValues: {
    asc: ImpactFundDashboardApplicationsSort
    desc: ImpactFundDashboardApplicationsSort
    default: ImpactFundDashboardApplicationsSort
  }
  currentSort: ImpactFundDashboardApplicationsSort
  onSortChange: (sort: ImpactFundDashboardApplicationsSort) => void
  isNumeric?: boolean
  thProps?: ComponentProps<typeof Th>
}

function SortableHeader({ label, sortValues, currentSort, onSortChange, isNumeric, thProps }: SortableHeaderProps) {
  const isActive = currentSort === sortValues.asc || currentSort === sortValues.desc
  const isAscending = currentSort === sortValues.asc
  const nextSort = isActive ? (isAscending ? sortValues.desc : sortValues.asc) : sortValues.default
  const ariaSort: 'ascending' | 'descending' | 'none' = isActive ? (isAscending ? 'ascending' : 'descending') : 'none'

  return (
    <Th {...headerCellSx} isNumeric={isNumeric} aria-sort={ariaSort} {...thProps}>
      <Button
        variant="ghost"
        size="xs"
        h="auto"
        minH="auto"
        px={0}
        py={0}
        fontSize="11px"
        fontWeight={700}
        color={isActive ? 'primary1.11' : 'neutral1.11'}
        textTransform="uppercase"
        letterSpacing="0.04em"
        rightIcon={
          <Icon
            as={isActive ? (isAscending ? PiCaretUpBold : PiCaretDownBold) : PiArrowsDownUpBold}
            boxSize="10px"
            color={isActive ? 'primary1.11' : 'neutral1.9'}
          />
        }
        onClick={() => onSortChange(nextSort)}
        aria-label={t('Sort by {{label}}', { label: t(label) })}
      >
        {t(label)}
      </Button>
    </Th>
  )
}
