import { IconButton, SkeletonText } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdModeEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { getPath } from '../../../../../../../constants'
import { MarkdownField } from '../../../../../../../forms/markdown/MarkdownField'
import { CardLayout, SkeletonLayout } from '../../../../../../../shared/components/layouts'
import { useProjectContext } from '../../../../../context'

export const Story = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { project, isProjectOwner } = useProjectContext()

  if (!project) {
    return <StorySkeleton />
  }

  if (!project?.description) {
    return null
  }

  return (
    <CardLayout w="full" mobileDense>
      <article>
        <TitleDivider
          rightAction={
            isProjectOwner ? (
              <IconButton
                aria-label="go to edit story"
                onClick={() => project && navigate(getPath('dashboardStory', project.name))}
                variant="transparent"
              >
                <MdModeEdit fontSize={16} />
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

export const StorySkeleton = () => {
  return (
    <CardLayout w="full" mobileDense>
      <article>
        <TitleDivider>
          <SkeletonLayout w="100px" h="30px" />
        </TitleDivider>
        <SkeletonText noOfLines={10} spacing="4" />
      </article>
    </CardLayout>
  )
}
