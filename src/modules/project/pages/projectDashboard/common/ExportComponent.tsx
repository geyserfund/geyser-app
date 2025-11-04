import { Box, Link } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { PiDownloadSimple } from 'react-icons/pi'
import { components, OptionProps } from 'react-select'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { useModal } from '../../../../../shared/hooks'
import { DateSelectModal } from './DateSelectModal'
import { getDownloadUrl } from './helpers'

enum ExportOptions {
  all = 'all',
  week = 'week',
  month = 'month',
  customRange = 'customRange',
}

export function ExportComponent() {
  const { t } = useTranslation()
  const { project } = useProjectAtom()
  const dateModal = useModal()

  const options = [
    {
      label: t('All'),
      value: ExportOptions.all,
    },
    {
      label: t('Past Week'),
      value: ExportOptions.week,
    },
    {
      label: t('Past Month'),
      value: ExportOptions.month,
    },
    {
      label: t('Custom Range'),
      value: ExportOptions.customRange,
    },
  ]

  const getValuesForUrl = useCallback(
    (value: string) => {
      if (value === ExportOptions.week) {
        return getDownloadUrl({
          projectId: project?.id,
          from: DateTime.now().minus({ days: 7 }).toMillis(),
          to: DateTime.now().toMillis(),
        })
      }

      if (value === ExportOptions.month) {
        return getDownloadUrl({
          projectId: project?.id,
          from: DateTime.now().minus({ days: 30 }).toMillis(),
          to: DateTime.now().toMillis(),
        })
      }

      return getDownloadUrl({
        projectId: project?.id,
      })
    },
    [project?.id],
  )

  const Option = useCallback(
    ({
      children,
      data,
      ...rest
    }: OptionProps<
      {
        label: string
        value: string
      },
      boolean,
      any
    >) => {
      if (data.value === ExportOptions.customRange) {
        return (
          <Box onClick={dateModal.onOpen}>
            <components.Option data={data} {...rest}>
              {children}
            </components.Option>
          </Box>
        )
      }

      return (
        <Link
          fontSize={'16px'}
          textDecoration={'none'}
          _hover={{ textDecoration: 'none' }}
          isExternal
          href={getValuesForUrl(data.value)}
        >
          <components.Option data={data} {...rest}>
            {children}
          </components.Option>
        </Link>
      )
    },
    [dateModal, getValuesForUrl],
  )

  return (
    <>
      <CustomSelect
        placeholder={t('Export CSV')}
        components={{
          Option: Option as any,
        }}
        dropdownIndicator={<PiDownloadSimple />}
        options={options}
        value={{ label: t('Export CSV'), value: '' }}
        size="sm"
        width={'150px'}
      />

      <DateSelectModal projectId={project?.id} {...dateModal} />
    </>
  )
}
