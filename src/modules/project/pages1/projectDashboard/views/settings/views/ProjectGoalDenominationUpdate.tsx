import { Select } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { UpdateCurrencyModal } from '@/modules/project/pages1/projectView/views/rewards/components'
import { FieldContainer } from '@/shared/components/form'
import { useModal } from '@/shared/hooks'
import { RewardCurrency } from '@/types'
import { useNotification } from '@/utils'

export type ProjectCurrencyVariables = {
  rewardCurrency: RewardCurrency | RewardCurrency.Usdcent
}

export const ProjectRewardDenominationUpdate = () => {
  const { t } = useTranslation()
  const toast = useNotification()

  const { project } = useProjectAtom()

  const { updateProject } = useProjectAPI()

  const {
    isOpen: isCurrencyChangeModalOpen,
    onClose: closeCurrencyChangeModal,
    onOpen: openCurrencyChangeModal,
  } = useModal()

  const handleClose = () => {
    closeCurrencyChangeModal()
    form.reset({
      rewardCurrency: project?.rewardCurrency as RewardCurrency,
    })
  }

  const form = useForm<ProjectCurrencyVariables>({
    values: useMemo(
      () => ({
        rewardCurrency: project?.rewardCurrency as RewardCurrency,
      }),
      [project?.rewardCurrency],
    ),
  })

  const { setValue, watch } = form

  const handleChangeProjectCurrency = () => {
    updateProject.execute({
      variables: {
        input: {
          projectId: Number(project?.id),
          rewardCurrency: watch('rewardCurrency'),
        },
      },
      onCompleted() {
        handleClose()
        toast.success({
          title: 'Project updated successfully!',
        })
      },
      onError(error) {
        handleClose()
        toast.error({
          title: 'failed to update project',
          description: `${error}`,
        })
      },
    })
  }

  if (!project) {
    return null
  }

  return (
    <form>
      <FieldContainer
        title={t('Reward currency denominnation')}
        subtitle={t(
          'Switch between USD and Bitcoin (Sats) for reward prices. This allows you to view and manage rewards in the currency that suits your preference.',
        )}
      >
        <Select
          value={project.rewardCurrency || undefined}
          onChange={(event) => {
            setValue('rewardCurrency', event.target.value as RewardCurrency)
            openCurrencyChangeModal()
          }}
        >
          <option value={RewardCurrency.Btcsat}>{t('BTC (sats)')}</option>
          <option value={RewardCurrency.Usdcent}>{t('USD ($)')}</option>
        </Select>
      </FieldContainer>

      <UpdateCurrencyModal
        isOpen={isCurrencyChangeModalOpen}
        onClose={handleClose}
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
    </form>
  )
}
