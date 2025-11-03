import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PiBuildings, PiHeartbeatFill, PiUser } from 'react-icons/pi'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { LegalEntityType } from '@/types/index.ts'

import { TaxProfileFormData } from '../useTaxProfileForm.tsx'
import { TaxProfileForm } from './TaxProfileForm.tsx'

const options: { value: LegalEntityType; label: string; icon: React.ElementType }[] = [
  { value: LegalEntityType.Person, label: t('Individual'), icon: PiUser },
  { value: LegalEntityType.Company, label: t('Company'), icon: PiBuildings },
  { value: LegalEntityType.NonProfit, label: t('Non-profit'), icon: PiHeartbeatFill },
]

const infoMap = {
  [LegalEntityType.Person]: t('This information will be displayed in donations and sale invoices.'),
  [LegalEntityType.Company]: t('This information will be displayed in donations and sale invoices.'),
  [LegalEntityType.NonProfit]: t(
    'This information will be displayed in donations and sale invoices, to enable tax-deductible donations on elegible projects.',
  ),
}

/** LegalEntitySelection: Allows selection of the legal entity type (Individual, Company, Non-profit). */
export const LegalEntitySelection = ({ form }: { form: UseFormReturn<TaxProfileFormData> }) => {
  const legalEntityType = form.watch('legalEntityType')

  return (
    <VStack w="full" gap={6} alignItems="start">
      <HStack w="full" spacing={4} alignItems="start">
        {options.map((option) => {
          const isSelected = legalEntityType === option.value

          return (
            <Button
              flex={1}
              width={{ base: 'auto', lg: 'full' }}
              size={{ base: 'sm', md: 'xl' }}
              key={option.value}
              variant={'surface'}
              colorScheme={isSelected ? 'primary1' : 'neutral1'}
              leftIcon={<Icon as={option.icon} boxSize={5} />}
              p={{ base: '20px 4px', lg: 4 }}
              borderWidth={1}
              height={{ base: '30px', lg: '64px' }}
              justifyContent="flex-start"
              onClick={() => {
                form.setValue('legalEntityType', option.value)
              }}
            >
              {option.label}
            </Button>
          )
        })}
      </HStack>
      {legalEntityType && (
        <CardLayout noborder backgroundColor="neutral1.3" w="full">
          <Body size="lg" medium>
            {`${t('Tax profile')} ${legalEntityType === LegalEntityType.NonProfit ? '(required)' : t('(optional)')}`}
          </Body>
          <Body>{infoMap[legalEntityType]}</Body>
          <TaxProfileForm form={form} />
        </CardLayout>
      )}
    </VStack>
  )
}
