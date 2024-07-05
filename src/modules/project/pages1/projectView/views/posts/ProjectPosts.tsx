import { useInitEntries } from '@/modules/project/hooks/useInitEntries'
import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'

import { RenderEntries } from './RenderEntries'

export const ProjectPosts = () => {
  const { loading } = useProjectAtom()

  const { entriesLoading } = useInitEntries(true)

  if (loading || entriesLoading) {
    return null
  }

  return <RenderEntries />
}
