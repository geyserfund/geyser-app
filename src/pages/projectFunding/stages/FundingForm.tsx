import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

import { DonationInput } from '../../../components/molecules'
import { MAX_FUNDING_AMOUNT_USD } from '../../../constants'
import { useFormState, UseFundingFlowReturn } from '../../../hooks'
import { FormStateError } from '../../../interfaces'
import {
  FundingInput,
  FundingResourceType,
  Project,
  User,
} from '../../../types'
import { useNotification } from '../../../utils'

export type ProjectFundingFormState = {
  donationAmount: number
  comment: string
}

const defaultFormState = {
  donationAmount: 0,
  comment: '',
}

interface Props {
  project: Project
  user?: User
  fundingFlow: UseFundingFlowReturn
  onFundingRequested?(state: ProjectFundingFormState): void
}

export const FundingForm = ({
  project,
  user,
  fundingFlow,
  onFundingRequested = () => {},
}: Props) => {
  const { requestFunding, fundState } = fundingFlow

  const { toast } = useNotification()
  const { state, setTarget, setValue } =
    useFormState<ProjectFundingFormState>(defaultFormState)

  const [formError, setFormError] =
    useState<FormStateError<ProjectFundingFormState> | void>()

  const validateForm = () => {
    if (!state.donationAmount || state.donationAmount === 0) {
      setFormError({ donationAmount: 'amount is required' })
      return false
    }

    if (state.donationAmount > MAX_FUNDING_AMOUNT_USD) {
      setFormError({
        donationAmount: `amount cannot be greater than $${MAX_FUNDING_AMOUNT_USD} in value`,
      })
      return false
    }

    return true
  }

  const onSubmit = () => {
    setFormError({})

    const isValid = validateForm()

    if (!project || !project.id) {
      toast({
        status: 'error',
        title: 'Something went wrong.',
        description: 'Please refresh the page and try again.',
      })
      return
    }

    if (isValid) {
      const input: FundingInput = {
        projectId: Number(project.id),
        anonymous: Boolean(user),
        donationInput: {
          donationAmount: state.donationAmount,
        },
        metadataInput: {
          ...(state.comment && { comment: state.comment }),
        },
        sourceResourceInput: {
          resourceId: Number(project.id),
          resourceType: FundingResourceType.Project,
        },
      }

      requestFunding(input)
      onFundingRequested(state)
    }
  }

  return (
    <Box>
      <Text fontWeight={'500'} mb={2} fontSize="16px">
        {fundState}
        <br />
        Vote for this project by funding towards it below! 1 Sat = 1 Vote. To
        receive a project reward contribute from the project page.
      </Text>
      <Box mb={3}>
        <DonationInput
          inputGroup={{ padding: '2px' }}
          name="donationAmount"
          onChange={setValue}
        />
        {formError?.donationAmount && (
          <Text color="brand.error" fontSize="12px">
            {formError?.donationAmount}
          </Text>
        )}
      </Box>
      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          Leave us a comment (optional)
        </FormLabel>
        <Input
          _focus={{ borderColor: 'brand.primary' }}
          placeholder="Love what you guys are doing. Let the Sats flow!"
          name="comment"
          value={state.comment}
          onChange={setTarget}
        />
      </FormControl>
      <Box mt={4}>
        <Button bg="brand.primary" onClick={onSubmit} w="full">
          Confirm
        </Button>
      </Box>
    </Box>
  )
}
