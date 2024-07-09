import { Button, HStack } from '@chakra-ui/react'
import { table } from 'console'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Body1, Body2 } from '../../../../../../../components/typography'
import { ProjectAffiliateLinkFragment } from '../../../../../../../types'
import {
  TableData,
  TableWithAccordion,
} from '../../../../projectView/views/projectCreatorViews/sections/contributors/components'

export const AffiliateTable = ({
  projectName,
  data,
  onDelete,
  isDisabled,
}: {
  projectName: string
  data: ProjectAffiliateLinkFragment[]
  onDelete?: (id: number) => void
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
      {
        header: t('Affiliate link'),
        key: 'email',
        colSpan: 2,
        isAccordion: true,
        render(val: ProjectAffiliateLinkFragment) {
          return (
            <HStack>
              <Body2 bold color="neutral1.9">
                {t('Affiliate Project Link:')}
              </Body2>
              <Body2>{`${window.location.origin}/${projectName}?refferalId=${val.affiliateId}`}</Body2>
            </HStack>
          )
        },
      },
    ],
    [t, projectName],
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

    if (onDelete) {
      data.push({
        header: 'Actions',
        key: 'actions',
        colSpan: 2,
        isMobile: true,
        render(val: ProjectAffiliateLinkFragment) {
          return (
            <HStack>
              <Button variant="danger" size="sm" onClick={() => onDelete(val.id)}>
                {t('Disable')}
              </Button>
            </HStack>
          )
        },
      })
    }

    return data
  }, [onDelete, isDisabled, t])

  const dropDown = {
    header: '',
    key: 'dropdown',
    colSpan: 1,
    isMobile: true,
  }

  const tableSchema = [...tableData, ...ActiveTableExtraColumns, dropDown]

  return <TableWithAccordion<ProjectAffiliateLinkFragment> items={data} schema={tableSchema} />
}
