import { IconButton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiPencil } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { TitleDivider } from '../../../../components/ui/TitleDivider'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { MarkdownField } from '../../../../forms/markdown/MarkdownField'

export const Story = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project, isProjectOwner } = useProjectContext()

  if (!project?.description) {
    return null
  }

  return (
    <CardLayout>
      <article>
        <TitleDivider
          rightAction={
            isProjectOwner ? (
              <IconButton
                aria-label="go to edit story"
                onClick={() =>
                  project && navigate(getPath('dashboardStory', project.name))
                }
                variant="transparent"
              >
                <BiPencil />
              </IconButton>
            ) : undefined
          }
        >
          {t('Story')}
        </TitleDivider>
        <MarkdownField preview content={project?.description} />
      </article>
    </CardLayout>
  )
}
