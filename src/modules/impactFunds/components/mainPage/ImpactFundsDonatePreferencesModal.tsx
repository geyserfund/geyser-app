import { Button, Flex, useColorModeValue, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { postImpactFundDonationPreference } from '@/api/airtable.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import type { ImpactFundsQuery } from '@/types'
import { useNotification } from '@/utils'

import {
  type ImpactFundDonateCategoryId,
  type ImpactFundDonateRegionId,
  BITCOIN_ADOPTION_IMPACT_FUND_SLUG,
  CATEGORY_OPTIONS,
  clearImpactFundDonateSessionPref,
  LATAM_IMPACT_FUND_SLUG,
  REGION_OPTIONS,
  writeImpactFundDonateSessionPref,
} from '../../utils/impactFundDonatePreferences.ts'

type ImpactFundsDonatePreferencesModalProps = {
  isOpen: boolean
  onClose: () => void
  impactFunds: ImpactFundsQuery['impactFunds']
}

/** Donate preferences: single region, multi category, then route to the correct fund project funding flow. */
export function ImpactFundsDonatePreferencesModal({
  isOpen,
  onClose,
  impactFunds,
}: ImpactFundsDonatePreferencesModalProps): JSX.Element {
  const navigate = useNavigate()
  const { error: notifyError } = useNotification()

  const [selectedRegionId, setSelectedRegionId] = useState<ImpactFundDonateRegionId | null>(null)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<ImpactFundDonateCategoryId>>(() => new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const muted = useColorModeValue('neutral1.9', 'neutral1.11')
  const chipBorder = useColorModeValue('neutral1.4', 'whiteAlpha.300')
  const chipBg = useColorModeValue('white', 'neutral1.3')

  const resetForm = useCallback(() => {
    setSelectedRegionId(null)
    setSelectedCategoryIds(new Set())
  }, [])

  const handleClose = useCallback(() => {
    resetForm()
    onClose()
  }, [onClose, resetForm])

  const toggleCategory = useCallback((id: ImpactFundDonateCategoryId) => {
    setSelectedCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const targetSlug = useMemo(() => {
    return selectedRegionId === 'south-america' ? LATAM_IMPACT_FUND_SLUG : BITCOIN_ADOPTION_IMPACT_FUND_SLUG
  }, [selectedRegionId])

  const handleContinue = useCallback(async () => {
    const fund = impactFunds.find((f) => f.name === targetSlug)
    const donateProjectName = fund?.donateProject?.name
    if (!donateProjectName) {
      notifyError({
        title: t('Unable to start donation'),
        description: t('This fund is not available right now. Please try again later.'),
      })
      return
    }

    const regionOption = selectedRegionId ? REGION_OPTIONS.find((r) => r.id === selectedRegionId) : undefined
    const regionLabel = regionOption ? t(regionOption.labelKey) : null
    const categoryLabels = CATEGORY_OPTIONS.filter((c) => selectedCategoryIds.has(c.id)).map((c) => t(c.labelKey))

    setIsSubmitting(true)
    try {
      const { recordId } = await postImpactFundDonationPreference({
        regionLabel,
        categoriesLabels: categoryLabels,
        targetImpactFundSlug: targetSlug,
      })

      if (recordId) {
        writeImpactFundDonateSessionPref({ airtableRecordId: recordId, donateProjectName })
      } else {
        clearImpactFundDonateSessionPref()
      }

      const fundingPath = getPath('projectFunding', donateProjectName)
      handleClose()
      navigate(fundingPath)
    } catch {
      notifyError({
        title: t('Something went wrong'),
        description: t('We could not save your preferences. You can still continue to donate.'),
      })
      const fundingPath = getPath('projectFunding', donateProjectName)
      handleClose()
      navigate(fundingPath)
    } finally {
      setIsSubmitting(false)
    }
  }, [handleClose, impactFunds, navigate, selectedCategoryIds, selectedRegionId, targetSlug, notifyError])

  const chipButtonProps = {
    size: 'lg' as const,
    variant: 'outline' as const,
    minH: '52px',
    px: 6,
    py: 3,
    fontSize: 'md',
    fontWeight: 'semibold' as const,
    borderWidth: '1px',
    borderColor: chipBorder,
    bg: chipBg,
    colorScheme: 'neutral1' as const,
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      title={t('Donate to the Bitcoin Adoption Impact Fund')}
      contentProps={{
        maxW: { base: 'calc(100vw - 1rem)', md: '90vw', lg: '880px' },
        w: 'full',
      }}
      wrapperProps={{ paddingY: { base: 6, md: 8 } }}
      bodyProps={{ gap: 0, alignItems: 'stretch', paddingBottom: 2 }}
    >
      <VStack align="stretch" spacing={{ base: 7, md: 9 }}>
        <VStack align="stretch" spacing={4}>
          <Body color={muted} size="md" lineHeight={1.6}>
            {t('Are there any regions you want to support more specifically?')}
          </Body>
          <Wrap spacing={{ base: 3, md: 4 }} shouldWrapChildren>
            {REGION_OPTIONS.map((r) => {
              const isSelected = selectedRegionId === r.id
              return (
                <WrapItem key={r.id}>
                  <Button
                    type="button"
                    {...chipButtonProps}
                    isActive={isSelected}
                    onClick={() => setSelectedRegionId((prev) => (prev === r.id ? null : r.id))}
                  >
                    {t(r.labelKey)}
                  </Button>
                </WrapItem>
              )
            })}
          </Wrap>
        </VStack>

        <VStack align="stretch" spacing={4}>
          <Body color={muted} size="md" lineHeight={1.6}>
            {t('Are there any topics you want to support more specifically?')}
          </Body>
          <Wrap spacing={{ base: 3, md: 4 }} shouldWrapChildren>
            {CATEGORY_OPTIONS.map((c) => {
              const isSelected = selectedCategoryIds.has(c.id)
              return (
                <WrapItem key={c.id}>
                  <Button
                    type="button"
                    {...chipButtonProps}
                    isActive={isSelected}
                    onClick={() => toggleCategory(c.id)}
                  >
                    {t(c.labelKey)}
                  </Button>
                </WrapItem>
              )
            })}
          </Wrap>
        </VStack>

        <Flex justify="flex-end" pt={{ base: 2, md: 4 }}>
          <Button
            type="button"
            colorScheme="amber"
            size="lg"
            borderRadius="8px"
            fontWeight="bold"
            px={8}
            minH="48px"
            isLoading={isSubmitting}
            loadingText={t('Continue')}
            onClick={handleContinue}
          >
            {t('Continue to Payment')}
          </Button>
        </Flex>
      </VStack>
    </Modal>
  )
}
