import { Box, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { AiFillQuestionCircle } from 'react-icons/ai'

import { Caption } from '../../../../../../../../../components/typography'
import Loader from '../../../../../../../../../components/ui/Loader'
import { useMobileMode } from '../../../../../../../../../utils'

export const WaitingForPayment = () => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  return (
    <Box fontSize={'10px'}>
      <HStack spacing={5}>
        <Loader size="md" />
        <Text color={'neutral.900'} fontWeight={400}>
          {t('Waiting for payment')}
        </Text>
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
