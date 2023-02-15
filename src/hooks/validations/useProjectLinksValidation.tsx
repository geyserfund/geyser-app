import { useState } from 'react'

import { Project } from '../../types'

export const useProjectLinksValidation = ({
  updateProject,
}: {
  updateProject: (_: Project) => void
}) => {
  const [linkError, setLinkError] = useState<boolean[]>([false])

  const setLinks = (links: string[]) => {
    const errors = [] as boolean[]

    links.map((link, index) => {
      try {
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

    updateProject({ links } as Project)
  }

  return { setLinks, linkError }
}
