import { Box, Button, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { PiArrowUpRight } from 'react-icons/pi'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts'
import { Body, H3 } from '@/shared/components/typography'
import { TransactionProcessingUrl } from '@/shared/constants'

export const BLOCK_EXPLORER_BASE_URL = 'https://mempool.space/tx/'

interface TransactionProcessingProps extends CardLayoutProps {
  title: string
  subTitle: string
  transactionId?: string
}

export const TransactionProcessing = ({ title, subTitle, transactionId, ...rest }: TransactionProcessingProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout w="100%" spacing={6} dense noborder alignItems="center" {...rest}>
      <Box padding={5}>
        <Image maxHeight="150px" height="auto" width="auto" objectFit={'contain'} src={TransactionProcessingUrl} />
      </Box>
      <VStack spacing="10px" pb="20px">
        <H3>{title}</H3>
        <Body size="sm" textAlign={'center'}>
          {subTitle}
        </Body>
      </VStack>
      {
        <Button
          size="lg"
          {...(transactionId && { as: Link, href: `${BLOCK_EXPLORER_BASE_URL}${transactionId}` })}
          isExternal
          variant="outline"
          colorScheme="neutral1"
          width="310px"
          isDisabled={!transactionId}
          rightIcon={<PiArrowUpRight />}
        >
          {t('View transaction on explorer')}
        </Button>
      }
    </CardLayout>
  )
}
