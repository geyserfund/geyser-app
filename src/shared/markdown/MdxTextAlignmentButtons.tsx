import { ButtonWithTooltip, editorInFocus$, readOnly$, rootEditor$, useCellValue } from '@mdxeditor/editor'
import { t } from 'i18next'
import { type LexicalEditor, FORMAT_ELEMENT_COMMAND } from 'lexical'
import { PiTextAlignCenter, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi'

const getFocusedEditor = (editorInFocusRef: unknown, rootEditor: LexicalEditor | null): LexicalEditor | null => {
  if (editorInFocusRef && typeof (editorInFocusRef as LexicalEditor).dispatchCommand === 'function') {
    return editorInFocusRef as LexicalEditor
  }

  return rootEditor
}

/** Text alignment controls restored to the markdown toolbar (left, center, right). */
export const MdxTextAlignmentButtons = () => {
  const isReadOnly = useCellValue(readOnly$)
  const rootEditor = useCellValue(rootEditor$)
  const editorInFocus = useCellValue(editorInFocus$)

  const applyAlignment = (alignment: 'left' | 'center' | 'right') => {
    const editor = getFocusedEditor(editorInFocus?.editorRef, rootEditor)

    if (!editor || isReadOnly) {
      return
    }

    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment)
  }

  return (
    <>
      <ButtonWithTooltip
        title={t('Align left')}
        aria-label={t('Align left')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('left')}
      >
        <PiTextAlignLeft size={16} />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        title={t('Align center')}
        aria-label={t('Align center')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('center')}
      >
        <PiTextAlignCenter size={16} />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        title={t('Align right')}
        aria-label={t('Align right')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('right')}
      >
        <PiTextAlignRight size={16} />
      </ButtonWithTooltip>
    </>
  )
}
