import { Box, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import { useBTCConverter } from '../../../helpers'
import { UseFundingFlowReturn } from '../../../hooks'
import { USDCents } from '../../../types'
import { ProjectFundingFormState } from './FundingForm'

interface Props {
  formState: ProjectFundingFormState | undefined
  fundingFlow: UseFundingFlowReturn
}

export const FundingComplete = ({
  fundingFlow: { fundingTx },
  formState,
}: Props) => {
  const { getSatoshisFromUSDCents } = useBTCConverter()

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
          bg="brand.primary"
        >
          <FaCheck />
        </Box>
      </Box>
      {formState && (
        <Text fontSize={'14px'}>
          Your{' '}
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {getSatoshisFromUSDCents(
              (formState.amount * 100) as USDCents,
            )} sats{' '}
          </span>{' '}
          contribution to Geyser Grants Round 2 was successful!
        </Text>
      )}
      <Text fontSize={'14px'}>
        Your donation will help accelerate bitcoin adoption by recognizing and
        pushing forward bitcoin projects.
      </Text>
      <Text fontSize={'14px'}>
        Donations are non-refundable and not tax deductible.
      </Text>
      {!fundingTx.onChain && (
        <Text mt={4} fontSize={'14px'}>
          Check out the{' '}
          <ChakraLink
            href={`https://mempool.space/address/${fundingTx.address}`}
          >
            <span
              style={{
                fontWeight: 'bold',
                borderBottom: '1px solid black',
              }}
            >
              block explorer
            </span>
          </ChakraLink>
        </Text>
      )}
    </VStack>
  )
}
