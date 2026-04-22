import { ButtonGroup, HStack, IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom, useAtomValue } from 'jotai'
import { PiQuestion } from 'react-icons/pi'

import { Tooltip } from '@/components/ui/Tooltip.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { isRecurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { recurringFundingModes } from '@/modules/project/recurring/graphql.ts'
import { SelectablePillButton } from '@/shared/components/buttons/SelectablePillButton.tsx'
import { H3 } from '@/shared/components/typography'
import { useGetUserIpCountryQuery } from '@/types/index.ts'

import { tipsAtom } from '../../../state/tipsAtom.tsx'

const DEFAULT_TIP_OPTIONS = [0, 2, 5, 10, 21]
const DEFAULT_TIP_PERCENT = 5

/** GeyserTipInput component for selecting a tip percentage for Geyser */
export const GeyserTipInput = () => {
  const { formState, setGeyserTipPercent } = useFundingFormAtom()
  const { geyserTipPercent, fundingMode } = formState
  const isRecurringRenewal = useAtomValue(isRecurringContributionRenewalAtom)
  const tooltipContent =
    fundingMode === recurringFundingModes.recurringDonation
      ? t(
          'Geyser relies primarily on the generosity of Bitcoiners like you to operate our service. This tip is applied only to the first payment.',
        )
      : t('Geyser relies primarily on the generosity of Bitcoiners like you to operate our service.')

  const [tipOptions, setTipOptions] = useAtom(tipsAtom)

  useGetUserIpCountryQuery({
    skip: isRecurringRenewal,
    onCompleted(data) {
      if (data.userIpCountry === 'US' || data.userIpCountry === 'CA') {
        setTipOptions([0, 5, 15, 18, 21])
        setGeyserTipPercent(15)
      } else {
        setTipOptions(DEFAULT_TIP_OPTIONS)
        setGeyserTipPercent(DEFAULT_TIP_PERCENT)
      }
    },
    onError() {
      setTipOptions(DEFAULT_TIP_OPTIONS)
      setGeyserTipPercent(DEFAULT_TIP_PERCENT)
    },
  })

  if (isRecurringRenewal) return null

  if (!tipOptions) return null

  return (
    <HStack spacing={4} align="center" justify="space-between" w="full" flexWrap="wrap">
      <HStack>
        <H3>{t('Tip Geyser Services')}</H3>
        <Tooltip content={tooltipContent}>
          <IconButton
            aria-label={tooltipContent}
            icon={<PiQuestion size={16} />}
            size="xs"
            variant="ghost"
            isRound
          />
        </Tooltip>
      </HStack>
      <ButtonGroup spacing={3}>
        {tipOptions.map((percent) => (
          <SelectablePillButton
            key={percent}
            onClick={() => setGeyserTipPercent(percent)}
            isSelected={geyserTipPercent === percent}
            w={{ base: '50px', sm: '60px' }}
          >
            {percent}%
          </SelectablePillButton>
        ))}
      </ButtonGroup>
    </HStack>
  )
}
