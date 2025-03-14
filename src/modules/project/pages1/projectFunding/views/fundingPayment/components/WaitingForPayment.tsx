import { Box, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiQuestion } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { Caption } from '../../../../../../../components/typography'
import Loader from '../../../../../../../components/ui/Loader'
import { useMobileMode } from '../../../../../../../utils'

export const WaitingForPayment = ({ title }: { title?: string }) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  return (
    <Box>
      <HStack spacing={5}>
        <Loader size="md" />
        <Body light>{t('Waiting for payment')}</Body>
        <Popover size="sm" trigger={isMobile ? 'click' : 'hover'} placement="top">
          <PopoverTrigger>
            <Box>
              <PiQuestion fontSize="20px" />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody width="auto">
              <Caption fontSize="12px">{title || t('Scan and pay invoice with bitcoin.')}</Caption>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  )
}
