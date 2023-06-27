import { Box, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import { FaCheck } from 'react-icons/fa'

import { UseFundingFlowReturn } from '../../../hooks'
import { ProjectFundingFormState } from './FundingForm'

interface Props {
  formState: ProjectFundingFormState | undefined
  fundingFlow: UseFundingFlowReturn
}

export const FundingComplete = ({
  fundingFlow: { fundingTx },
  formState,
}: Props) => {
  const { t } = useTranslation()
  return (
    <VStack justify={'center'} spacing={5}>
      <Box display="flex" justifyContent={'center'} my={4}>
        <Box
          height={'61px'}
          width={'61px'}
          rounded="full"
          display="flex"
          justifyContent={'center'}
          alignItems="center"
          bg="primary.400"
        >
          <FaCheck />
        </Box>
      </Box>
      {formState && (
        <Text fontSize={'14px'}>
          <Trans
            i18nKey="Your <1>{{amount}}</1>> contribution to Geyser Grants Round 2 was successful!"
            values={{ amount: `${formState.donationAmount} sats` }}
          >
            Your
            <span style={{ fontWeight: 'bold' }}>{'{{amount}}'}</span>{' '}
            contribution to Geyser Grants Round 2 was successful!
          </Trans>
        </Text>
      )}
      <Text fontSize={'14px'}>
        {t(
          'Your donation will help accelerate bitcoin adoption by recognizing and pushing forward bitcoin projects.',
        )}
      </Text>
      <Text fontSize={'14px'}>
        {t('Donations are non-refundable and not tax deductible.')}
      </Text>
      {fundingTx.onChain && (
        <Text mt={4} fontSize={'14px'}>
          {t('Check out')}{' '}
          <ChakraLink
            href={`https://mempool.space/address/${fundingTx.address}`}
          >
            <Box
              as="span"
              fontWeight="bold"
              borderBottom="1px solid"
              borderColor="neutral.1000"
            >
              {t('the block explorer')}
            </Box>
          </ChakraLink>
        </Text>
      )}
    </VStack>
  )
}
