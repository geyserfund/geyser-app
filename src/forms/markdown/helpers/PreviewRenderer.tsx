import { RemirrorRenderer } from '@remirror/react'
import DOMPurify from 'dompurify'
import { getRemirrorJSON, RemirrorContentType, RemirrorManager } from 'remirror'

import { markMap, typeMap } from './typeMaps'

export const PreviewRenderer = ({
  manager,
  content,
}: {
  manager: RemirrorManager<any>
  content?: RemirrorContentType
}) => {
  const newContent = FormatWhiteSpaceForMarkDownString(
    content?.toString() || '',
  )

  return (
    <RemirrorRenderer
      typeMap={typeMap}
      markMap={markMap}
      json={getRemirrorJSON(
        manager.createState({
          content: newContent,
          stringHandler: 'markdown',
        }),
      )}
    />
  )
}

export const matchMarkDownSpecialKeysAtLineEnd =
  /(?<!.*(\|\n|\||>))\n(?!.*(\n\||\||#|\[|>))/g

export const FormatWhiteSpaceForMarkDownString = (value: string): string => {
  const adjustForLineChange = value
    ? value.replaceAll(matchMarkDownSpecialKeysAtLineEnd, '<br>')
    : ''

  return DOMPurify.sanitize(adjustForLineChange, { ADD_TAGS: ['iframe'] })
}
