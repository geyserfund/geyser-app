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
