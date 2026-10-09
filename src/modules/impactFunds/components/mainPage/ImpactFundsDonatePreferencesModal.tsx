import { Button, Flex, SimpleGrid, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
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
  CIRCULAR_GRANTS_CATEGORY_ID,
  clearImpactFundDonateSessionPref,
  LATAM_IMPACT_FUND_SLUG,
  LATIN_AMERICA_REGION_ID,
  REGION_OPTIONS,
  WORKSHOPS_OPERATIONS_CATEGORY_ID,
  writeImpactFundDonateSessionPref,
} from '../../utils/impactFundDonatePreferences.ts'

type ImpactFundsDonatePreferencesModalProps = {
  isOpen: boolean
  onClose: () => void
  impactFunds: ImpactFundsQuery['impactFunds']
  defaultCategoryIds?: ImpactFundDonateCategoryId[]
}

const DEFAULT_CATEGORY_IDS: ImpactFundDonateCategoryId[] = []

const TOPIC_SECTIONS = [
  {
    id: CIRCULAR_GRANTS_CATEGORY_ID,
    titleKey: 'Grow Circular Grants' as const,
    descriptionKey:
      'Grow reusable capital pool deployed through Field Partners to local projects that can return capital and recycle sats' as const,
  },
  {
    id: WORKSHOPS_OPERATIONS_CATEGORY_ID,
    titleKey: 'Support Field Partners' as const,
    descriptionKey:
      'Support Field Partner onboarding and operations for their work on-the-ground supporting projects.' as const,
  },
] as const

/** Donate preferences: single region, multi category, then route to the correct fund project funding flow. */
export function ImpactFundsDonatePreferencesModal({
  isOpen,
  onClose,
  impactFunds,
  defaultCategoryIds = DEFAULT_CATEGORY_IDS,
}: ImpactFundsDonatePreferencesModalProps): React.ReactNode {
  const navigate = useNavigate()
  const { error: notifyError } = useNotification()

  const [selectedRegionId, setSelectedRegionId] = useState<ImpactFundDonateRegionId | null>(null)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<Set<ImpactFundDonateCategoryId>>(() => new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = useCallback(() => {
    setSelectedRegionId(null)
    setSelectedCategoryIds(new Set())
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setSelectedRegionId(null)
    setSelectedCategoryIds(new Set(defaultCategoryIds))
  }, [defaultCategoryIds, isOpen])

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
    return selectedRegionId === LATIN_AMERICA_REGION_ID ? LATAM_IMPACT_FUND_SLUG : BITCOIN_ADOPTION_IMPACT_FUND_SLUG
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      title={t('Donate to the Geyser Impact Fund')}
      contentProps={{
        maxW: { base: 'calc(100vw - 1rem)', md: '90vw', lg: '880px' },
        w: 'full',
      }}
      wrapperProps={{ paddingY: { base: 6, md: 8 } }}
      bodyProps={{ gap: 0, alignItems: 'stretch', paddingBottom: 2 }}
    >
      <VStack align="stretch" spacing={{ base: 6, md: 8 }}>
        <VStack align="stretch" spacing={3}>
          <Body id="impact-fund-donate-region-label" size="md" light>
            {t('Are there any regions you want to support more specifically?')}
          </Body>
          <Wrap spacing={3} shouldWrapChildren role="group" aria-labelledby="impact-fund-donate-region-label">
            {REGION_OPTIONS.map((r) => {
              const isSelected = selectedRegionId === r.id
              return (
                <WrapItem key={r.id}>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    colorScheme="neutral1"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedRegionId((prev) => (prev === r.id ? null : r.id))}
                  >
                    {t(r.labelKey)}
                  </Button>
                </WrapItem>
              )
            })}
          </Wrap>
        </VStack>

        <VStack align="stretch" spacing={3}>
          <Body id="impact-fund-donate-area-label" size="md" light>
            {t('Which areas of the Impact Fund do you want to support?')}
          </Body>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 3, md: 4 }}
            role="group"
            aria-labelledby="impact-fund-donate-area-label"
          >
            {TOPIC_SECTIONS.map((section) => {
              const isSelected = selectedCategoryIds.has(section.id)
              return (
                <Button
                  key={section.id}
                  type="button"
                  variant="outline"
                  colorScheme="neutral1"
                  aria-pressed={isSelected}
                  borderRadius="innerCard"
                  h="auto"
                  px={{ base: 4, md: 5 }}
                  py={{ base: 4, md: 5 }}
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  textAlign="left"
                  whiteSpace="normal"
                  onClick={() => toggleCategory(section.id)}
                >
                  <VStack align="flex-start" spacing={2}>
                    <Body size="md" bold color={isSelected ? 'primary1.11' : 'utils.text'}>
                      {t(section.titleKey)}
                    </Body>
                    <Body size="sm" light fontWeight={400}>
                      {t(section.descriptionKey)}
                    </Body>
                  </VStack>
                </Button>
              )
            })}
          </SimpleGrid>
        </VStack>

        <Flex justify="flex-end">
          <Button
            type="button"
            colorScheme="primary1"
            size="lg"
            w={{ base: 'full', md: 'auto' }}
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
