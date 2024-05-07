import { Box, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AiFillQuestionCircle } from 'react-icons/ai'

import { Body1, Caption } from '../../../../../../../../../components/typography'
import Loader from '../../../../../../../../../components/ui/Loader'
import { useMobileMode } from '../../../../../../../../../utils'

export const WaitingForPayment = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  return (
    <Box fontSize={'10px'}>
      <HStack spacing={5}>
        <Loader size="md" />
        <Body1 color={'neutral.900'}>{t('Waiting for payment')}</Body1>
        <Popover size="sm" trigger={isMobile ? 'click' : 'hover'} placement="top">
          <PopoverTrigger>
            <Box>
              <AiFillQuestionCircle fontSize="20px" />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody width="auto">
              <Caption fontSize="12px">{t('Scan and pay invoice with bitcoin.')}</Caption>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  )
}
