import { useActive, useCommands } from '@remirror/react'
import { useCallback, useMemo } from 'react'

export const useToolbarCommand = (name: string, cmd: string) => {
  const commands = useCommands()
  const active = useActive()

  const command = useMemo(() => commands[cmd], [cmd, commands])

  const runCommand = useCallback(
    (attrs?: any) => {
      if (command) {
        command(attrs)
        commands.focus()
      }
    },
    [command, commands],
  )

  const keyActive = (active as any)[name]

  const isActive = useCallback(
    (attrs: any = {}) => keyActive && keyActive(attrs),
    [keyActive],
  )

  const isDisabled = useCallback(
    () => !command || !command.enabled(),
    [command],
  )

  return { runCommand, isActive, isDisabled }
}
