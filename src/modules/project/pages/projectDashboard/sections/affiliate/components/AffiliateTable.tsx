import { Button, HStack, IconButton, Tooltip, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPencil } from 'react-icons/bs'
import { PiCopy } from 'react-icons/pi'

import { SkeletonLayout } from '../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../components/typography'
import { ProjectAffiliateLinkFragment } from '../../../../../../../types'
import { commaFormatted, copyTextToClipboard } from '../../../../../../../utils'
import {
  TableData,
  TableWithAccordion,
} from '../../../../projectView/views/projectCreatorViews/sections/contributors/components'

export const AffiliateTable = ({
  projectName,
  data,
  onDelete,
  onEdit,
  isDisabled,
}: {
  projectName: string
  data: ProjectAffiliateLinkFragment[]
  onDelete?: (id: ProjectAffiliateLinkFragment) => void
  onEdit?: (id: ProjectAffiliateLinkFragment) => void
  isDisabled?: boolean
}) => {
  const { t } = useTranslation()

  const tableData: TableData<ProjectAffiliateLinkFragment>[] = useMemo(
    () => [
      {
        header: t('Name'),
        key: 'label',
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('Link'),
        key: 'affiliateLink',
        colSpan: 1,
        isMobile: true,
        render(val: ProjectAffiliateLinkFragment) {
          const affiliateLink = `${window.location.origin}/project/${projectName}?refId=${val.affiliateId}`
          return (
            <Tooltip label={t('Copy to clipboard')}>
              <IconButton
                aria-label="copy-link"
                variant="ghost"
                size="sm"
                icon={<PiCopy />}
                onClick={() => copyTextToClipboard(affiliateLink)}
                _pressed={{ backgroundColor: 'primary.400', color: 'black' }}
              >
                {val.affiliateId}
                {val.stats?.sales.total}
              </IconButton>
            </Tooltip>
          )
        },
      },
      {
        header: t('%'),
        key: 'affiliateFeePercentage',
        colSpan: 1,
        isMobile: true,
        value: (val: ProjectAffiliateLinkFragment) => `${val.affiliateFeePercentage}%`,
      },
      {
        header: `${t('Sales')} (sats)`,
        key: 'val.stats.sales.total',
        colSpan: 2,
        value: (val: ProjectAffiliateLinkFragment) => `${commaFormatted(val.stats?.sales.total || 0)}`,
      },
      {
        header: `${t('Sales')} (count)`,
        key: 'val.stats.sales.count',
        colSpan: 2,
        value: (val: ProjectAffiliateLinkFragment) => `${commaFormatted(val.stats?.sales.count || 0)}`,
      },
    ],
    [t, projectName],
  )

  const ActiveTableExtraColumns = useMemo(() => {
    const data = [] as TableData<ProjectAffiliateLinkFragment>[]

    if (onDelete || onEdit) {
      data.push({
        header: 'Actions',
        key: 'actions',
        colSpan: 2,
        isMobile: true,
        render(val: ProjectAffiliateLinkFragment) {
          return (
            <HStack>
              {onEdit && (
                <IconButton
                  aria-label="edit-affilite-link"
                  variant="secondary"
                  size="sm"
                  onClick={() => onEdit(val)}
                  icon={<BsPencil />}
                />
              )}
              {onDelete && (
                <Button variant="solid" colorScheme="red" size="sm" onClick={() => onDelete(val)}>
                  {t('Disable')}
                </Button>
              )}
            </HStack>
          )
        },
      })
    }

    return data
  }, [onDelete, onEdit, t])

  const dropDown = {
    header: '',
    key: 'dropdown',
    colSpan: 1,
    isMobile: true,
  }

  const tableSchema = [...tableData, ...ActiveTableExtraColumns, dropDown]

  const renderAccordionContent = useCallback(
    (val: ProjectAffiliateLinkFragment) => {
      const affiliateLink = `${window.location.origin}/project/${projectName}?refId=${val.affiliateId}`

      return (
        <VStack w="full" spacing={2} alignItems={'end'}>
          {!isDisabled ? (
            <HStack>
              <Body2 bold color="neutral1.9">
                {t('Created At')}:
              </Body2>
              <Body2>{DateTime.fromMillis(val.createdAt).toFormat('LLL dd, yyyy')}</Body2>
            </HStack>
          ) : (
            <HStack>
              <Body2 bold color="neutral1.9">
                {t('Disabled At')}:
              </Body2>
              <Body2>{DateTime.fromMillis(val.disabledAt).toFormat('LLL dd, yyyy')}</Body2>
            </HStack>
          )}
          <HStack>
            <Body2 bold color="neutral1.9">
              {t('Email')}:
            </Body2>
            <Body2>{val.email}</Body2>
          </HStack>
          <HStack>
            <Body2 bold color="neutral1.9">
              {t('Lightning Address')}:
            </Body2>
            <Body2>{val.lightningAddress}</Body2>
          </HStack>
          <HStack>
            <Body2 bold color="neutral1.9">
              {t('Affiliate Project Link')}:
            </Body2>
            <Tooltip label={t('Copy to clipboard')}>
              <Button variant="ghost" size="sm" onClick={() => copyTextToClipboard(affiliateLink)}>
                {affiliateLink}
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
      )
    },
    [projectName, t, isDisabled],
  )

  return (
    <TableWithAccordion<ProjectAffiliateLinkFragment>
      items={data}
      schema={tableSchema}
      accordionContent={renderAccordionContent}
    />
  )
}

export const AffiliateTableSkeleton = () => {
  return (
    <VStack width="100%" flexGrow={1} spacing="10px" pt="10px">
      <SkeletonLayout borderRadius={0} height="30px" />
      <VStack w="full" spacing="60px">
        <SkeletonLayout borderRadius={0} height="60px" />
        <SkeletonLayout borderRadius={0} height="60px" />
        <SkeletonLayout borderRadius={0} height="60px" />
        <SkeletonLayout borderRadius={0} height="60px" />
      </VStack>
    </VStack>
  )
}
