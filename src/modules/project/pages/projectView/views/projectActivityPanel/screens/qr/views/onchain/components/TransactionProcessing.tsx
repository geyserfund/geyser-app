import { Button, Image, Link, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Body2, H3 } from '../../../../../../../../../../../components/typography'
import { TransactionProcessingUrl } from '../../../../../../../../../../../constants'
import { CardLayout, CardLayoutProps } from '../../../../../../../../../../../shared/components/layouts'

interface TransactionProcessingProps extends CardLayoutProps {
  title: string
  subTitle: string
  buttonUrl?: string
}

export const TransactionProcessing = ({ title, subTitle, buttonUrl, ...rest }: TransactionProcessingProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout w="100%" spacing="20px" alignItems="center" {...rest}>
      <Image maxHeight="150px" height="auto" width="auto" objectFit={'contain'} src={TransactionProcessingUrl} />
      <VStack spacing="10px" pb="20px">
        <H3>{title}</H3>
        <Body2 textAlign={'center'}>{subTitle}</Body2>
      </VStack>
      {
        <Button
          as={Link}
          href={buttonUrl}
          isExternal
          variant="neutral"
          border="1px solid"
          borderColor="neutral.900"
          w="full"
          isDisabled={!buttonUrl}
          textDecoration="none"
        >
          {t('View transaction on explorer')}
        </Button>
      }
    </CardLayout>
  )
}
