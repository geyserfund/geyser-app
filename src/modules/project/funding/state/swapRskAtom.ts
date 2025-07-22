import { atom } from 'jotai'

import { AccountKeys } from '../../pages1/projectCreation/views/launchPayment/views/launchPaymentAccountPassword/keyGenerationHelper.ts'

export const rskAccountKeysAtom = atom<AccountKeys>()
