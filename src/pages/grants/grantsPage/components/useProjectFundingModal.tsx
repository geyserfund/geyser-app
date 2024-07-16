import { useModal } from '../../../../shared/hooks/useModal'
import { Project } from '../../../../types'

export type ProjectFundingModalProps = ReturnType<typeof useProjectFundingModal>

export const useProjectFundingModal = () => {
  return { ...useModal<{ project?: Project }>() }
}
