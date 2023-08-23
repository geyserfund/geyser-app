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
  const newContent = content?.toString().replaceAll(/\n/g, '\\n')
  console.log('checking content', content)
  console.log('checking newContent', newContent)
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
