import { useParams } from 'react-router-dom'

import { useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ButtonComponent } from '../../../components/ui'

export const LinkToProject = () => {
  document.documentElement.style.background = 'transparent'
  document.body.style.background = 'transparent'

  const { projectId } = useParams()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    colorMode === 'dark' && toggleColorMode()
  }, [toggleColorMode, colorMode])

  return (
    <div>
      <ButtonComponent as="a" href={`/project/${projectId}`} primary>
        Go to project
      </ButtonComponent>
    </div>
  )
}
