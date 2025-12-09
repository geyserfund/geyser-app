import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiCheck, PiPencil, PiX } from 'react-icons/pi'
import * as yup from 'yup'

import { projectAtom } from '@/modules/project/state/projectAtom.ts'
import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAvatar } from '@/shared/molecules/UserAvatar.tsx'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import {
  AmbassadorAddInput,
  AmbassadorUpdateMutation,
  ProjectAmbassadorListQuery,
  useAmbassadorAddMutation,
  useAmbassadorUpdateMutation,
  useProjectAmbassadorListQuery,
} from '@/types/index.ts'
import { useMobileMode } from '@/utils/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { TableData, TableWithAccordion } from '../../../common/TableWithAccordion.tsx'

// Constants
const PAYOUT_RATE_SCALE = 100
const PAYOUT_RATE_MIN = 0.01
const PAYOUT_RATE_MAX = 99
const ADD_AMBASSADOR_FORM_ID = 'add-ambassador-form'

// Define Yup Schema
const addAmbassadorSchema = yup.object().shape({
  heroId: yup.string().required(t('User ID is required')),
  payoutRate: yup
    .number()
    .typeError(t('Rate must be a number'))
    .required(t('Rate is required'))
    .min(PAYOUT_RATE_MIN, t('Rate must be > {{min}} and <= {{max}}', { min: 0, max: PAYOUT_RATE_MAX }))
    .max(PAYOUT_RATE_MAX, t('Rate must be > {{min}} and <= {{max}}', { min: 0, max: PAYOUT_RATE_MAX })),
})

type AddAmbassadorFormData = yup.InferType<typeof addAmbassadorSchema>

type EditAmbassadorState = {
  [userId: string]: {
    payoutRate?: number | string
    isEditing?: boolean
  }
}

type ProjectType = NonNullable<ProjectAmbassadorListQuery['projectGet']>
type AmbassadorsConnectionType = NonNullable<ProjectType['ambassadors']>
type EdgesArrayType = NonNullable<AmbassadorsConnectionType['edges']>
type AmbassadorEdge = NonNullable<EdgesArrayType[number]>

/** AmbassadorPayoutsSection: Displays the Ambassador Payouts table and add form with full management capabilities */
export const AmbassadorPayoutsSection = () => {
  const toast = useNotification()
  const project = useAtomValue(projectAtom)
  const isMobile = useMobileMode()
  const { formatAmount } = useCurrencyFormatter()

  const [editState, setEditState] = useState<EditAmbassadorState>({})

  const {
    handleSubmit: handleAddAmbassadorSubmit,
    reset: resetAddAmbassadorForm,
    control,
  } = useForm<AddAmbassadorFormData>({
    resolver: yupResolver(addAmbassadorSchema),
    mode: 'onBlur',
    defaultValues: {
      heroId: '',
      payoutRate: undefined,
    },
  })

  const {
    data: ambassadorsData,
    loading: ambassadorsLoading,
    refetch: refetchAmbassadors,
  } = useProjectAmbassadorListQuery({
    variables: { where: { id: project.id } },
    skip: !project.id,
    fetchPolicy: 'cache-and-network',
  })

  const [addAmbassador, { loading: addAmbassadorLoading }] = useAmbassadorAddMutation({
    onCompleted() {
      toast.success({
        title: t('Ambassador added successfully.'),
      })
      refetchAmbassadors()
      resetAddAmbassadorForm({ heroId: '', payoutRate: undefined })
    },
    onError(error: Error) {
      toast.error({
        title: t('Error adding ambassador'),
        description: error.message,
      })
    },
  })

  const [updateAmbassador, { loading: updateAmbassadorLoading }] = useAmbassadorUpdateMutation({
    onCompleted(_data: AmbassadorUpdateMutation) {
      toast.success({
        title: t('Ambassador updated successfully.'),
      })
      refetchAmbassadors()
    },
    onError(error: Error) {
      toast.error({
        title: t('Error updating ambassador'),
        description: error.message,
      })
    },
  })

  useEffect(() => {
    const ambassadorsResult = ambassadorsData?.projectGet?.ambassadors?.edges
    if (ambassadorsResult) {
      setEditState((prevEditState) => {
        const newEditState: EditAmbassadorState = {}
        ambassadorsResult.forEach((ambassadorRow) => {
          const userId = ambassadorRow?.node?.user?.id
          if (userId) {
            if (!prevEditState[userId]?.isEditing) {
              newEditState[userId] = {
                payoutRate: (ambassadorRow?.node?.payoutRate ?? 0) * PAYOUT_RATE_SCALE,
                isEditing: false,
              }
            } else {
              newEditState[userId] = prevEditState[userId]
            }
          }
        })
        return newEditState
      })
    }
  }, [ambassadorsData])

  const onAddAmbassador = (data: AddAmbassadorFormData) => {
    addAmbassador({
      variables: {
        input: {
          projectId: project.id,
          heroId: data.heroId,
          payoutRate: (data.payoutRate ?? 0) / PAYOUT_RATE_SCALE,
        } as AmbassadorAddInput,
      },
    })
  }

  const handleEditClick = useCallback(
    (userId: string) => {
      const originalRateFromAPI = ambassadorsData?.projectGet?.ambassadors?.edges?.find(
        (edge) => edge?.node?.user?.id === userId,
      )?.node?.payoutRate

      if (originalRateFromAPI !== undefined) {
        setEditState((prev) => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            payoutRate: originalRateFromAPI * PAYOUT_RATE_SCALE,
            isEditing: true,
          },
        }))
      }
    },
    [ambassadorsData],
  )

  const handleCancelEdit = useCallback(
    (userId: string) => {
      const originalRateFromAPI = ambassadorsData?.projectGet?.ambassadors?.edges?.find(
        (edge) => edge?.node?.user?.id === userId,
      )?.node?.payoutRate

      if (originalRateFromAPI !== undefined) {
        setEditState((prev) => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            isEditing: false,
            payoutRate: originalRateFromAPI * PAYOUT_RATE_SCALE,
          },
        }))
      } else {
        setEditState((prev) => {
          const newState = { ...prev }
          delete newState[userId]
          return newState
        })
      }
    },
    [ambassadorsData],
  )

  const handleSaveEdit = useCallback(
    async (userId: string) => {
      const rate = editState[userId]?.payoutRate
      const numericRate = Number(rate)

      if (isNaN(numericRate) || numericRate < PAYOUT_RATE_MIN || numericRate > PAYOUT_RATE_MAX) {
        toast.error({
          title: t('Invalid Payout Rate'),
          description: t('Payout rate must be a number between {{min}} and {{max}}.', {
            min: PAYOUT_RATE_MIN,
            max: PAYOUT_RATE_MAX,
          }),
        })
        return
      }

      try {
        await updateAmbassador({
          variables: {
            input: {
              projectId: project.id,
              userId,
              payoutRate: numericRate / PAYOUT_RATE_SCALE,
            },
          },
        })

        setEditState((prev) => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            isEditing: false,
            payoutRate: numericRate,
          },
        }))
      } catch (error) {
        console.error('Error saving ambassador:', error)
        toast.error({
          title: t('Error saving ambassador'),
          description: (error as Error)?.message || t('Please try again.'),
        })
      }
    },
    [editState, toast, updateAmbassador, project.id],
  )

  const handleRateChange = useCallback((userId: string, value: string) => {
    setEditState((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        isEditing: true,
        payoutRate: value,
      },
    }))
  }, [])

  const ambassadors = useMemo(() => {
    const edges = ambassadorsData?.projectGet?.ambassadors?.edges ?? []
    return edges
      .filter((edge): edge is AmbassadorEdge => Boolean(edge))
      .slice()
      .sort((a, b) => (b.node?.contributionsCount ?? 0) - (a.node?.contributionsCount ?? 0))
  }, [ambassadorsData])

  const ambassadorTableSchema: TableData<AmbassadorEdge>[] = useMemo(
    () => [
      {
        header: t('User'),
        key: 'user',
        render(ambassadorRow: AmbassadorEdge) {
          const user = ambassadorRow.node?.user
          if (!user) return null
          return (
            <HStack as={Link} href={`/hero/${user.heroId}`} isExternal spacing={2}>
              <UserAvatar user={user} size="xs" />
              <Body size="sm">{user.username || t('Unnamed User')}</Body>
            </HStack>
          )
        },
        isMobile,
        colSpan: 2,
      },
      {
        header: t('Contributions Enabled'),
        key: 'contributions',
        render: (ambassadorRow: AmbassadorEdge) => (
          <Box w="full" textAlign="right" justifyItems="flex-start">
            <Body size="sm">
              {formatAmount(ambassadorRow.node?.contributionsCount ?? 0, FormatCurrencyType.Btcsat)}
            </Body>
          </Box>
        ),
        colSpan: 2,
      },
      {
        header: t('Payout Rate (%)'),
        key: 'payoutRate',
        render(ambassadorRow: AmbassadorEdge) {
          const userId = ambassadorRow.node?.user?.id
          if (!userId) return null
          const isEditing = editState[userId]?.isEditing ?? false
          const currentRate = isEditing
            ? editState[userId]?.payoutRate ?? ''
            : (ambassadorRow.node?.payoutRate ?? 0) * PAYOUT_RATE_SCALE

          return (
            <HStack w="full" justify="flex-start">
              {isEditing ? (
                <InputGroup size="sm" maxW="100px">
                  {' '}
                  <Input
                    type="number"
                    value={currentRate}
                    onChange={(e) => handleRateChange(userId, e.target.value)}
                    textAlign="right"
                    isDisabled={updateAmbassadorLoading}
                    step="0.01"
                  />
                  <InputRightElement>%</InputRightElement>
                </InputGroup>
              ) : (
                <Body size="sm">{currentRate}%</Body>
              )}
            </HStack>
          )
        },
        isMobile,
        colSpan: 2,
      },
      {
        header: t('Actions'),
        key: 'actions',
        render(ambassadorRow: AmbassadorEdge) {
          const userId = ambassadorRow.node?.user?.id
          if (!userId) return null
          const isEditing = editState[userId]?.isEditing ?? false

          return (
            <HStack w="full" justify="center">
              {isEditing ? (
                <HStack>
                  <IconButton
                    icon={<Icon as={PiCheck} />}
                    aria-label={t('Save')}
                    size="sm"
                    variant="ghost"
                    colorScheme="primary1"
                    onClick={() => handleSaveEdit(userId)}
                    isLoading={updateAmbassadorLoading && editState[userId]?.isEditing}
                    isDisabled={updateAmbassadorLoading}
                  />
                  <IconButton
                    icon={<Icon as={PiX} />}
                    aria-label={t('Cancel')}
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCancelEdit(userId)}
                    isDisabled={updateAmbassadorLoading}
                  />
                </HStack>
              ) : (
                <IconButton
                  icon={<Icon as={PiPencil} />}
                  aria-label={t('Edit')}
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEditClick(userId)}
                  isDisabled={updateAmbassadorLoading}
                />
              )}
            </HStack>
          )
        },
        isMobile,
        colSpan: 1,
      },
      ...(isMobile
        ? [
            {
              header: '',
              key: 'dropdown',
              colSpan: 1,
              isMobile,
            },
          ]
        : []),
    ],
    [
      editState,
      formatAmount,
      handleCancelEdit,
      handleEditClick,
      handleRateChange,
      handleSaveEdit,
      updateAmbassadorLoading,
      isMobile,
    ],
  )

  return (
    <VStack align="start">
      <Body size="xl" medium>
        {t('Ambassador Payouts')}
      </Body>
      <Body size="sm" light>
        {t(
          'Ambassadors spread the word about your project. You can reward your most loyal ambassadors by sharing a percentage of the contributions they enable with them.',
        )}
      </Body>
      <CardLayout w="full" spacing={4} align="start">
        <form
          id={ADD_AMBASSADOR_FORM_ID}
          onSubmit={handleAddAmbassadorSubmit(onAddAmbassador)}
          style={{ width: '100%' }}
        >
          <SimpleGrid gridTemplateColumns={{ base: '1fr', md: '2fr 1fr auto' }} spacing={4} alignItems="start" w="full">
            <ControlledTextInput
              name="heroId"
              control={control}
              placeholder={t('User Hero ID')}
              isDisabled={addAmbassadorLoading}
              size="sm"
              minimal={true}
            />
            <ControlledTextInput
              name="payoutRate"
              control={control}
              placeholder={t('Payout Rate')}
              type="number"
              step="0.01"
              textAlign="left"
              isDisabled={addAmbassadorLoading}
              size="sm"
              rightAddon="%"
              minimal={true}
            />
            <Box textAlign={{ base: 'right', md: 'center' }}>
              <Button type="submit" size="md" isLoading={addAmbassadorLoading} colorScheme="primary1" w="full">
                {t('Add')}
              </Button>
            </Box>
          </SimpleGrid>
        </form>

        {ambassadorsLoading && !ambassadors.length ? (
          <Spinner />
        ) : !ambassadorsLoading && ambassadors.length === 0 ? (
          <Body size="sm" p={4} w="full" textAlign="center">
            {t("Your project doesn't have ambassadors yet.")}
          </Body>
        ) : (
          <TableWithAccordion items={ambassadors} schema={ambassadorTableSchema} />
        )}
      </CardLayout>
    </VStack>
  )
}
