import { Button, HStack, Icon, Link, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import React from 'react'
import { PiBuildings, PiHeartbeatFill, PiUser } from 'react-icons/pi'

import { useAuthContext } from '@/context/auth.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { useModal, UseModalReturn } from '@/shared/hooks/useModal.tsx'
import {
  LegalEntityType,
  useProjectCountriesGetQuery,
  useUserTaxProfileQuery,
  useUserTaxProfileUpdateMutation,
} from '@/types/index.ts'

import { userTaxProfileAtom } from '../state/taxProfileAtom.ts'
import { TaxProfileForm, TaxProfileFormData } from './TaxProfileForm.tsx'

const options: { value: LegalEntityType; label: string; icon: React.ElementType }[] = [
  { value: LegalEntityType.Person, label: t('Individual'), icon: PiUser },
  { value: LegalEntityType.Company, label: t('Company'), icon: PiBuildings },
  { value: LegalEntityType.NonProfit, label: t('Non-profit'), icon: PiHeartbeatFill },
]

/** LegalEntitySelection: Allows selection of the legal entity type (Individual, Company, Non-profit). */
export const LegalEntitySelection: React.FC<{ disableIndividualPopup?: boolean }> = ({ disableIndividualPopup }) => {
  const taxProfileModal = useModal<TaxProfileFormData>()

  const [taxProfile, setTaxProfile] = useAtom(userTaxProfileAtom)

  const [updateTaxProfile] = useUserTaxProfileUpdateMutation({
    onCompleted(data) {
      setTaxProfile(data?.userTaxProfileUpdate)
    },
  })

  const { user } = useAuthContext()

  useUserTaxProfileQuery({
    skip: !user.id,
    variables: {
      where: {
        id: user.id,
      },
    },
    onCompleted(data) {
      if (data?.user.taxProfile) {
        setTaxProfile(data?.user.taxProfile)
      }
    },
  })

  const { data: projectCountriesData } = useProjectCountriesGetQuery()

  const countryLabel =
    taxProfile && taxProfile.country
      ? projectCountriesData?.projectCountriesGet.find((country) => country.country.code === taxProfile?.country)
          ?.country.name
      : ''

  const openModal = (data: TaxProfileFormData) => {
    console.log('disableIndividualPopup', disableIndividualPopup, data)
    if (disableIndividualPopup && data.legalEntityType === LegalEntityType.Person) {
      updateTaxProfile({
        variables: {
          input: {
            ...data,
          },
        },
      })
      return
    }

    taxProfileModal.onOpen(data)
  }

  return (
    <>
      <HStack w="full" flexDirection={{ base: 'column', md: 'row' }} spacing={4} alignItems="start">
        {options.map((option) => {
          const isSelected = taxProfile?.legalEntityType === option.value

          if (isSelected) {
            return (
              <VStack
                key={option.value}
                flex={1}
                alignItems="center"
                border="1px solid"
                borderColor="primary1.11"
                borderRadius="12px"
                p={4}
                minHeight="80px"
                color="neutral1.11"
                width="full"
              >
                <HStack w="full" py="2">
                  <Icon as={option.icon} boxSize={5} />
                  <Body size="lg" light medium>
                    {option.label}
                  </Body>
                </HStack>
                <VStack align="start" spacing={1} w="full">
                  <Body size="sm">{`${t('Full Name')}: ${taxProfile.fullName || 'N/A'}`}</Body>
                  {taxProfile?.country && (
                    <Body size="sm">{`${t('Tax Residency')}: ${countryLabel}${
                      taxProfile.state ? `, ${taxProfile.state}` : ''
                    }`}</Body>
                  )}
                  {taxProfile?.taxId && <Body size="sm">{`${t('Tax ID')}: ${taxProfile.taxId}`}</Body>}
                  {(taxProfile?.legalEntityType === LegalEntityType.Company ||
                    taxProfile?.legalEntityType === LegalEntityType.NonProfit) &&
                    taxProfile?.incorporationDocument && (
                      <Body size="sm">
                        {t('Incorporation Document')}:{' '}
                        <Link href={taxProfile.incorporationDocument} isExternal>
                          {t('View Document')}
                        </Link>
                      </Body>
                    )}
                  <Button
                    size="md"
                    variant="outline"
                    onClick={() =>
                      openModal({
                        legalEntityType: taxProfile.legalEntityType,
                        fullName: taxProfile.fullName ?? undefined,
                        country: taxProfile.country ?? undefined,
                        taxId: taxProfile.taxId ?? undefined,
                        incorporationDocument: taxProfile.incorporationDocument ?? undefined,
                      })
                    }
                  >
                    {t('Update Information')}
                  </Button>
                </VStack>
              </VStack>
            )
          }

          return (
            <Button
              flex={1}
              width="full"
              size="xl"
              key={option.value}
              variant={'surface'}
              colorScheme={'neutral1'}
              leftIcon={<Icon as={option.icon} boxSize={5} />}
              p={4}
              borderWidth={1}
              height="80px"
              justifyContent="flex-start"
              onClick={() => openModal({ legalEntityType: option.value })}
            >
              {option.label}
            </Button>
          )
        })}
      </HStack>
      {taxProfileModal.isOpen && <TaxProfileModal {...taxProfileModal} />}
    </>
  )
}

const ModalSubtitleMap = {
  [LegalEntityType.Person]: t('This information will be displayed in your contribution and sale invoices.'),
  [LegalEntityType.Company]: t('This information will be displayed in your contribution and sale invoices.'),
  [LegalEntityType.NonProfit]: t('This information will be used to generate tax-deductible invoices for your donors.'),
}

export const TaxProfileModal = ({ ...props }: UseModalReturn<TaxProfileFormData>) => {
  const [_, setTaxProfile] = useAtom(userTaxProfileAtom)

  const [updateTaxProfile] = useUserTaxProfileUpdateMutation({
    onCompleted(data) {
      setTaxProfile(data?.userTaxProfileUpdate)
    },
  })

  const handleFormSubmit = (data: TaxProfileFormData) => {
    updateTaxProfile({
      variables: {
        input: {
          ...data,
        },
      },
    })
    props.onClose()
  }

  return (
    <Modal
      {...props}
      title={`${t('Tax profile')} ${props.props.legalEntityType === LegalEntityType.NonProfit ? '' : t('(optional)')}`}
      subtitle={ModalSubtitleMap[props.props.legalEntityType]}
      closeOnOverlayClick={false}
      size="lg"
      bodyProps={{ pt: 4 }}
    >
      <TaxProfileForm data={props.props} onSubmit={handleFormSubmit} />
    </Modal>
  )
}
