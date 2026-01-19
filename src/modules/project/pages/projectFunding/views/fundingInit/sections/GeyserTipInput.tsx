import { Button, ButtonGroup, HStack, IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtom } from 'jotai'
import { PiQuestion } from 'react-icons/pi'

import { Tooltip } from '@/components/ui/Tooltip.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { useGetUserIpCountryQuery } from '@/types/index.ts'

import { tipsAtom } from '../../../state/tipsAtom.tsx'

const DEFAULT_TIP_OPTIONS = [0, 2, 5, 10, 21]
const DEFAULT_TIP_PERCENT = 5

/** GeyserTipInput component for selecting a tip percentage for Geyser */
export const GeyserTipInput = () => {
  const { formState, setGeyserTipPercent } = useFundingFormAtom()
  const { geyserTipPercent } = formState

  const [tipOptions, setTipOptions] = useAtom(tipsAtom)

  useGetUserIpCountryQuery({
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

  if (!tipOptions) return null

  return (
    <HStack spacing={4} align="center" justify="space-between" w="full" flexWrap="wrap">
      <HStack>
        <H3>{t('Tip Geyser Services')}</H3>
        <Tooltip
          content={t('Geyser relies primarily on the generosity of Bitcoiners like you to operate our service.')}
        >
          <IconButton
            aria-label={t('Geyser relies primarily on the generosity of Bitcoiners like you to operate our service.')}
            icon={<PiQuestion size={16} />}
            size="xs"
            variant="ghost"
            isRound
          />
        </Tooltip>
      </HStack>
      <ButtonGroup size="md" variant="outline" spacing={3}>
        {tipOptions.map((percent) => (
          <Button
            key={percent}
            onClick={() => setGeyserTipPercent(percent)}
            variant={'soft'}
            colorScheme={geyserTipPercent === percent ? 'primary1' : 'neutral1'}
            w={{ base: '50px', sm: '60px' }} // Fixed width for buttons
          >
            {percent}%
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  )
}
