/* eslint-disable prefer-regex-literals */
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

export const FormatWhiteSpaceForMarkDownString = (value: string): string => {
  let adjustForLineChange: string

  // This replaves \n with <br /> except when the \n is followed by a link, table, header, list, blockquote, code block, or horizontal rule

  try {
    const requiredRegex = new RegExp(
      /(?<!.*(\|\n|\||>))\n(?!.*(\*|_|#|-|\[|>|\n\||\||`|[0-9]+(\.|\))))/g,
    )
    adjustForLineChange = value ? value.replaceAll(requiredRegex, '<br />') : ''
  } catch (e) {
    adjustForLineChange = replaceMatchingRegex(value)
  }

  return DOMPurify.sanitize(adjustForLineChange, { ADD_TAGS: ['iframe'] })
}

const replaceMatchingRegex = (str: string) => {
  const lineBreaks = str.split('\n')
  const replacedLines = lineBreaks.map((line) => {
    if (!line.match(/.*(\|\n|\||>)/)) {
      return line.replace(
        /(.*)(\n)(.*(\*|_|#|-|\[|>|\n\||\||`|[0-9]+(\.|\))))/g,
        '<br />',
      )
    }

    return line
  })

  return replacedLines.join('\n')
}
