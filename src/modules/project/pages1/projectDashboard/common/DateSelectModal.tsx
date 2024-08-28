import 'react-datepicker/dist/react-datepicker.css'

import { Button, HStack, Link, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'

import { Modal } from '../../../../../shared/components/layouts'
import { getDownloadUrl } from './helpers'

interface DateSelectModalProps {
  projectId: number
  isOpen: boolean
  onClose: () => void
}

export const DateSelectModal = ({ projectId, ...rest }: DateSelectModalProps) => {
  const { t } = useTranslation()

  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  const handleFromDate = (event: Date) => {
    const date = DateTime.fromJSDate(event).toMillis()
    setFrom(date)
  }

  const handleToDate = (event: Date) => {
    const date = DateTime.fromJSDate(event).toMillis()
    setTo(date)
  }

  const maxDate = DateTime.now().toJSDate()

  return (
    <Modal title="Select Date Range" {...rest}>
      <VStack w="full" spacing="30px">
        <HStack w="full">
          <VStack flex="1" alignItems={'flex-start'} spacing="10px">
            <Body>{t('From')}</Body>
            <DatePicker
              onChange={handleFromDate}
              maxDate={maxDate}
              minDate={to ? DateTime.fromMillis(to).toJSDate() : undefined}
              enableTabLoop={false}
              customInput={
                <Button w="full" variant="outline" colorScheme="neutral1" size="sm">
                  {from ? DateTime.fromMillis(from).toFormat('yyyy/MM/dd') : ' '}
                </Button>
              }
            />
          </VStack>
          <VStack flex="1" alignItems={'flex-start'} spacing="10px">
            <Body>{t('To')}</Body>
            <DatePicker
              onChange={handleToDate}
              maxDate={maxDate}
              minDate={from ? DateTime.fromMillis(from).toJSDate() : undefined}
              enableTabLoop={false}
              customInput={
                <Button w="full" variant="outline" colorScheme="neutral1" size="sm">
                  {to ? DateTime.fromMillis(to).toFormat('yyyy/MM/dd') : ' '}
                </Button>
              }
            />
          </VStack>
        </HStack>
        <VStack w="full" spacing="10px">
          <Button w="full" variant="soft" colorScheme="neutral1" onClick={rest.onClose}>
            {t('Cancel')}
          </Button>
          <Button
            as={Link}
            w="full"
            variant="solid"
            colorScheme="primary1"
            href={getDownloadUrl({ projectId, from, to })}
            textDecoration={'none'}
            isExternal
            isDisabled={!from || !to}
            onClick={rest.onClose}
          >
            {t('Download')}
          </Button>
        </VStack>
      </VStack>
    </Modal>
  )
}
