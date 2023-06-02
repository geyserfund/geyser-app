import { useDebouncedCallback } from '@react-hookz/web'
import { useHelpers, useRemirrorContext } from '@remirror/react'
import { Control, useController, useFormContext } from 'react-hook-form'

export function SaveModule(props: { control?: Control; name?: string }) {
  const {
    field: { onChange },
  } = useController({
    control: props.control,
    name: props.name ?? 'content',
  })

  const { trigger } = useFormContext()

  const { getMarkdown } = useHelpers()

  const changeCallback = useDebouncedCallback(
    (ctx) => {
      onChange(getMarkdown(ctx.state))
      trigger(props.name ?? 'content')
    },
    [],
    500,
  )

  useRemirrorContext(changeCallback)

  return <></>
}
