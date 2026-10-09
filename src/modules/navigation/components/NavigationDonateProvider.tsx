import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'

const NavigationDonateContext = createContext<(() => void) | null>(null)

/** Keeps the Impact Fund donation modal mounted when navigation menus close. */
export const NavigationDonateProvider = ({ children }: { children: ReactNode }) => {
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()

  return (
    <NavigationDonateContext.Provider value={openDonateModal}>
      {children}
      {donateModalElement}
    </NavigationDonateContext.Provider>
  )
}

/** Opens the same donation preferences flow used by the Impact Fund page. */
export const useNavigationDonateModal = () => {
  const openDonateModal = useContext(NavigationDonateContext)

  if (!openDonateModal) {
    throw new Error('Navigation donation actions require NavigationDonateProvider')
  }

  return openDonateModal
}
