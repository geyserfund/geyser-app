import { useMutation } from '@apollo/client'
import { Button, Select, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UpdateCurrencyModal } from '../../../components/molecules'
import { useProjectContext } from '../../../context'
import { FieldContainer } from '../../../forms/components/FieldContainer'
import { MUTATION_UPDATE_PROJECT_CURRENCY } from '../../../graphql/mutations'
import { useModal } from '../../../hooks/useModal'
import { ProjectReward, RewardCurrency } from '../../../types'
import { useNotification } from '../../../utils'
import { ProjectUnsavedModal, useProjectUnsavedModal } from '../../projectCreate/components/ProjectUnsavedModal'
import { BackToProjectMobile } from '../navigation/BackToProjectMobile'

export type ProjectCurrencyVariables = {
  rewardCurrency: RewardCurrency | RewardCurrency.Usdcent
}

export const ProjectRewardSettings = () => {
  const { t } = useTranslation()
  const { toast } = useNotification()

  const { project, updateProject } = useProjectContext()

  const {
    isOpen: isCurrencyChangeModalOpen,
    onClose: closeCurrencyChangeModal,
    onOpen: openCurrencyChangeModal,
  } = useModal()

  const form = useForm<ProjectCurrencyVariables>({
    values: useMemo(
      () => ({
        rewardCurrency: project?.rewardCurrency as RewardCurrency,
      }),
      [project?.rewardCurrency],
    ),
  })

  const { formState, handleSubmit, setValue, watch } = form

  const unsavedModal = useProjectUnsavedModal({
    hasUnsaved: formState.isDirty,
  })

  const [updateProjectCurrencyMutation, { loading: updateLoading }] = useMutation<{
    projectRewardCurrencyUpdate: { id: number; cost: number }[]
  }>(MUTATION_UPDATE_PROJECT_CURRENCY, {
    onCompleted(data) {
      const newCurrency = watch('rewardCurrency')
      updateProject({
        rewardCurrency: newCurrency,
        rewards: data.projectRewardCurrencyUpdate as ProjectReward[],
      })
      closeCurrencyChangeModal()
      toast({
        title: 'Project updated successfully!',
        status: 'success',
      })
    },
    onError(error) {
      toast({
        title: 'failed to update project',
        description: `${error}`,
        status: 'error',
      })
    },
  })

  const onSubmit = ({ rewardCurrency }: ProjectCurrencyVariables) => {
    if (project) {
      const currentRewardCurrency = watch('rewardCurrency')

      // if no changes, just toast
      if (currentRewardCurrency == project?.rewardCurrency) {
        toast({
          title: 'failed to update project',
          description: `Your project is already set to ${
            currentRewardCurrency === RewardCurrency.Btcsat ? t('BTC (sats)') : t('USD ($)')
          } currency.`,
          status: 'error',
        })
      } else {
        openCurrencyChangeModal()
      }
    }
  }

  const handleChangeProjectCurrency = () => {
    updateProjectCurrencyMutation({
      variables: {
        input: {
          projectId: Number(project?.id),
          rewardCurrency: watch('rewardCurrency'),
        },
      },
    })
  }

  if (!project) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ flexGrow: 1, display: 'flex' }}>
      <VStack width="100%" alignItems="flex-start" spacing={6} flexGrow={1}>
        <FieldContainer title={t('Reward Type')}>
          <Text color="neutral.600">
            {t(
              'Switch between USD and Bitcoin (Sats) for reward prices. This allows you to view and manage rewards in the currency that suits your preference.',
            )}
          </Text>
          <Select
            value={watch('rewardCurrency')}
            onChange={(event) => {
              setValue('rewardCurrency', event.target.value as RewardCurrency)
            }}
          >
            <option value={RewardCurrency.Btcsat}>{t('BTC (sats)')}</option>
            <option value={RewardCurrency.Usdcent}>{t('USD ($)')}</option>
          </Select>
        </FieldContainer>

        <VStack w="100%" flexGrow={1} justifyContent="end">
          <Button isLoading={updateLoading} variant="primary" w="full" type="submit">
            {t('Save')}
          </Button>
          <BackToProjectMobile project={project} />
        </VStack>
      </VStack>
      <UpdateCurrencyModal
        isOpen={isCurrencyChangeModalOpen}
        onClose={closeCurrencyChangeModal}
        title={`${t('Are you sure you want to make the change?')}`}
        confirm={handleChangeProjectCurrency}
        description={`${t(
          'Please note that all reward prices will be automatically updated to reflect their equivalent value in SWITCH_TO_REWARD_CURRENCY, based on the current Bitcoin price in US Dollars. If you wish you can update prices individually for each reward on reward’s page.',
        ).replace(
          'SWITCH_TO_REWARD_CURRENCY',
          watch('rewardCurrency') === RewardCurrency.Usdcent ? 'USD' : 'Bitcoin',
        )}`}
        warning={`${t(
          'You are about to switch the currency denomination for all your rewards from CURRENT_REWARD_CURRENCY to SWITCH_TO_REWARD_CURRENCY. ',
        )
          .replace(
            'SWITCH_TO_REWARD_CURRENCY',
            watch('rewardCurrency') === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)',
          )
          .replace(
            'CURRENT_REWARD_CURRENCY',
            project?.rewardCurrency === RewardCurrency.Usdcent ? 'USD($)' : 'Bitcoin(sats)',
          )}`}
      />
      <ProjectUnsavedModal {...unsavedModal} />
    </form>
  )
}
