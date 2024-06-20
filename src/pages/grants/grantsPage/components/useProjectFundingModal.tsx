import { useModal } from '../../../../hooks/useModal'
import { Grant, Project } from '../../../../types'

export type ProjectFundingModalProps = ReturnType<typeof useProjectFundingModal>

export const useProjectFundingModal = () => {
  return { ...useModal<{ project?: Project }>() }
}
