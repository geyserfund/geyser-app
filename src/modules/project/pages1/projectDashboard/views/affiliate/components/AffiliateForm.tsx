import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'
import * as yup from 'yup'

import { useProjectAffiliateAPI } from '@/modules/project/API/useProjectAffiliateAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { ControlledTextInput } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'

import Loader from '../../../../../../../components/ui/Loader'
import { useDebounce } from '../../../../../../../shared/hooks'
import { lightModeColors } from '../../../../../../../styles'
import { ProjectAffiliateLinkFragment, useLightningAddressVerifyLazyQuery } from '../../../../../../../types'
import { useNotification } from '../../../../../../../utils'
import { addUpdateAffiliateLinkAtom } from '../../../../../state/affiliateAtom'

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
  affiliateId: yup
    .string()
    .required('Affiliate ID is required')
    .matches(/^\S+$/, 'Affiliate ID must not contain spaces'),
  affiliateFeePercentage: yup
    .number()
    .required('Percentage is required')
    .min(1, 'Percentage must be at least 1')
    .max(50, 'Percentage can be at most 50'),
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
  const { project } = useProjectAtom()

  const addNewAffiliateLink = useSetAtom(addUpdateAffiliateLinkAtom)

  const { createAffilateLink, updateAffiliateLink } = useProjectAffiliateAPI()

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

  const onSubmit = async (values: AffiliateInputVariables) => {
    if (isEdit) {
      if (formState.isDirty) {
        updateAffiliateLink.execute({
          variables: {
            affiliateLinkId: affiliate?.id,
            label: values.label,
          },
          onCompleted(data) {
            reset()
            if (onCompleted) {
              onCompleted()
            }
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

    createAffilateLink.execute({
      variables: {
        input: {
          ...values,
          affiliateFeePercentage: Number(values.affiliateFeePercentage),
          projectId: project?.id,
        },
      },
      onCompleted(data) {
        reset()
        addNewAffiliateLink(data.affiliateLinkCreate)
        if (onCompleted) {
          onCompleted()
        }
      },
      onError(error) {
        toast({
          title: 'Failed to add affiliate',
          description: error.message,
          status: 'error',
        })
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
            <Body size="xs">
              <Box as="span" fontWeight="bold">
                {t('Affiliate URL')}:
              </Box>
              {` ${window.location.origin}/project/${project?.name}?refId=`}
              <Box as="span" fontWeight="bold">
                {`${watch('affiliateId')}`}
              </Box>
            </Body>
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
            variant="solid"
            colorScheme="primary1"
            type="submit"
            isLoading={updateAffiliateLink.loading || createAffilateLink.loading}
            isDisabled={!formState.isValid}
          >
            {isEdit ? t('Save') : t('Create')}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
