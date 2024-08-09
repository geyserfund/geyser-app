import { useState } from 'react'

export const useFormState = <Type,>(initialValue: Type) => {
  const [state, setState] = useState(initialValue)

  const setTarget = (event: any) => {
    const { name, value, type } = event.target

    const isNumber = type === 'number'

    if (name) {
      setState({
        ...state,
        [name]: isNumber ? parseInt(`${value}`, 10) : value,
      })
    }
  }

  const setValue = (name: string, value: any) => {
    setState({ ...state, [name]: value })
  }

  return { state, setState, setTarget, setValue }
}
