import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const SHOW_CONTRIBUTIONS = 'show-contributions'

const settingAtom = atomWithStorage(SHOW_CONTRIBUTIONS, true)

export function useContributionSummary() {
  const [isShown, setIsShown] = useAtom(settingAtom)

  function toggle() {
    setIsShown(!isShown)
  }

  return { isShown, toggle }
}
