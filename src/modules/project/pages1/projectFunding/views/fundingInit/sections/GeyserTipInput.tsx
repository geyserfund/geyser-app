import { Button, ButtonGroup, HStack, IconButton } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiQuestion } from 'react-icons/pi'

import { Tooltip } from '@/components/ui/Tooltip.tsx'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'

/** GeyserTipInput component for selecting a tip percentage for Geyser */
export const GeyserTipInput = () => {
  const { formState, setGeyserTipPercent } = useFundingFormAtom()
  const { geyserTipPercent } = formState

  const tipOptions = [0, 2.1, 5]

  return (
    <CardLayout w="full" spacing={3}>
      {/* <VStack align="start" w="full" spacing={3}> */}
      <HStack spacing={4} align="center" justify="space-between" w="full">
        <HStack>
          <H3>{t('Support Geyser')}</H3>
          <Tooltip content={t('Help Geyser on its mission to accelerate grassroots Bitcoin adoption in the world.')}>
            <IconButton
              aria-label={t('Help Geyser on its mission to accelerate grassroots Bitcoin adoption in the world.')}
              icon={<PiQuestion size={16} />}
              size="xs"
              variant="ghost"
              isRound
            />
          </Tooltip>
        </HStack>
        <ButtonGroup size="md" variant="outline">
          {tipOptions.map((percent) => (
            <Button
              key={percent}
              onClick={() => setGeyserTipPercent(percent)}
              variant={geyserTipPercent === percent ? 'surface' : 'outline'}
              colorScheme={geyserTipPercent === percent ? 'primary1' : 'neutral.9'}
              w="70px" // Fixed width for buttons
            >
              {percent}%
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
      {/* </VStack> */}
    </CardLayout>
  )
}
