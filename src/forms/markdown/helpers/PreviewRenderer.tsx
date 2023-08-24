import { RemirrorRenderer } from '@remirror/react'
import { getRemirrorJSON, RemirrorContentType, RemirrorManager } from 'remirror'

import { markMap, typeMap } from './typeMaps'

export const PreviewRenderer = ({
  manager,
  content,
}: {
  manager: RemirrorManager<any>
  content?: RemirrorContentType
}) => {
  // const newContent = formatString(content?.toString() || '')

  return (
    <RemirrorRenderer
      typeMap={typeMap}
      markMap={markMap}
      json={getRemirrorJSON(
        manager.createState({
          content,
          stringHandler: 'markdown',
        }),
      )}
    />
  )
}

// export const matchMarkDownSpecialKeysAtLineEnd =
//   /\n(?!.*(\*|_|#|-|\||`|[0-9]+(\.|\))))/g

// const formatString = (value: string): string => {
//   const adjustForLineChange = value
//     ? value.replaceAll(matchMarkDownSpecialKeysAtLineEnd, '\\\n')
//     : ''

//   const adjustedForMultiParagrah = adjustForLineChange.replaceAll(
//     /\n\n/g,
//     '\n\\\n',
//   )

//   const finalValue = getRidOfEndSlash(adjustedForMultiParagrah)

//   console.log('before content', JSON.stringify(value))
//   console.log('medium content', JSON.stringify(adjustForLineChange))
//   console.log('after content', JSON.stringify(adjustedForMultiParagrah))

//   return finalValue
// }

// const getRidOfEndSlash = (value: string): string => {
//   if (value[value.length - 2] === '\\') {
//     const newValue = value.slice(0, value.length - 2)
//     return getRidOfEndSlash(newValue)
//   }

//   return value
// }
