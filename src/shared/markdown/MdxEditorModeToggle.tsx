import { Icon } from '@chakra-ui/react'
import { ButtonWithTooltip, useCellValue, usePublisher, viewMode$ } from '@mdxeditor/editor'
import { t } from 'i18next'
import { PiMarkdownLogo, PiTextT } from 'react-icons/pi'

/** Single toolbar control that toggles between rich-text and source editor modes. */
export const MdxEditorModeToggle = () => {
  const viewMode = useCellValue(viewMode$)
  const setViewMode = usePublisher(viewMode$)

  const isSourceMode = viewMode === 'source'
  const nextViewMode = isSourceMode ? 'rich-text' : 'source'
  const toggleLabel = isSourceMode ? t('Switch to rich text mode') : t('Switch to source mode')

  return (
    <ButtonWithTooltip
      title={toggleLabel}
      aria-label={toggleLabel}
      onClick={() => setViewMode(nextViewMode)}
      className="geyser-mdx-mode-toggle"
      data-source-mode={isSourceMode ? 'true' : 'false'}
    >
      <Icon as={isSourceMode ? PiTextT : PiMarkdownLogo} boxSize={4} />
    </ButtonWithTooltip>
  )
}
