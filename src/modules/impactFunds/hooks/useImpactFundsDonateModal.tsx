import { useDisclosure } from '@chakra-ui/react'

import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import { useImpactFundsQuery } from '@/types'

/** Shared donate modal state and renderer for Impact Fund program pages. */
export function useImpactFundsDonateModal() {
  const donateModal = useDisclosure()
  const { data } = useImpactFundsQuery()

  const donateModalElement = (
    <ImpactFundsDonatePreferencesModal
      isOpen={donateModal.isOpen}
      onClose={donateModal.onClose}
      impactFunds={data?.impactFunds || []}
    />
  )

  return {
    onDonateClick: donateModal.onOpen,
    donateModalElement,
  }
}
