import { IconButton } from '@chakra-ui/react'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { MarkdownField } from '../../../../forms/markdown/MarkdownField'

export const Story = () => {
  const navigate = useNavigate()
  const { project } = useProjectContext()

  if (!project?.description) {
    return null
  }

  return (
    <CardLayout>
      <TitleDivider
        rightAction={
          <IconButton
            aria-label="go to edit story"
            onClick={() =>
              project && navigate(getPath('dashboardStory', project.name))
            }
            variant="transparent"
          >
            <BiPencil />
          </IconButton>
        }
      >
        Story
      </TitleDivider>
      <MarkdownField preview content={project?.description} />
    </CardLayout>
  )
}
