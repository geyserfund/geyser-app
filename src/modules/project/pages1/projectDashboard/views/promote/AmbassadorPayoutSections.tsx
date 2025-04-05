import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ProjectAmbassadorListQuery } from '@/types/index.ts'

import { TableData, TableWithAccordion } from '../../common/TableWithAccordion.tsx'

const ADD_AMBASSADOR_FORM_ID = 'add-ambassador-form'
const PAYOUT_RATE_MIN = 0.01
const PAYOUT_RATE_MAX = 99

type AddAmbassadorFormData = {
  heroId: string
  payoutRate: number | string
}

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
  registerAddAmbassador: UseFormRegister<AddAmbassadorFormData>
  addAmbassadorErrors: FieldErrors<AddAmbassadorFormData>
  addAmbassadorLoading: boolean
}

/** AmbassadorPayoutsSection: Displays the Ambassador Payouts table and add form */
export const AmbassadorPayoutsSection = ({
  ambassadors,
  ambassadorsLoading,
  ambassadorTableSchema,
  handleAddAmbassadorSubmit,
  onAddAmbassador,
  registerAddAmbassador,
  addAmbassadorErrors,
  addAmbassadorLoading,
}: AmbassadorPayoutsSectionProps) => {
  return (
    <CardLayout w="full">
      <VStack spacing={4} align="start">
        <Body size="xl" medium>
          {t('Ambassador Payouts')}
        </Body>
        <Body size="sm" light>
          {t(
            'Ambassadors spread the word about your project. You can reward your most loyal ambassadors by sharing a percentage of the contributions they enable with them.',
          )}
        </Body>

        {/* Improved Add Ambassador Form */}
        <form
          id={ADD_AMBASSADOR_FORM_ID}
          onSubmit={handleAddAmbassadorSubmit(onAddAmbassador)}
          style={{ width: '100%' }}
        >
          {/* Use SimpleGrid for better responsive layout */}
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} alignItems="start" mb={4}>
            {/* Hero ID Input */}
            <FormControl isInvalid={Boolean(addAmbassadorErrors.heroId)} gridColumn={{ md: 'span 2' }}>
              <Input
                size="sm"
                placeholder={t('User Hero ID')}
                {...registerAddAmbassador('heroId', { required: t('User ID is required') })}
                isDisabled={addAmbassadorLoading}
              />
              <FormErrorMessage>{addAmbassadorErrors.heroId && addAmbassadorErrors.heroId.message}</FormErrorMessage>
            </FormControl>

            {/* Payout Rate Input */}
            <FormControl isInvalid={Boolean(addAmbassadorErrors.payoutRate)}>
              <InputGroup size="sm">
                <Input
                  type="number"
                  placeholder={t('Rate')}
                  step="0.01"
                  {...registerAddAmbassador('payoutRate', {
                    required: t('Rate is required'),
                    min: {
                      value: PAYOUT_RATE_MIN,
                      message: t('Rate must be > {{min}} and <= {{max}}', { min: 0, max: PAYOUT_RATE_MAX }),
                    },
                    max: {
                      value: PAYOUT_RATE_MAX,
                      message: t('Rate must be > {{min}} and <= {{max}}', { min: 0, max: PAYOUT_RATE_MAX }),
                    },
                    valueAsNumber: true,
                  })}
                  textAlign="right"
                  isDisabled={addAmbassadorLoading}
                />
                <InputRightElement>%</InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {addAmbassadorErrors.payoutRate && addAmbassadorErrors.payoutRate.message}
              </FormErrorMessage>
            </FormControl>

            {/* Add Button */}
            <Box textAlign={{ base: 'right', md: 'center' }}>
              <Button
                type="submit"
                size="md"
                isLoading={addAmbassadorLoading}
                colorScheme="primary1"
                w={{ base: 'auto', md: 'full' }}
              >
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
      </VStack>
    </CardLayout>
  )
}
