import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'

import { isProjectCreationEditLockedAtom } from '@/modules/project/pages/projectCreation/states/projectReviewAtom.ts'
import { useNotification } from '@/utils/tools/Notification.tsx'

/** Centralized creation-flow guard for blocking edit mutations while review lock is active. */
export const useProjectCreationEditGuard = () => {
  const toast = useNotification()
  const isEditLocked = useAtomValue(isProjectCreationEditLockedAtom)

  const guardProjectEditAttempt = useCallback(() => {
    if (!isEditLocked) {
      return false
    }

    toast.info({
      title: t('It is not possible to edit your project while in review.'),
    })

    return true
  }, [isEditLocked, toast])

  return {
    isEditLocked,
    guardProjectEditAttempt,
  }
}
