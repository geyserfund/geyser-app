import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import * as yup from 'yup'

import { ControlledTextInput } from '../../../../../../../components/inputs'
import { Body2 } from '../../../../../../../components/typography'
import Loader from '../../../../../../../components/ui/Loader'
import { useDebounce } from '../../../../../../../shared/hooks'
import { lightModeColors } from '../../../../../../../styles'
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

  const { control, handleSubmit, reset, setError, clearErrors, formState, watch } = useForm<AffiliateInputVariables>({
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

  const lightningAddress = watch('lightningAddress')
  const debouncedLightningAddress = useDebounce(lightningAddress, 500)

  const [evaluateLightningAddress, { loading: lightningAddressVerifyLoading }] = useLightningAddressVerifyLazyQuery({
    onCompleted(data) {
      if (!data || !data.lightningAddressVerify) return

      if (data.lightningAddressVerify.valid) {
        clearErrors('root.validation')
      } else {
        setError('root.validation', { type: 'custom', message: "Couldn't verify lightning address" })
      }
    },
  })

  useEffect(() => {
    if (debouncedLightningAddress) {
      evaluateLightningAddress({
        variables: {
          lightningAddress: debouncedLightningAddress,
        },
      })
    }
  }, [debouncedLightningAddress, clearErrors, evaluateLightningAddress])

  const [createAffilateLink, { loading: createLoading }] = useAffiliateLinkCreateMutation({
    onCompleted(data) {
      if (!data || !data.affiliateLinkCreate) return
      reset()
      addNewAffiliateLink(data.affiliateLinkCreate)
      if (onCompleted) {
        onCompleted()
      }
    },
    onError(error, clientOptions) {
      toast({
        title: 'Failed to add affiliate',
        description: error.message,
        status: 'error',
      })
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

  const renderRightElementContent = () => {
    if (lightningAddressVerifyLoading) {
      return <Loader size="md" />
    }

    if (lightningAddress) {
      if (!formState.errors.root?.validation) {
        return <BsFillCheckCircleFill fill={lightModeColors.primary[500]} size="24px" />
      }

      return <BsFillXCircleFill fill={lightModeColors.secondary.red} size="24px" />
    }
  }

  console.log('formstate errors', formState.errors.lightningAddress)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="20px">
        <ControlledTextInput label={t('Name')} name="label" placeholder="Joe Rogan" control={control} />

        <VStack w="full" spacing={1}>
          <ControlledTextInput
            label={t('Affiliate ID')}
            description={t('The affiliate ID will be shown in the url.')}
            name="affiliateId"
            placeholder="jrogan"
            control={control}
            isDisabled={isEdit}
          />
          <HStack
            w="full"
            border="1px solid"
            borderColor="neutral.300"
            backgroundColor="neutral.100"
            p={'10px'}
            borderRadius="8px"
          >
            <Body2 fontSize="12px">
              <Box as="span" fontWeight="bold">
                {t('Affiliate URL')}:
              </Box>
              {` ${window.location.origin}/project/${project?.name}?refId=`}
              <Box as="span" fontWeight="bold">
                {`${watch('affiliateId')}`}
              </Box>
            </Body2>
          </HStack>
        </VStack>

        <ControlledTextInput
          type="number"
          name="affiliateFeePercentage"
          label={`${t('Affiliate fee')}  (%)`}
          description={t(
            'This percentage will be removed from your incoming revenues. E.g. a 10% fee for a $100 contribution or reward sold will mean the affiliate will receive $10 from the incoming $100.',
          )}
          placeholder={'10'}
          control={control}
          isDisabled={isEdit}
          rightAddon="%"
        />

        <ControlledTextInput
          label={t('Lightning Address')}
          name="lightningAddress"
          description={t('All affiliate payouts will be automatically forwarded over to this lightning address.')}
          placeholder="jrogan@walletofsatoshi.com"
          control={control}
          isDisabled={isEdit}
          error={formState.errors.root?.validation?.message}
          rightAddon={renderRightElementContent()}
        />

        <ControlledTextInput
          label={t('Email')}
          name="email"
          placeholder="joe@rogan.com"
          control={control}
          isDisabled={isEdit}
        />

        <HStack w="full" py="20px">
          <Button
            w="full"
            variant="primary"
            type="submit"
            isLoading={validationLoading || createLoading}
            isDisabled={!formState.isValid}
          >
            {isEdit ? t('Save') : t('Create')}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
