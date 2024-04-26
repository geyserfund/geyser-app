import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { DonationInput } from '../../../../../components/molecules'
import { MAX_FUNDING_AMOUNT_USD } from '../../../../../constants'
import { FormStateError } from '../../../../../interfaces'
import { FundingInput, FundingResourceType, Project, UserMeFragment } from '../../../../../types'
import { useNotification } from '../../../../../utils'
import { useFundingContext } from '../../../context/FundingProvider'
import { DonationInputError } from '../../projectView/views/projectActivityPanel/screens/fundingForm/components/DonationInputError'

export type ProjectFundingFormState = {
  donationAmount: number
  comment: string
}

interface Props {
  project: Project
  user?: UserMeFragment
  onFundingRequested?(state: ProjectFundingFormState): void
}

export const FundingForm = ({ project, user, onFundingRequested = () => {} }: Props) => {
  const { t } = useTranslation()
  // const { btcRate } = useBtcContext()
  const {
    requestFunding,
    fundForm: { state, setState, amountError },
  } = useFundingContext()

  const { toast } = useNotification()

  const [formError, setFormError] = useState<FormStateError<ProjectFundingFormState> | void>()

  const validateForm = () => {
    if (!state.donationAmount || state.donationAmount === 0) {
      setFormError({ donationAmount: 'amount is required' })
      return false
    }

    // const amountInDollars = state.donationAmount * btcRate

    // const isException = isProjectAnException(project.name)

    // if (!isException && amountInDollars > MAX_FUNDING_AMOUNT_USD) {
    //   setFormError({
    //     donationAmount: `amount cannot be greater than \${{MAX_FUNDING_AMOUNT_USD}} in value`,
    //   })
    //   return false
    // }

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
        anonymous: !user,
        donationAmount: state.donationAmount,
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
        {t(
          'Vote for this project by funding towards it below! 1 Sat = 1 Vote. To receive a project reward contribute from the project page.',
        )}
      </Text>
      <Box mb={3}>
        <DonationInput inputGroup={{ padding: '2px' }} name="donationAmount" onChange={setState} />
        <DonationInputError />
        {formError?.donationAmount && (
          <Text color="secondary.red" fontSize="12px">
            <Trans i18nKey={formError?.donationAmount} values={{ MAX_FUNDING_AMOUNT_USD }}>
              {formError?.donationAmount}
            </Trans>
          </Text>
        )}
      </Box>
      <FormControl mb={3}>
        <FormLabel fontWeight={'700'} fontSize="14px">
          {t('Leave us a comment (optional)')}
        </FormLabel>
        <Input
          _focus={{ borderColor: 'primary.400' }}
          placeholder={t('Love what you guys are doing. Let the Sats flow!')}
          name="comment"
          value={state.comment}
          onChange={(event) => setState('comment', event.target.value)}
        />
      </FormControl>
      <Box mt={4}>
        <Button variant={'primary'} onClick={onSubmit} w="full" isDisabled={Boolean(amountError)}>
          {t('Confirm')}
        </Button>
      </Box>
    </Box>
  )
}
