export interface Itarget {
  name: string
  value: any
}

export interface ISelectOption {
  label: string
  value: string | number | Date
}

export type FormStateError<T> = {
  [key in keyof T]?: string
}
