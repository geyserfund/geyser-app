import { useDebouncedCallback } from '@react-hookz/web'
import { useHelpers, useRemirrorContext } from '@remirror/react'
import { Control, useController, useFormContext } from 'react-hook-form'

import { htmlToMarkdown } from './htmlToMarkdown'

export function SaveModule(props: { control?: Control; name?: string }) {
  const {
    field: { onChange },
  } = useController({
    control: props.control,
    name: props.name ?? 'content',
  })
  const { trigger } = useFormContext()

  const { getHTML } = useHelpers()

  const changeCallback = useDebouncedCallback(
    async (ctx) => {
      const html = getHTML(ctx.state)
      const newHTML = html.replaceAll('<p style=""></p>', '<br>')
      const newMarkdown = htmlToMarkdown(newHTML)
      onChange(newMarkdown)
      trigger(props.name ?? 'content')
    },
    [],
    500,
  )

  useRemirrorContext(changeCallback)

  return <></>
}
