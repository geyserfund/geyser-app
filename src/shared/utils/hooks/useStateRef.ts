import { useCallback, useState } from 'react'

export const useStateRef = <TNode>() => {
  const [node, setNode] = useState<TNode | null>(null)
  const ref = useCallback((node: TNode) => {
    if (node !== null) {
      setNode(node)
    }
  }, [])
  return { node, ref }
}
