import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useProjectSubscriptionsAPI } from '@/modules/project/API/useProjectSubscriptionsAPI.ts'
import {
  useProjectAtom,
  useRecurringContributionSupportAtom,
  useSubscriptionsAtom,
} from '@/modules/project/hooks/useProjectAtom'
import { ProjectSubscriptionPlan, recurringIntervals } from '@/modules/project/recurring/graphql.ts'
import { ControlledCustomSelect } from '@/shared/components/controlledInput/ControlledCustomSelect.tsx'
import { ControlledSwitchInput } from '@/shared/components/controlledInput/ControlledSwitchInput.tsx'
import { ControlledTextArea } from '@/shared/components/controlledInput/ControlledTextArea.tsx'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography'
import { useModal } from '@/shared/hooks'
import { AlertDialogue } from '@/shared/molecules/AlertDialogue'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'
import {
  RecurringInterval,
  useProjectSubscriptionPlanCreateMutation,
  useProjectSubscriptionPlanDeleteMutation,
  useProjectSubscriptionPlanUpdateMutation,
} from '@/types/index.ts'
import { centsToDollars, commaFormatted, toInt, useNotification } from '@/utils'

import { DashboardLayout } from '../common/DashboardLayout.tsx'

type PlanFormState = {
  name: string
  description: string
  interval: RecurringInterval
  amountUsd: string
  amountBtcSat: string
  isHidden: boolean
}

const defaultPlanFormState: PlanFormState = {
  name: '',
  description: '',
  interval: RecurringInterval.Monthly,
  amountUsd: '10',
  amountBtcSat: '40000',
  isHidden: false,
}

export const ProjectDashboardMemberships = () => {
  const toast = useNotification()
  const { project } = useProjectAtom()
  const { subscriptions } = useSubscriptionsAtom()
  const { recurringContributionSupport } = useRecurringContributionSupportAtom()
  const { queryProjectSubscriptions } = useProjectSubscriptionsAPI(true)
  const deleteModal = useModal()
  const membershipIntervalOptions = useMemo(
    () => [
      { label: t('Monthly'), value: RecurringInterval.Monthly },
      { label: t('Yearly'), value: RecurringInterval.Yearly },
    ],
    [],
  )
  const membershipPlanSchema = useMemo(
    () =>
      yup.object({
        name: yup.string().trim().required(t('Name is required')),
        description: yup.string().default(''),
        interval: yup
          .mixed<RecurringInterval>()
          .oneOf(Object.values(RecurringInterval), t('Interval is required'))
          .required(t('Interval is required')),
        amountUsd: yup
          .string()
          .required(t('USD amount is required'))
          .test('positive-usd', t('USD amount must be greater than 0'), (value) => Number(value) > 0),
        amountBtcSat: yup
          .string()
          .required(t('Bitcoin amount is required'))
          .matches(/^\d+$/, t('Bitcoin amount must be a whole number'))
          .test('positive-sats', t('Bitcoin amount must be greater than 0'), (value) => Number(value) > 0),
        isHidden: yup.boolean().default(false),
      }),
    [],
  )

  const [selectedPlan, setSelectedPlan] = useState<ProjectSubscriptionPlan | null>(null)
  const [planToDelete, setPlanToDelete] = useState<ProjectSubscriptionPlan | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<PlanFormState>({
    resolver: yupResolver(membershipPlanSchema),
    mode: 'onBlur',
    defaultValues: defaultPlanFormState,
  })

  const [createPlan, createPlanState] = useProjectSubscriptionPlanCreateMutation()
  const [updatePlan, updatePlanState] = useProjectSubscriptionPlanUpdateMutation()
  const [deletePlan, deletePlanState] = useProjectSubscriptionPlanDeleteMutation()

  const { loading } = queryProjectSubscriptions

  const supportMessage = useMemo(() => {
    if (project.fundingStrategy !== 'TAKE_IT_ALL') {
      return t('Recurring memberships are available only for Take-it-all projects.')
    }

    if (recurringContributionSupport?.reason) {
      return recurringContributionSupport.reason
    }

    if (!recurringContributionSupport?.stripe) {
      return t('Bitcoin memberships can work now. Connect Stripe to enable automated fiat renewals.')
    }

    return t('Members can pay with either Bitcoin or card. Card renewals are automatic once Stripe is ready.')
  }, [project.fundingStrategy, recurringContributionSupport])

  const openCreateModal = () => {
    setSelectedPlan(null)
    form.reset(defaultPlanFormState)
    setIsOpen(true)
  }

  const openEditModal = (plan: ProjectSubscriptionPlan) => {
    setSelectedPlan(plan)
    form.reset({
      name: plan.name,
      description: plan.description || '',
      interval: plan.interval === recurringIntervals.yearly ? RecurringInterval.Yearly : RecurringInterval.Monthly,
      amountUsd: `${plan.amountUsdCent / 100}`,
      amountBtcSat: `${plan.amountBtcSat}`,
      isHidden: Boolean(plan.isHidden),
    })
    setIsOpen(true)
  }

  const closeFormModal = () => {
    setIsOpen(false)
    setSelectedPlan(null)
    form.reset(defaultPlanFormState)
  }

  const refetchPlans = () => {
    queryProjectSubscriptions.execute()
  }

  const handleSubmit = form.handleSubmit(async (values) => {
    const input = {
      name: values.name.trim(),
      description: values.description.trim() || undefined,
      interval: values.interval,
      amountUsdCent: Math.round(Number(values.amountUsd) * 100),
      amountBtcSat: Math.round(Number(values.amountBtcSat)),
      isHidden: values.isHidden,
    }

    try {
      if (selectedPlan) {
        await updatePlan({
          variables: {
            input: {
              id: toInt(selectedPlan.id),
              ...input,
            },
          },
        })
        toast.success({ title: t('Membership plan updated') })
      } else {
        await createPlan({
          variables: {
            input: {
              projectId: toInt(project.id),
              ...input,
            },
          },
        })
        toast.success({ title: t('Membership plan created') })
      }

      closeFormModal()
      refetchPlans()
    } catch (error) {
      toast.error({
        title: t('Unable to save membership plan'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  })

  const handleDelete = async () => {
    if (!planToDelete) return

    try {
      await deletePlan({ variables: { id: toInt(planToDelete.id) } })
      toast.success({ title: t('Membership plan deleted') })
      deleteModal.onClose()
      setPlanToDelete(null)
      refetchPlans()
    } catch (error) {
      toast.error({
        title: t('Unable to delete membership plan'),
        description: error instanceof Error ? error.message : t('Please try again.'),
      })
    }
  }

  return (
    <DashboardLayout desktopTitle={t('Memberships')} width="full" overflow="hidden">
      <VStack width="100%" alignItems="flex-start" px={standardPadding} spacing={6}>
        <CardLayout w="full" alignItems="start" spacing={3}>
          <Body size="lg" bold>
            {t('Recurring membership setup')}
          </Body>
          <Body size="sm" light>
            {supportMessage}
          </Body>
          <HStack spacing={3}>
            <Button
              colorScheme="primary1"
              onClick={openCreateModal}
              isDisabled={project.fundingStrategy !== 'TAKE_IT_ALL'}
            >
              {t('New membership plan')}
            </Button>
            <Button variant="outline" colorScheme="neutral1" onClick={refetchPlans} isLoading={loading}>
              {t('Refresh')}
            </Button>
          </HStack>
        </CardLayout>

        <VStack w="full" alignItems="start" spacing={4}>
          {subscriptions.length === 0 ? (
            <CardLayout w="full" alignItems="start">
              <Body size="md" light>
                {t('No membership plans yet. Add a plan with both USD and Bitcoin pricing to get started.')}
              </Body>
            </CardLayout>
          ) : (
            subscriptions.map((plan) => (
              <CardLayout key={plan.id} w="full" alignItems="start" spacing={4}>
                <HStack w="full" justifyContent="space-between" alignItems="start">
                  <VStack alignItems="start" spacing={1}>
                    <Body size="lg" bold>
                      {plan.name}
                    </Body>
                    {plan.description && (
                      <Body size="sm" light>
                        {plan.description}
                      </Body>
                    )}
                  </VStack>
                  <Body size="sm" light color={plan.isHidden ? 'orange.9' : 'primary1.9'}>
                    {plan.isHidden ? t('Hidden') : t('Live')}
                  </Body>
                </HStack>
                <HStack spacing={6} flexWrap="wrap">
                  <Body size="sm">{`${centsToDollars(plan.amountUsdCent)} USD`}</Body>
                  <Body size="sm">{`${commaFormatted(plan.amountBtcSat)} sats`}</Body>
                  <Body size="sm">{plan.interval === recurringIntervals.yearly ? t('Yearly') : t('Monthly')}</Body>
                </HStack>
                <HStack spacing={3}>
                  <Button size="sm" colorScheme="primary1" onClick={() => openEditModal(plan)}>
                    {t('Edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="neutral1"
                    onClick={() => {
                      setPlanToDelete(plan)
                      deleteModal.onOpen()
                    }}
                  >
                    {t('Delete')}
                  </Button>
                </HStack>
              </CardLayout>
            ))
          )}
        </VStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={closeFormModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPlan ? t('Edit membership plan') : t('Create membership plan')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <ControlledTextInput name="name" control={form.control} label={t('Name')} />
              <ControlledTextArea name="description" control={form.control} label={t('Description')} />
              <HStack w="full" spacing={4}>
                <ControlledTextInput
                  name="amountUsd"
                  control={form.control}
                  label={t('USD amount')}
                  inputMode="decimal"
                />
                <ControlledTextInput
                  name="amountBtcSat"
                  control={form.control}
                  label={t('Bitcoin amount (sats)')}
                  numberOnly
                />
              </HStack>
              <HStack w="full" spacing={4}>
                <ControlledCustomSelect<PlanFormState, (typeof membershipIntervalOptions)[number], false>
                  name="interval"
                  control={form.control}
                  label={t('Interval')}
                  options={membershipIntervalOptions}
                />
                <ControlledSwitchInput
                  name="isHidden"
                  control={form.control}
                  label={t('Hidden')}
                  isChecked={form.watch('isHidden')}
                  containerProps={{ pt: 8 }}
                />
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="soft" colorScheme="neutral1" onClick={closeFormModal}>
              {t('Cancel')}
            </Button>
            <Button
              colorScheme="primary1"
              onClick={handleSubmit}
              isLoading={
                form.formState.isSubmitting ||
                createPlanState.loading ||
                updatePlanState.loading ||
                deletePlanState.loading
              }
            >
              {selectedPlan ? t('Save changes') : t('Create plan')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialogue
        title={t('Delete membership plan')}
        description={t('Are you sure you want to delete this membership plan?')}
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.onClose()
          setPlanToDelete(null)
        }}
        negativeButtonProps={{
          onClick() {
            handleDelete()
          },
          isLoading: deletePlanState.loading,
          children: t('Delete'),
        }}
        hasCancel
      />
    </DashboardLayout>
  )
}
