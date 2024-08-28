export const toInt = (val: any) => {
  return parseInt(`${val}`, 10)
}

export const toFloat = (val: any) => {
  return parseFloat(`${val}`)
}

export const toPx = (val: number) => {
  return `${val}px`
}
