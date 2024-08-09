import { useState } from 'react'

import { ProjectState } from '@/modules/project/state/projectAtom'

import { validUrl } from '../../../utils'

export const useProjectLinksValidation = ({
  updateProject,
}: {
  updateProject: (project: Partial<ProjectState>) => void
}) => {
  const [linkError, setLinkError] = useState<boolean[]>([false])

  const setLinks = (links: string[]) => {
    const errors = [] as boolean[]

    links.map((link, index) => {
      try {
        if (!link) {
          errors.push(false)
          return
        }

        const isValid = validUrl.test(link)

        const isDuplicate = links.indexOf(link) !== index
        if (isValid && !isDuplicate) {
          errors.push(false)
        } else {
          errors.push(true)
        }
      } catch (error) {
        errors.push(true)
      }

      return link
    })

    setLinkError(errors)

    updateProject({ links })
  }

  return { setLinks, linkError }
}
