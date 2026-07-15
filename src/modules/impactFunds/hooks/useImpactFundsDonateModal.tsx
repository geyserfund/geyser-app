import { useCallback, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import { ImpactFundsDonatePreferencesModal } from '@/modules/impactFunds/components/mainPage/ImpactFundsDonatePreferencesModal.tsx'
import type { ImpactFundDonateModalOpenOptions } from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { useImpactFundsQuery } from '@/types'

/** Shared donate modal state and renderer for Impact Fund program pages. */
export function useImpactFundsDonateModal() {
  const donateModal = useDisclosure()
  const { data } = useImpactFundsQuery()
  const [openOptions, setOpenOptions] = useState<ImpactFundDonateModalOpenOptions>({})

  const openDonateModal = useCallback(
    (options?: ImpactFundDonateModalOpenOptions) => {
      setOpenOptions(options ?? {})
      donateModal.onOpen()
    },
    [donateModal],
  )

  const donateModalElement = (
    <ImpactFundsDonatePreferencesModal
      isOpen={donateModal.isOpen}
      onClose={donateModal.onClose}
      impactFunds={data?.impactFunds || []}
      defaultCategoryIds={openOptions.defaultCategoryIds}
    />
  )

  return {
    openDonateModal,
    donateModalElement,
  }
}
