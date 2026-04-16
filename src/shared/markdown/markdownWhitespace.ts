const NON_BREAKING_SPACE = '\u00A0'
const INLINE_MULTI_SPACE_REGEX = /(\S)( {2,})(?=\S)/g

/** Preserve repeated inline spaces by converting trailing spaces in each run to non-breaking spaces for editor round-trips. */
export const encodeMarkdownWhitespaceForEditor = (markdown: string): string => {
  if (!markdown) {
    return ''
  }

  return markdown.replace(INLINE_MULTI_SPACE_REGEX, (_, prefix: string, spaces: string) => {
    return `${prefix} ${NON_BREAKING_SPACE.repeat(spaces.length - 1)}`
  })
}

/** Restore normalized whitespace to plain spaces before persisting markdown to the API. */
export const decodeMarkdownWhitespaceFromEditor = (markdown: string): string => {
  if (!markdown) {
    return ''
  }

  return markdown.replaceAll(NON_BREAKING_SPACE, ' ')
}
