import { Box, HStack, Icon, IconButton, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PiCheck, PiPencil, PiX } from 'react-icons/pi'

import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { projectAtom } from '@/modules/project/state/projectAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UserAvatar } from '@/shared/molecules/UserAvatar.tsx'
import { FormatCurrencyType, useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import {
  AmbassadorAddInput,
  AmbassadorUpdateMutation,
  ProjectAmbassadorListQuery,
  useAmbassadorAddMutation,
  useAmbassadorUpdateMutation,
  useGeyserPromotionsContributionStatsQuery,
  useProjectAmbassadorListQuery,
} from '@/types/index.ts'
import { useMobileMode } from '@/utils/index.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

import { DashboardLayout } from '../../common/DashboardLayout.tsx'
import { TableData } from '../../common/TableWithAccordion.tsx'
import { AmbassadorPayoutsSection } from './AmbassadorPayoutSections.tsx'
import { GetFeaturedSection } from './GetFeaturedSection.tsx'
import { GeyserPromotionSection } from './GeyserPromotionSection.tsx'

// Constants
const PAYOUT_RATE_SCALE = 100
const PAYOUT_RATE_MIN = 0.01
const PAYOUT_RATE_MAX = 99

type AddAmbassadorFormData = {
  heroId: string
  payoutRate: number | string
}

type EditAmbassadorState = {
  [userId: string]: {
    payoutRate?: number | string
    isEditing?: boolean
  }
}

// Use inferred type from the GraphQL query for better type safety

// Safer definition acknowledging potential nulls in the path:
type ProjectType = NonNullable<ProjectAmbassadorListQuery['projectGet']>
type AmbassadorsConnectionType = NonNullable<ProjectType['ambassadors']>
type EdgesArrayType = NonNullable<AmbassadorsConnectionType['edges']>
// Get the type of array elements (Edge | null) and remove null
type AmbassadorEdge = NonNullable<EdgesArrayType[number]>

// Type for AmbassadorEdge
// ...

// --- GeyserPromotionSection Component Definition REMOVED ---
// interface GeyserPromotionSectionProps { ... }
// const GeyserPromotionSection = ({ ... }) => { ... }
// --- End GeyserPromotionSection Component Definition REMOVED ---

// --- GetFeaturedSection Component Definition REMOVED ---
// const GetFeaturedSection = () => { ... }
// --- End GetFeaturedSection Component Definition REMOVED ---

// --- AmbassadorPayoutsSection Component Definition REMOVED ---
// interface AmbassadorPayoutsSectionProps { ... }
// const AmbassadorPayoutsSection = ({ ... }) => { ... }
// --- End AmbassadorPayoutsSection Component Definition REMOVED ---

/** ProjectDashboardPromote: Page component for managing project promotion settings and ambassadors */
export const ProjectDashboardPromote = () => {
  const toast = useNotification()
  const project = useAtomValue(projectAtom)
  const isMobile = useMobileMode()
  const { updateProject } = useProjectAPI()

  const { formatAmount } = useCurrencyFormatter()
  const [editState, setEditState] = useState<EditAmbassadorState>({})
  const {
    register: registerAddAmbassador,
    handleSubmit: handleAddAmbassadorSubmit,
    reset: resetAddAmbassadorForm,
    formState: { errors: addAmbassadorErrors },
  } = useForm<AddAmbassadorFormData>()

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
      resetAddAmbassadorForm({ heroId: '', payoutRate: '' })
    },
    onError(error: Error) {
      toast.error({
        title: t('Error adding ambassador'),
        description: error.message,
      })
    },
  })

  const [updateAmbassador, { loading: updateAmbassadorLoading }] = useAmbassadorUpdateMutation({
    onCompleted(data: AmbassadorUpdateMutation) {
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

  // Fetch Geyser Promotion Contribution Stats using the generated hook
  const { data: promotionStatsData, loading: promotionStatsLoading } = useGeyserPromotionsContributionStatsQuery({
    variables: {
      input: {
        where: { projectId: project.id },
      },
    },
    skip: !project.id || !project.promotionsEnabled,
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    const ambassadorsResult = ambassadorsData?.projectGet?.ambassadors?.edges
    if (ambassadorsResult) {
      const initialEditState: EditAmbassadorState = {}
      ambassadorsResult.forEach((ambassadorRow) => {
        const userId = ambassadorRow?.node?.user?.id
        if (userId) {
          if (!editState[userId]?.isEditing) {
            initialEditState[userId] = {
              payoutRate: (ambassadorRow?.node?.payoutRate ?? 0) * PAYOUT_RATE_SCALE,
              isEditing: false,
            }
          } else {
            initialEditState[userId] = editState[userId]
          }
        }
      })
      setEditState(initialEditState)
    }
  }, [ambassadorsData, editState])

  const onAddAmbassador = (data: AddAmbassadorFormData) => {
    addAmbassador({
      variables: {
        input: {
          projectId: project.id,
          heroId: data.heroId,
          payoutRate: Number(data.payoutRate) / PAYOUT_RATE_SCALE,
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
        // Consider adding a toast.error here as well
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

  const handlePromotionsToggle = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const isEnabled = event.target.checked
      try {
        await updateProject.execute({
          variables: {
            input: {
              projectId: project.id,
              promotionsEnabled: isEnabled,
            },
          },
        })
        toast.success({
          title: t('Promotion settings updated.'),
        })
      } catch (error) {
        console.error('Error updating promotions status:', error)
        toast.error({
          title: t('Failed to update promotion settings.'),
          description: (error as Error)?.message || t('Please try again.'),
        })
      }
    },
    [project.id, updateProject, toast],
  )

  // Define the schema for TableWithAccordion inside the component scope
  const ambassadorTableSchema: TableData<AmbassadorEdge>[] = useMemo(
    () => [
      {
        header: t('User'),
        key: 'user',
        render(ambassadorRow: AmbassadorEdge) {
          const user = ambassadorRow.node?.user
          if (!user) return null
          return (
            <HStack spacing={2}>
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
          // Ensure right alignment for numeric data
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
            // Ensure right alignment for numeric/input data
            <HStack w="full" justify="flex-start">
              {isEditing ? (
                <InputGroup size="sm" maxW="100px">
                  {' '}
                  {/* Adjust width as needed */}
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
            // Ensure center alignment for actions
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
    <DashboardLayout desktopTitle={t('Promote')}>
      <VStack
        width="100%"
        alignItems="flex-start"
        spacing={6}
        flexGrow={1}
        position="relative"
        paddingX={{ base: 0, lg: 6 }}
      >
        <GeyserPromotionSection
          promotionsEnabled={project.promotionsEnabled}
          promotionStatsData={promotionStatsData}
          promotionStatsLoading={promotionStatsLoading}
          handlePromotionsToggle={handlePromotionsToggle}
          isUpdateProjectLoading={updateProject.loading}
          formatAmount={formatAmount}
        />

        <GetFeaturedSection />

        <AmbassadorPayoutsSection
          ambassadors={ambassadors}
          ambassadorsLoading={ambassadorsLoading}
          ambassadorTableSchema={ambassadorTableSchema}
          handleAddAmbassadorSubmit={handleAddAmbassadorSubmit}
          onAddAmbassador={onAddAmbassador}
          registerAddAmbassador={registerAddAmbassador}
          addAmbassadorErrors={addAmbassadorErrors}
          addAmbassadorLoading={addAmbassadorLoading}
        />
      </VStack>
    </DashboardLayout>
  )
}
