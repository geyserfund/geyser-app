import { PropsWithChildren, useEffect } from 'react'

import { UseInitProjectProps, useProjectAPI } from '../API/useProjectAPI'
import { useProjectReset } from '../state/projectAtom'

type ProjectState = UseInitProjectProps

export const ProjectProvider = ({ children, ...props }: PropsWithChildren<ProjectState>) => {
  const resetProject = useProjectReset()

  useProjectAPI({
    load: true,
    ...props,
  })

  useEffect(() => {
    return () => {
      resetProject()
    }
  }, [props.projectId, props.projectName])

  return <>{children}</>
}
