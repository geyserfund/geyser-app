import { useState } from 'react'

import { ProjectFragment } from '../../types'

export const useProjectLinksValidation = ({
  updateProject,
}: {
  updateProject: (project: Partial<ProjectFragment>) => void
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

        const url = new URL(link)

        const isDuplicate = links.indexOf(link) !== index
        if (url.protocol.includes('https') && !isDuplicate) {
          errors.push(false)
        } else {
          errors.push(true)
        }
      } catch (error) {
        errors.push(true)
      }
    })

    setLinkError(errors)

    updateProject({ links })
  }

  return { setLinks, linkError }
}
