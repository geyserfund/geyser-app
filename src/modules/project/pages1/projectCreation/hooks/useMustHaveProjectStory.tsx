import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom.ts'
import { getPath } from '@/shared/constants/index.ts'

import { creationRouteThatNeedsStory } from '../states/creationRoutesRulesAtom'

export const useMustHaveProjectStory = () => {
  const navigate = useNavigate()

  const { project, loading } = useProjectAtom()
  const isCreationRouteThatNeedsStory = useAtomValue(creationRouteThatNeedsStory)

  useEffect(() => {
    if (isCreationRouteThatNeedsStory && !loading && !project.description) {
      navigate(getPath('launchStory', project?.id), { replace: true })
    }
  }, [isCreationRouteThatNeedsStory, loading, project?.description, project?.id, navigate])
}
