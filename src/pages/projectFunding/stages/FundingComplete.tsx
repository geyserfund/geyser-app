import { Box, Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
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
          Your{' '}
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {formState.donationAmount} sats{' '}
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
      {fundingTx.onChain && (
        <Text mt={4} fontSize={'14px'}>
          Check out the{' '}
          <ChakraLink
            href={`https://mempool.space/address/${fundingTx.address}`}
          >
            <Box
              as="span"
              fontWeight="bold"
              borderBottom="1px solid"
              borderColor="neutral.1000"
            >
              block explorer
            </Box>
          </ChakraLink>
        </Text>
      )}
    </VStack>
  )
}
