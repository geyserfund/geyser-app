import { Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

import { ControlledTextInput } from '../../../../../../../components/inputs'
import {
  ProjectAffiliateLinkFragment,
  useAffiliateLinkCreateMutation,
  useAffiliateLinkLabelUpdateMutation,
  useLightningAddressVerifyLazyQuery,
} from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { useProjectContext } from '../../../../../context'
import { addAffiliateLinkAtom } from '../affiliateAtom'

export type AffiliateInputVariables = {
  label: string
  email: string
  affiliateId: string
  affiliateFeePercentage: number
  lightningAddress: string
}

const schema = yup.object({
  label: yup.string().required('Name is required').max(50, 'Name must be at most 50 characters long'),
  email: yup.string().required('Email is required').email('Must be a valid email'),
  affiliateId: yup.string().required('Refferal ID is required'),
  affiliateFeePercentage: yup
    .number()
    .required('Percentage is required')
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage must be at most 100'),
  lightningAddress: yup
    .string()
    .required('Lightning address is required')
    .email('Please use a valid email-formatted address for your Lightning Address.'),
})

type AffiliateFormProps = {
  isEdit?: boolean
  affiliate?: ProjectAffiliateLinkFragment
  onCompleted?: () => void
}

export const AffiliateForm = ({ isEdit, affiliate, onCompleted }: AffiliateFormProps) => {
  const { t } = useTranslation()

  const { toast } = useNotification()
  const { project } = useProjectContext()

  const addNewAffiliateLink = useSetAtom(addAffiliateLinkAtom)

  const { control, handleSubmit, reset, setError, formState } = useForm<AffiliateInputVariables>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      if (isEdit && affiliate) {
        return {
          label: affiliate.label || '',
          email: affiliate.email || '',
          affiliateId: affiliate.affiliateId || '',
          affiliateFeePercentage: affiliate.affiliateFeePercentage || 0,
          lightningAddress: affiliate.lightningAddress || '',
        }
      }

      return {
        label: '',
        email: '',
        affiliateId: '',
        affiliateFeePercentage: 0,
        lightningAddress: '',
      }
    }, [isEdit, affiliate]),

    mode: 'onBlur',
  })

  const [evaluateLightningAddress] = useLightningAddressVerifyLazyQuery({
    onCompleted(data) {
      if (!data || !data.lightningAddressVerify) return
      if (!data.lightningAddressVerify.valid) {
        setError('lightningAddress', { type: 'custom', message: "Couldn't verify lightning address" })
      }
    },
  })

  const [createAffilateLink, { loading: createLoading }] = useAffiliateLinkCreateMutation({
    onCompleted(data) {
      if (!data || !data.affiliateLinkCreate) return
      reset()
      addNewAffiliateLink(data.affiliateLinkCreate)
      if (onCompleted) {
        onCompleted()
      }
    },
  })

  const [updateAffiliateLink, { loading: validationLoading }] = useAffiliateLinkLabelUpdateMutation({
    onCompleted(data) {
      if (!data || !data.affiliateLinkLabelUpdate) return
      reset()
      addNewAffiliateLink(data.affiliateLinkLabelUpdate)
      if (onCompleted) {
        onCompleted()
      }
    },
  })

  const onSubmit = async (values: AffiliateInputVariables) => {
    try {
      if (isEdit) {
        if (formState.isDirty) {
          updateAffiliateLink({
            variables: {
              affiliateLinkId: affiliate?.id,
              label: values.label,
            },
          })
        } else {
          toast({
            title: 'No any updates to save',
            status: 'info',
          })
        }

        return
      }

      const { data } = await evaluateLightningAddress({
        variables: {
          lightningAddress: values.lightningAddress,
        },
      })

      if (data?.lightningAddressVerify.valid) {
        createAffilateLink({
          variables: {
            input: {
              ...values,
              affiliateFeePercentage: Number(values.affiliateFeePercentage),
              projectId: project?.id,
            },
          },
        })
      }
    } catch (error) {
      errorToast()
    }
  }

  const errorToast = (reason?: string | null) => {
    toast({
      title: 'Failed to validate lightning address',
      description: reason || 'Please provide a valid Lightning Address',
      status: 'error',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="20px">
        <ControlledTextInput label={t('Title')} name="label" placeholder="Joe Rogan" control={control} />

        <ControlledTextInput
          label={t('Email')}
          name="email"
          placeholder="joe@rogan.com"
          control={control}
          isDisabled={isEdit}
        />

        <ControlledTextInput
          label={t('Refferal Code')}
          name="affiliateId"
          placeholder="jrogan"
          control={control}
          isDisabled={isEdit}
        />

        <ControlledTextInput
          type="number"
          name="affiliateFeePercentage"
          label={t('Percentage')}
          placeholder={'10'}
          control={control}
          isDisabled={isEdit}
          rightAddon="%"
        />

        <ControlledTextInput
          label={t('Lightning Address')}
          name="lightningAddress"
          placeholder="jrogan@walletofsatoshi.com"
          control={control}
          isDisabled={isEdit}
        />

        <HStack w="full" py="20px">
          <Button w="full" variant="primary" type="submit" isLoading={validationLoading || createLoading}>
            {isEdit ? t('Save') : t('Create')}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
