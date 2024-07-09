import { Button, HStack, IconButton, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BsPencil } from 'react-icons/bs'

import { SkeletonLayout } from '../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../components/typography'
import { ProjectAffiliateLinkFragment } from '../../../../../../../types'
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
        header: t('%'),
        key: 'affiliateFeePercentage',
        colSpan: 1,
        isMobile: true,
      },
      {
        header: t('Refferal Code'),
        key: 'affiliateId',
        colSpan: 2,
        isMobile: true,
      },
      {
        header: t('email'),
        key: 'email',
        colSpan: 2,
      },
    ],
    [t],
  )

  const ActiveTableExtraColumns = useMemo(() => {
    const data = [] as TableData<ProjectAffiliateLinkFragment>[]

    if (!isDisabled) {
      data.push({
        header: t('Created At'),
        key: 'createdAt',
        value(val: ProjectAffiliateLinkFragment) {
          return DateTime.fromMillis(val.createdAt).toFormat('LLL dd, yyyy')
        },
        colSpan: 2,
      })
    } else {
      data.push({
        header: t('Disabled At'),
        key: 'disabledAt',
        value(val: ProjectAffiliateLinkFragment) {
          return DateTime.fromMillis(val.disabledAt).toFormat('LLL dd, yyyy')
        },
        colSpan: 2,
      })
    }

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
  }, [onDelete, onEdit, isDisabled, t])

  const dropDown = {
    header: '',
    key: 'dropdown',
    colSpan: 1,
    isMobile: true,
  }

  const tableSchema = [...tableData, ...ActiveTableExtraColumns, dropDown]

  const renderAccordionContent = useCallback(
    (val: ProjectAffiliateLinkFragment) => {
      return (
        <VStack w="full" spacing={2} alignItems={'end'}>
          <HStack>
            <Body2 bold color="neutral1.9">
              {t('Lightning Address:')}
            </Body2>
            <Body2>{val.lightningAddress}</Body2>
          </HStack>
          <HStack>
            <Body2 bold color="neutral1.9">
              {t('Affiliate Project Link:')}
            </Body2>
            <Body2>{`${window.location.origin}/${projectName}?refId=${val.affiliateId}`}</Body2>
          </HStack>
        </VStack>
      )
    },
    [projectName, t],
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
