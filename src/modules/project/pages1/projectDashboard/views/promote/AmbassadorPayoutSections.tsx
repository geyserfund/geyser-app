import { Box, Button, SimpleGrid, Spinner } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { Control, SubmitHandler } from 'react-hook-form'

import { ControlledTextInput } from '@/shared/components/controlledInput/ControlledTextInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ProjectAmbassadorListQuery } from '@/types/index.ts'

import { TableData, TableWithAccordion } from '../../common/TableWithAccordion.tsx'
import { AddAmbassadorFormData } from './ProjectDashboardPromote.tsx'

const ADD_AMBASSADOR_FORM_ID = 'add-ambassador-form'

type ProjectType = NonNullable<ProjectAmbassadorListQuery['projectGet']>
type AmbassadorsConnectionType = NonNullable<ProjectType['ambassadors']>
type EdgesArrayType = NonNullable<AmbassadorsConnectionType['edges']>
type AmbassadorEdge = NonNullable<EdgesArrayType[number]>

interface AmbassadorPayoutsSectionProps {
  ambassadors: AmbassadorEdge[]
  ambassadorsLoading: boolean
  ambassadorTableSchema: TableData<AmbassadorEdge>[]
  handleAddAmbassadorSubmit: (
    onSubmit: SubmitHandler<AddAmbassadorFormData>,
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>
  onAddAmbassador: SubmitHandler<AddAmbassadorFormData>
  control: Control<AddAmbassadorFormData>
  addAmbassadorLoading: boolean
}

/** AmbassadorPayoutsSection: Displays the Ambassador Payouts table and add form */
export const AmbassadorPayoutsSection = ({
  ambassadors,
  ambassadorsLoading,
  ambassadorTableSchema,
  handleAddAmbassadorSubmit,
  onAddAmbassador,
  control,
  addAmbassadorLoading,
}: AmbassadorPayoutsSectionProps) => {
  return (
    <CardLayout w="full" spacing={4} align="start">
      {/* <VStack spacing={4} align="start"> */}
      <Body size="xl" medium>
        {t('Ambassador Payouts')}
      </Body>
      <Body size="sm" light>
        {t(
          'Ambassadors spread the word about your project. You can reward your most loyal ambassadors by sharing a percentage of the contributions they enable with them.',
        )}
      </Body>

      <form id={ADD_AMBASSADOR_FORM_ID} onSubmit={handleAddAmbassadorSubmit(onAddAmbassador)} style={{ width: '100%' }}>
        {/* Use SimpleGrid with gridTemplateColumns for flexible width */}
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

      {/* Loading and Empty States */}
      {ambassadorsLoading && !ambassadors.length ? (
        <Spinner />
      ) : !ambassadorsLoading && ambassadors.length === 0 ? (
        <Body size="sm" p={4} w="full" textAlign="center">
          {t("Your project doesn't have ambassadors yet.")}
        </Body>
      ) : (
        /* Use TableWithAccordion */
        <TableWithAccordion items={ambassadors} schema={ambassadorTableSchema} />
      )}
      {/* </VStack> */}
    </CardLayout>
  )
}
