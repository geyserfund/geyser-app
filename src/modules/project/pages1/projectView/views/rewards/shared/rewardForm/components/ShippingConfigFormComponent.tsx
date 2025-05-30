import { Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { Control, FieldPath, useController } from 'react-hook-form'
import { PiPlus } from 'react-icons/pi'

import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal } from '@/shared/hooks/useModal.tsx'
import {
  ProjectShippingConfigType,
  ShippingConfigFragment,
  useProjectShippingConfigCreateMutation,
  useProjectShippingConfigsGetQuery,
  useProjectShippingConfigUpdateMutation,
} from '@/types/generated/graphql.ts'
import { useMobileMode, useNotification } from '@/utils/index.ts'

import { RewardFormValues } from '../../../hooks/useProjectRewardForm.ts'
import { ShippingConfigForm } from '../../shippingConfigForm/ShippingConfigForm.tsx'
import { ShowCurrentShippingConfig } from './ShowCurrentShippingConfig.tsx'

interface ShippingRate {
  country: string // Can be 'default' or a country code
  baseRate?: number | null
  incrementRate?: number | null
  sameAsDefault?: boolean | null
}

interface ShippingFeesFormValues {
  name: string
  feesModel: ProjectShippingConfigType
  shippingAvailability: 'worldwide' | 'specificCountries'
  shippingRates: ShippingRate[]
}

type ShippingConfigFormComponentProps = {
  shippingConfigId?: number | null
  projectId: number
  control: Control<RewardFormValues>
  name: string
}

export const ShippingConfigFormComponent = ({
  projectId,
  shippingConfigId,
  control,
  name,
}: ShippingConfigFormComponentProps) => {
  const shippingFeeModal = useModal<{ isEdit: boolean }>()
  const toast = useNotification()
  const isMobile = useMobileMode()

  const { field } = useController({
    control,
    name: name as FieldPath<RewardFormValues>,
  })

  const [selectedShippingConfig, setSelectedShippingConfig] = useState<ShippingConfigFragment | null | undefined>()

  const { isEdit } = shippingFeeModal.props

  const { data: shippingConfigs, refetch: refetchShippingConfigs } = useProjectShippingConfigsGetQuery({
    variables: {
      input: {
        projectId,
      },
    },
  })

  useEffect(() => {
    if (field.value && shippingConfigs?.projectShippingConfigsGet?.length) {
      setSelectedShippingConfig(shippingConfigs?.projectShippingConfigsGet?.find((config) => config.id === field.value))
    } else {
      setSelectedShippingConfig(null)
    }
  }, [field, shippingConfigs])

  const onConfigChange = useCallback(
    (shippingConfigId: number) => {
      field.onChange(shippingConfigId, { shouldDirty: true, shouldValidate: true })
    },
    [field],
  )

  const [updateShippingConfig, { loading: updateShippingConfigLoading }] = useProjectShippingConfigUpdateMutation({
    onCompleted(data) {
      toast.success({
        title: 'Shipping fees updated',
        description: 'Shipping fees updated successfully',
      })
      setSelectedShippingConfig(data.projectShippingConfigUpdate)
      onConfigChange(data.projectShippingConfigUpdate.id)
      refetchShippingConfigs()
    },
    onError(error) {
      toast.error({
        title: 'Error updating shipping fees',
        description: error.message,
      })
    },
  })

  const [createShippingConfig, { loading: createShippingConfigLoading }] = useProjectShippingConfigCreateMutation({
    onCompleted(data) {
      toast.success({
        title: 'Shipping fees created',
        description: 'Shipping fees created successfully',
      })
      setSelectedShippingConfig(data.projectShippingConfigCreate)
      onConfigChange(data.projectShippingConfigCreate.id)
      refetchShippingConfigs()
    },
    onError(error) {
      toast.error({
        title: 'Error creating shipping fees',
        description: error.message,
      })
    },
  })

  const onSubmit = async (data: ShippingFeesFormValues) => {
    const shippingConfigInput = {
      name: data.name,
      type: data.feesModel,
      globalShipping: data.shippingAvailability === 'worldwide',
      shippingRates: data.shippingRates.map((rate) => ({
        country: rate.country,
        baseRate: rate.baseRate || 0,
        incrementRate: data.feesModel === ProjectShippingConfigType.Incremental ? rate.incrementRate || 0 : 0,
        sameAsDefault: rate.sameAsDefault || false,
      })),
    }

    if (isEdit) {
      await updateShippingConfig({
        variables: {
          input: {
            id: selectedShippingConfig?.id,
            ...shippingConfigInput,
          },
        },
      })
    } else {
      await createShippingConfig({ variables: { input: { projectId, ...shippingConfigInput } } })
    }

    shippingFeeModal.onClose()
  }

  const hasShippingConfigs =
    (shippingConfigs?.projectShippingConfigsGet && shippingConfigs.projectShippingConfigsGet.length > 0) ||
    selectedShippingConfig

  return (
    <>
      <VStack w="full" alignItems="flex-start" spacing={2}>
        <HStack w="full" justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} alignItems="flex-start" spacing={0}>
            <Body size="md" medium>
              {t('Shipping fees')}
            </Body>
            <Body size="sm" light>
              {t('Add shipping fees based on specific countries or globally.')}
            </Body>
          </VStack>
        </HStack>
        {hasShippingConfigs ? (
          <HStack w="full" justifyContent="space-between" alignItems="flex-start">
            <ControlledCustomSelect
              options={shippingConfigs?.projectShippingConfigsGet || []}
              name="shippingConfigId"
              placeholder={t('Select fee')}
              control={control}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              width="full"
              menuMinWidth={'200px'}
            />
            <Button
              variant="solid"
              colorScheme="primary1"
              size="lg"
              rightIcon={<PiPlus />}
              onClick={() => shippingFeeModal.onOpen({ isEdit: false })}
            >
              {isMobile ? t('Add') : t('Add new')}
            </Button>
          </HStack>
        ) : (
          <Button
            variant="solid"
            colorScheme="primary1"
            size="lg"
            width="full"
            rightIcon={<PiPlus />}
            onClick={() => shippingFeeModal.onOpen({ isEdit: false })}
          >
            {t('Add shipping fees')}
          </Button>
        )}

        <ShowCurrentShippingConfig
          selectedShippingConfig={selectedShippingConfig}
          shippingFeeModal={shippingFeeModal}
        />
      </VStack>

      <Modal
        {...shippingFeeModal}
        title={isEdit ? t('Edit shipping fees') : t('Add shipping fees')}
        subtitle={
          isEdit
            ? t('Updating this shipping fee configuation will update all rewards that use this shipping fee.')
            : t('Create a re-usable shipping fee configuration that can be used across multiple rewards.')
        }
        bodyProps={{ as: VStack, gap: 6, py: 6, maxHeight: '75vh', overflowY: 'auto' }}
        size="3xl"
      >
        <ShippingConfigForm
          data={shippingFeeModal.props.isEdit ? selectedShippingConfig : undefined}
          onSubmit={onSubmit}
          isSubmitting={updateShippingConfigLoading || createShippingConfigLoading}
        />
      </Modal>
    </>
  )
}
